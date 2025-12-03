import { useState, useRef, useEffect, useCallback } from "react";
import { useConvexAuth } from "convex/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  MessageSquare,
  Send,
  X,
  Trash2,
  Sparkles,
  HelpCircle,
  Bug,
  GraduationCap,
} from "lucide-react";

type TutorMode = "socratic" | "explain" | "debug" | "quiz";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  metadata?: {
    codeContext?: string;
    tutorMode?: string;
  };
}

interface StreamingChatAssistantProps {
  lessonId: Id<"lessons">;
  context: string;
  code?: string;
  lessonType?: string;
  suggestedQuestions?: string[];
}

const tutorModes: { id: TutorMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "explain",
    label: "Explain",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Get detailed explanations",
  },
  {
    id: "socratic",
    label: "Guide",
    icon: <HelpCircle className="w-4 h-4" />,
    description: "Learn through questions",
  },
  {
    id: "debug",
    label: "Debug",
    icon: <Bug className="w-4 h-4" />,
    description: "Fix code errors",
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: <GraduationCap className="w-4 h-4" />,
    description: "Test your knowledge",
  },
];

export function StreamingChatAssistant({
  lessonId,
  context,
  code,
  lessonType,
  suggestedQuestions,
}: StreamingChatAssistantProps) {
  const { isAuthenticated } = useConvexAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [tutorMode, setTutorMode] = useState<TutorMode>("explain");
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load saved chat history
  const chatHistory = useQuery(api.aiChat.getChatHistory, { lessonId });
  const saveMessage = useMutation(api.aiChat.saveMessage);
  const clearHistory = useMutation(api.aiChat.clearChatHistory);

  // Load history on mount
  useEffect(() => {
    if (chatHistory?.messages) {
      setMessages(chatHistory.messages);
    }
  }, [chatHistory]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent, isOpen]);

  const handleSubmit = useCallback(
    async (messageText?: string) => {
      const text = messageText || input.trim();
      if (!text || isStreaming || !isAuthenticated) return;

      setInput("");
      setIsStreaming(true);
      setStreamingContent("");

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text,
        timestamp: Date.now(),
        metadata: { tutorMode },
      };

      setMessages((prev) => [...prev, userMessage]);

      // Save user message
      try {
        await saveMessage({ lessonId, message: userMessage });
      } catch (error) {
        console.error("Failed to save user message:", error);
      }

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(
          `${import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site")}/api/chat/stream`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: text,
              context,
              code,
              lessonType,
              tutorMode,
              history: messages.slice(-10).map((m) => ({
                role: m.role,
                content: m.content,
              })),
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Stream request failed");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        // Add assistant message
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fullContent,
          timestamp: Date.now(),
          metadata: { tutorMode },
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent("");

        // Save assistant message
        try {
          await saveMessage({ lessonId, message: assistantMessage });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Stream aborted");
        } else {
          console.error("Streaming error:", error);
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
        setStreamingContent("");
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [
      input,
      isStreaming,
      isAuthenticated,
      lessonId,
      context,
      code,
      lessonType,
      tutorMode,
      messages,
      saveMessage,
    ]
  );

  const handleCancelStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClearHistory = async () => {
    if (!confirm("Clear all chat history for this lesson?")) return;
    try {
      await clearHistory({ lessonId });
      setMessages([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <Card className="w-[380px] sm:w-[420px] h-[550px] flex flex-col shadow-xl border-primary/20 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <CardHeader className="py-2 px-3 border-b bg-muted/50 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="text-lg">🤖</span>
              AI Tutor
              <Badge variant="outline" className="text-xs capitalize">
                {tutorMode}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={handleClearHistory}
                title="Clear history"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            {/* Mode selector */}
            <div className="px-2 py-1.5 border-b bg-background/50 flex gap-1">
              {tutorModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={tutorMode === mode.id ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs gap-1"
                  onClick={() => setTutorMode(mode.id)}
                  title={mode.description}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.label}</span>
                </Button>
              ))}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.length === 0 && !streamingContent && (
                <div className="text-center py-8 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hi! I'm your AI tutor. Ask me anything about this lesson!
                  </p>
                  {suggestedQuestions && suggestedQuestions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Try asking:
                      </p>
                      {suggestedQuestions.slice(0, 3).map((q, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="w-full text-xs h-auto py-2 px-3 text-left justify-start"
                          onClick={() => handleSubmit(q)}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Streaming indicator */}
              {streamingContent && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-muted">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {streamingContent}
                      <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                    </p>
                  </div>
                </div>
              )}

              {isStreaming && !streamingContent && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-75">●</span>
                    <span className="animate-bounce delay-150">●</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 border-t bg-background">
              <div className="flex items-center gap-2">
                <textarea
                  className="flex-1 bg-muted/50 border-none rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary min-h-[40px] max-h-[100px]"
                  placeholder={
                    isStreaming ? "AI is responding..." : "Ask a question..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming}
                  rows={1}
                />
                {isStreaming ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleCancelStream}
                    className="h-9 px-3"
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleSubmit()}
                    disabled={!input.trim()}
                    className="h-9 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg p-0 hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
