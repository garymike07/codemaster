import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import OpenAI from "openai";

const http = httpRouter();

// Streaming AI Chat endpoint
http.route({
  path: "/api/chat/stream",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const body = await request.json();
      const { message, context, code, lessonType, tutorMode, history } = body;

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Build system prompt based on tutor mode
      const systemPrompts: Record<string, string> = {
        socratic: `You are a Socratic coding tutor. Never give direct answers. Instead:
- Ask guiding questions to help the student discover the answer
- Break down problems into smaller steps
- Encourage the student to explain their thinking
- Celebrate mistakes as learning opportunities
- Only provide hints when the student is truly stuck
Keep responses concise (2-3 paragraphs max).`,

        explain: `You are a patient coding instructor. Your role is to:
- Explain concepts clearly and thoroughly
- Use analogies and real-world examples
- Break down complex topics into digestible pieces
- Provide code examples when helpful
- Check for understanding
Keep responses focused and educational.`,

        debug: `You are a debugging assistant. Your role is to:
- Help identify the root cause of errors
- Explain what the error message means
- Point to the specific line or logic causing issues
- Suggest fixes with explanations
- Teach debugging strategies
Don't just fix the code - help the student understand WHY it's broken.`,

        quiz: `You are a quiz master for coding concepts. Your role is to:
- Ask challenging but fair questions about the topic
- Provide multiple choice or short answer questions
- Give immediate feedback on answers
- Explain why answers are correct or incorrect
- Adapt difficulty based on performance`,
      };

      const systemPrompt = systemPrompts[tutorMode] || systemPrompts.explain;

      const fullSystemPrompt = `${systemPrompt}

The student is working on a ${lessonType || "coding"} lesson.
${context ? `\nLesson Context:\n${context}` : ""}
${code ? `\nStudent's Current Code:\n\`\`\`\n${code}\n\`\`\`` : ""}`;

      // Build messages array with history
      const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: fullSystemPrompt },
      ];

      // Add conversation history
      if (history && Array.isArray(history)) {
        for (const msg of history.slice(-10)) { // Keep last 10 messages for context
          messages.push({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          });
        }
      }

      // Add current message
      messages.push({ role: "user", content: message });

      // Create streaming response
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      });

      // Create a readable stream for SSE
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                // Send as SSE format
                const data = `data: ${JSON.stringify({ content })}\n\n`;
                controller.enqueue(encoder.encode(data));
              }
            }
            // Send done signal
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Stream error";
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
            );
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Streaming chat error:", error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

// Code execution proxy (to hide API keys)
http.route({
  path: "/api/code/execute",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const body = await request.json();
      const { code, language, stdin } = body;

      const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
      const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

      if (!JUDGE0_API_URL || !JUDGE0_API_KEY) {
        return new Response(
          JSON.stringify({ error: "Code execution not configured" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Map language to Judge0 language ID
      const languageIds: Record<string, number> = {
        javascript: 63,
        js: 63,
        python: 71,
        java: 62,
        cpp: 54,
        "c++": 54,
        c: 50,
        csharp: 51,
        "c#": 51,
        typescript: 74,
        ts: 74,
        ruby: 72,
        go: 60,
        rust: 73,
      };

      const languageId = languageIds[language?.toLowerCase()] || 63;

      // Submit to Judge0
      const response = await fetch(
        `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: btoa(code),
            language_id: languageId,
            stdin: stdin ? btoa(stdin) : undefined,
          }),
        }
      );

      const data = await response.json();

      // Decode output
      let output = "";
      let error = "";

      if (data.stdout) {
        output = atob(data.stdout);
      }
      if (data.stderr) {
        error = atob(data.stderr);
      }
      if (data.compile_output) {
        error = atob(data.compile_output);
      }

      return new Response(
        JSON.stringify({
          output,
          error,
          status: data.status?.description || "Unknown",
          time: data.time,
          memory: data.memory,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      console.error("Code execution error:", error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Execution failed",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

// CORS preflight handler
http.route({
  path: "/api/chat/stream",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }),
});

http.route({
  path: "/api/code/execute",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }),
});

export default http;
