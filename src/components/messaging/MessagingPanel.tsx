import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, X, Users, Plus, ArrowLeft } from "lucide-react";

interface MessagingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessagingPanel({ isOpen, onClose }: MessagingPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState<Id<"conversations"> | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const contacts = useQuery(api.messaging.getContacts);
  const getOrCreateConversation = useMutation(api.messaging.getOrCreateConversation);

  const handleSelectContact = async (contactId: Id<"users">) => {
    const conversationId = await getOrCreateConversation({ participantId: contactId });
    setSelectedConversation(conversationId);
    setShowNewMessage(false);
  };

  if (!isOpen) return null;

  // On mobile, show either list or chat
  const showChatOnMobile = selectedConversation !== null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
      <Card className="w-full max-w-4xl h-[100dvh] md:h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b py-3 md:pb-4 shrink-0">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            {showChatOnMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-1"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <MessageSquare className="h-5 w-5" />
            Messages
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex overflow-hidden">
          {/* Sidebar - hidden on mobile when chat is selected */}
          <div className={`${showChatOnMobile ? "hidden" : "flex"} md:flex w-full md:w-1/3 border-r flex-col`}>
            <div className="p-3 border-b">
              <Button
                size="sm"
                className="w-full"
                onClick={() => setShowNewMessage(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {showNewMessage ? (
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    Select Contact
                  </div>
                  {contacts?.map((contact) => (
                    <div
                      key={contact._id}
                      className="p-2 rounded-lg hover:bg-muted cursor-pointer flex items-center gap-2"
                      onClick={() => handleSelectContact(contact._id)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{contact.role}</p>
                      </div>
                    </div>
                  ))}
                  {contacts?.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No contacts available
                    </p>
                  )}
                </div>
              ) : (
                <ConversationList
                  selectedId={selectedConversation}
                  onSelect={setSelectedConversation}
                />
              )}
            </div>
          </div>

          {/* Chat Area - shown on mobile only when conversation is selected */}
          <div className={`${showChatOnMobile ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
            {selectedConversation ? (
              <ChatWindow conversationId={selectedConversation} />
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
