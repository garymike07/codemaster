"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateExamQuestions = action({
  args: {
    topic: v.string(),
    language: v.string(),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    questionCount: v.number(),
  },
  handler: async (_ctx, args) => {
    const { topic, language, difficulty, questionCount } = args;

    const prompt = `You are an expert coding instructor. Generate ${questionCount} coding exam questions for ${language} programming at ${difficulty} level.

Topic: ${topic}

For each question, provide:
1. A clear problem description
2. Starter code template
3. Test cases with inputs and expected outputs
4. A reference solution
5. Point value (10-30 based on difficulty)

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "questions": [
    {
      "id": "q1",
      "type": "code",
      "question": "Problem description here",
      "codeTemplate": "// Starter code here\\nfunction solution() {\\n  // Your code here\\n}",
      "testCases": [
        {"input": "example input", "expectedOutput": "expected output", "isHidden": false},
        {"input": "hidden test", "expectedOutput": "hidden output", "isHidden": true}
      ],
      "solution": "// Complete solution code",
      "points": 20,
      "hints": ["Hint 1", "Hint 2"]
    }
  ]
}

Requirements:
- Questions should be practical and test real coding skills
- Include edge cases in test cases
- Make at least one test case hidden (isHidden: true)
- Difficulty should match the ${difficulty} level
- Code should be syntactically correct ${language}
- Points: beginner=10-15, intermediate=15-25, advanced=25-30`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a coding exam generator. Return only valid JSON, no markdown formatting.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const responseText = completion.choices[0]?.message?.content || "";
      
      // Clean up response - remove markdown code blocks if present
      let cleanedResponse = responseText.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();

      const parsed = JSON.parse(cleanedResponse);
      
      // Validate and add IDs if missing
      const questions = parsed.questions.map((q: any, index: number) => ({
        id: q.id || `q${index + 1}`,
        type: "code" as const,
        question: q.question,
        codeTemplate: q.codeTemplate || "",
        testCases: q.testCases || [],
        solution: q.solution || "",
        points: q.points || 20,
        hints: q.hints || [],
      }));

      return { success: true, questions };
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      return {
        success: false,
        error: error.message || "Failed to generate questions",
        questions: [],
      };
    }
  },
});

export const generateMultipleChoiceQuestions = action({
  args: {
    topic: v.string(),
    language: v.string(),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    questionCount: v.number(),
  },
  handler: async (_ctx, args) => {
    const { topic, language, difficulty, questionCount } = args;

    const prompt = `Generate ${questionCount} multiple choice questions about ${topic} in ${language} programming at ${difficulty} level.

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": "mc1",
      "type": "multiple_choice",
      "question": "What is the output of...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "points": 10,
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Requirements:
- Questions should test understanding, not just syntax
- Include code snippets in questions where appropriate
- Make wrong answers plausible but clearly incorrect
- Points: beginner=5-10, intermediate=10-15, advanced=15-20`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a coding quiz generator. Return only valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const responseText = completion.choices[0]?.message?.content || "";
      
      let cleanedResponse = responseText.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();

      const parsed = JSON.parse(cleanedResponse);
      
      const questions = parsed.questions.map((q: any, index: number) => ({
        id: q.id || `mc${index + 1}`,
        type: "multiple_choice" as const,
        question: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        points: q.points || 10,
        explanation: q.explanation || "",
      }));

      return { success: true, questions };
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      return {
        success: false,
        error: error.message || "Failed to generate questions",
        questions: [],
      };
    }
  },
});
