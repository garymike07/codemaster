import { useState, useRef, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatAssistantProps {
  context: string;
  code: string;
  lessonType?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant({ context, code, lessonType }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your coding assistant. Stuck on something? Ask me for help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const askAction = useAction(api.ai.ask);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const result = await askAction({
        message: userMessage,
        context,
        code,
        lessonType,
      });

      if (result.success && result.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: result.message!,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't reach the server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-xl border-primary/20 animate-in slide-in-from-bottom-10 fade-in duration-200">
          <CardHeader className="py-3 px-4 border-b bg-muted/50 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="text-xl">🤖</span> AI Tutor
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-background"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
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
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted max-w-[85%] rounded-lg px-3 py-2 text-sm flex items-center gap-1 text-muted-foreground">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-75">●</span>
                    <span className="animate-bounce delay-150">●</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t bg-background">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <input
                  className="flex-1 bg-muted/50 border-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!input.trim() || isLoading}
                  className="h-8 px-3"
                >
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-12 w-12 shadow-lg p-0 hover:scale-105 transition-transform"
        >
          <span className="text-2xl">🤖</span>
        </Button>
      )}
    </div>
  );
}
