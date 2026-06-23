import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Target,
  Link2,
  Lightbulb,
  AlertTriangle,
  Play,
  FileText,
  Video,
} from "lucide-react";
import { renderSafeMarkdown } from "@/lib/markdown";

interface Resource {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "tutorial";
}

interface CommonMistake {
  mistake: string;
  explanation: string;
  howToAvoid: string;
}

interface LessonNotes {
  summary: string;
  detailedContent?: string;
  prerequisites?: string[];
  learningObjectives: string[];
  resources?: Resource[];
}

interface EnhancedLessonNotesProps {
  content: string;
  notes?: LessonNotes;
  keyTakeaways?: string[];
  commonMistakes?: CommonMistake[];
  onAskAI?: (question: string) => void;
  onNavigateToLesson?: (lessonTitle: string) => void;
}

const resourceIcons = {
  video: Video,
  article: FileText,
  docs: BookOpen,
  tutorial: Play,
};

function SectionHeader({
  id,
  icon: Icon,
  title,
  badge,
  expandedSections,
  onToggle,
  className = "",
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  badge?: string;
  expandedSections: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onToggle(id)}
      className={`flex items-center justify-between w-full text-left group ${className}`}
    >
      <div className="flex items-center gap-2">
        {expandedSections.has(id) ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{title}</span>
        {badge && (
          <Badge variant="secondary" className="text-xs">
            {badge}
          </Badge>
        )}
      </div>
    </button>
  );
}

export function EnhancedLessonNotes({
  content,
  notes,
  keyTakeaways,
  commonMistakes,
  onAskAI,
  onNavigateToLesson,
}: EnhancedLessonNotesProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["summary", "objectives", "content"])
  );
  const [completedObjectives, setCompletedObjectives] = useState<Set<number>>(
    new Set()
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const toggleObjective = (index: number) => {
    const newCompleted = new Set(completedObjectives);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedObjectives(newCompleted);
  };

  return (
    <div className="space-y-4">
      {notes?.summary && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <SectionHeader
            id="summary"
            icon={Lightbulb}
            title="Quick Summary"
            className="text-primary mb-3"
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("summary") && (
            <div className="pl-6 mt-2">
              <p className="text-sm leading-relaxed">{notes.summary}</p>
              {onAskAI && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAskAI("Explain this lesson in simpler terms")}
                  className="mt-2 text-xs"
                >
                  <span className="mr-1">🤖</span> Simplify this
                </Button>
              )}
            </div>
          )}
        </Card>
      )}

      {notes?.learningObjectives && notes.learningObjectives.length > 0 && (
        <Card className="p-4">
          <SectionHeader
            id="objectives"
            icon={Target}
            title="Learning Objectives"
            badge={`${completedObjectives.size}/${notes.learningObjectives.length}`}
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("objectives") && (
            <ul className="pl-6 mt-3 space-y-2">
              {notes.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <button
                    onClick={() => toggleObjective(index)}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      completedObjectives.has(index)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/30 hover:border-primary"
                    }`}
                  >
                    {completedObjectives.has(index) && (
                      <span className="text-xs">✓</span>
                    )}
                  </button>
                  <span
                    className={
                      completedObjectives.has(index)
                        ? "text-muted-foreground line-through"
                        : ""
                    }
                  >
                    {objective}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {notes?.prerequisites && notes.prerequisites.length > 0 && (
        <Card className="p-4 bg-warning/5 border-warning/20">
          <SectionHeader
            id="prerequisites"
            icon={Link2}
            title="Prerequisites"
            badge={`${notes.prerequisites.length}`}
            className="text-warning"
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("prerequisites") && (
            <ul className="pl-6 mt-3 space-y-1">
              {notes.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-warning">→</span>
                  {onNavigateToLesson ? (
                    <button
                      onClick={() => onNavigateToLesson(prereq)}
                      className="text-sm hover:text-primary hover:underline"
                    >
                      {prereq}
                    </button>
                  ) : (
                    <span className="text-sm">{prereq}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader id="content" icon={BookOpen} title="Lesson Content" expandedSections={expandedSections} onToggle={toggleSection} />
          {onAskAI && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAskAI("Explain this lesson content")}
              className="gap-1"
            >
              <span>🤖</span> Ask AI
            </Button>
          )}
        </div>
        {expandedSections.has("content") && (
          <div
            className="prose prose-invert max-w-none pl-6"
            dangerouslySetInnerHTML={{
              __html: renderSafeMarkdown(notes?.detailedContent || content, true),
            }}
          />
        )}
      </Card>

      {keyTakeaways && keyTakeaways.length > 0 && (
        <Card className="p-4 bg-success/5 border-success/20">
          <SectionHeader
            id="takeaways"
            icon={Lightbulb}
            title="Key Takeaways"
            badge={`${keyTakeaways.length}`}
            className="text-success"
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("takeaways") && (
            <ul className="pl-6 mt-3 space-y-2">
              {keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span className="text-sm">{takeaway}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {commonMistakes && commonMistakes.length > 0 && (
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <SectionHeader
            id="mistakes"
            icon={AlertTriangle}
            title="Common Mistakes to Avoid"
            badge={`${commonMistakes.length}`}
            className="text-destructive"
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("mistakes") && (
            <div className="pl-6 mt-3 space-y-4">
              {commonMistakes.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant="destructive" className="mt-0.5 shrink-0">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-destructive">
                        {item.mistake}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.explanation}
                      </p>
                      <div className="mt-2 p-2 bg-success/10 border border-success/20 rounded text-sm">
                        <strong className="text-success">How to avoid:</strong>{" "}
                        {item.howToAvoid}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {notes?.resources && notes.resources.length > 0 && (
        <Card className="p-4">
          <SectionHeader
            id="resources"
            icon={Link2}
            title="Additional Resources"
            badge={`${notes.resources.length}`}
            expandedSections={expandedSections}
            onToggle={toggleSection}
          />
          {expandedSections.has("resources") && (
            <div className="pl-6 mt-3 grid gap-2">
              {notes.resources.map((resource, index) => {
                const Icon = resourceIcons[resource.type] || FileText;
                return (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm hover:text-primary">
                      {resource.title}
                    </span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {resource.type}
                    </Badge>
                  </a>
                );
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
