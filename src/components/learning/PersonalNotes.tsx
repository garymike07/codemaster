import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  Bookmark,
  BookmarkCheck,
  Save,
  Trash2,
  Highlighter,
} from "lucide-react";

interface PersonalNotesProps {
  lessonId: Id<"lessons">;
  onSaveSuccess?: () => void;
}

export function PersonalNotes({ lessonId, onSaveSuccess }: PersonalNotesProps) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const existingNotes = useQuery(api.userNotes.getNotes, { lessonId });
  const saveNotes = useMutation(api.userNotes.saveNotes);
  const toggleBookmark = useMutation(api.userNotes.toggleBookmark);
  const deleteNotes = useMutation(api.userNotes.deleteNotes);

  // Load existing notes
  useEffect(() => {
    if (existingNotes) {
      setContent(existingNotes.content || "");
      setHasChanges(false);
    }
  }, [existingNotes]);

  // Auto-save after 2 seconds of inactivity
  const debouncedSave = useCallback(
    async (newContent: string) => {
      if (!hasChanges) return;

      setIsSaving(true);
      try {
        await saveNotes({
          lessonId,
          content: newContent,
          bookmarked: existingNotes?.bookmarked,
        });
        setLastSaved(new Date());
        setHasChanges(false);
        onSaveSuccess?.();
      } catch (error) {
        console.error("Failed to save notes:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [lessonId, saveNotes, existingNotes?.bookmarked, hasChanges, onSaveSuccess]
  );

  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      debouncedSave(content);
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, hasChanges, debouncedSave]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasChanges(true);
  };

  const handleSaveNow = async () => {
    setIsSaving(true);
    try {
      await saveNotes({
        lessonId,
        content,
        bookmarked: existingNotes?.bookmarked,
      });
      setLastSaved(new Date());
      setHasChanges(false);
      onSaveSuccess?.();
    } catch (error) {
      console.error("Failed to save notes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmark({ lessonId });
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your notes for this lesson?")) {
      return;
    }

    try {
      await deleteNotes({ lessonId });
      setContent("");
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to delete notes:", error);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    return lastSaved.toLocaleTimeString();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="emoji-icon">📝</span>
            My Notes
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-xs">
                Unsaved
              </Badge>
            )}
            {lastSaved && !hasChanges && (
              <span className="text-xs text-muted-foreground">
                Saved {formatLastSaved()}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleBookmark}
              className="h-8 w-8 p-0"
              title={existingNotes?.bookmarked ? "Remove bookmark" : "Bookmark lesson"}
            >
              {existingNotes?.bookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your personal notes here... (auto-saves after 2 seconds)"
          className="w-full h-40 p-3 text-sm bg-muted/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* Highlights Section */}
        {existingNotes?.highlights && existingNotes.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Highlighter className="w-4 h-4" />
              <span>Highlights ({existingNotes.highlights.length})</span>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {existingNotes.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="p-2 text-xs rounded bg-yellow-500/10 border border-yellow-500/20"
                >
                  <p className="font-medium">{highlight.text}</p>
                  {highlight.note && (
                    <p className="text-muted-foreground mt-1">{highlight.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive gap-1"
            disabled={!existingNotes && !content}
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </Button>
          <Button
            size="sm"
            onClick={handleSaveNow}
            disabled={!hasChanges || isSaving}
            className="gap-1"
          >
            <Save className="w-3 h-3" />
            {isSaving ? "Saving..." : "Save Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
