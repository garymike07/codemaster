import { useState, useCallback, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getConvexAuthHeader, getConvexSiteUrl } from "@/lib/convexHttp";

interface StreamingChatOptions {
  onChunk?: (content: string) => void;
  onComplete?: (fullContent: string) => void;
  onError?: (error: Error) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useStreamingChat(options: StreamingChatOptions = {}) {
  const { getToken } = useAuth();
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const contentRef = useRef("");

  const sendMessage = useCallback(
    async ({
      message,
      context,
      code,
      lessonType,
      tutorMode = "explain",
      history = [],
    }: {
      message: string;
      context?: string;
      code?: string;
      lessonType?: string;
      tutorMode?: string;
      history?: ChatMessage[];
    }): Promise<string> => {
      setIsStreaming(true);
      setStreamingContent("");

      // Abort any previous in-flight request before creating a new one
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${getConvexSiteUrl()}/api/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getConvexAuthHeader(getToken)),
        },
        body: JSON.stringify({
          message,
          context,
          code,
          lessonType,
          tutorMode,
          history: history.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      try {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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
                  options.onChunk?.(parsed.content);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                if (!(e instanceof SyntaxError)) {
                  throw e;
                }
              }
            }
          }
        }

        contentRef.current = fullContent;
        setStreamingContent("");
        options.onComplete?.(fullContent);
        return fullContent;
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Stream aborted by user");
          return contentRef.current;
        }
        const err = error instanceof Error ? error : new Error("Unknown error");
        options.onError?.(err);
        throw err;
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [getToken, options]
  );

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    sendMessage,
    cancelStream,
    isStreaming,
    streamingContent,
  };
}
