import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";

interface ConversationListProps {
  selectedId: Id<"conversations"> | null;
  onSelect: (id: Id<"conversations">) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const conversations = useQuery(api.messaging.getConversations);

  if (!conversations) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Start a new message to begin</p>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="divide-y">
      {conversations.map((conv) => (
        <div
          key={conv._id}
          className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
            selectedId === conv._id ? "bg-muted" : ""
          }`}
          onClick={() => onSelect(conv._id)}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium shrink-0">
              {conv.otherParticipant?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm truncate">
                  {conv.otherParticipant?.name || "Unknown"}
                </p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatTime(conv.lastMessageAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-1">
                <p className="text-xs text-muted-foreground truncate">
                  {conv.lastMessagePreview || "No messages yet"}
                </p>
                {conv.unreadCount > 0 && (
                  <Badge variant="default" className="h-5 min-w-5 text-xs shrink-0">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground/70 capitalize mt-0.5">
                {conv.otherParticipant?.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
