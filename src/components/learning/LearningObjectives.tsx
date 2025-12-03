import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle2, Circle } from "lucide-react";

interface LearningObjectivesProps {
  objectives: string[];
  completedIndices?: number[];
  onToggle?: (index: number) => void;
  title?: string;
  showProgress?: boolean;
}

export function LearningObjectives({
  objectives,
  completedIndices = [],
  onToggle,
  title = "Learning Objectives",
  showProgress = true,
}: LearningObjectivesProps) {
  const [localCompleted, setLocalCompleted] = useState<Set<number>>(
    new Set(completedIndices)
  );

  const handleToggle = (index: number) => {
    if (onToggle) {
      onToggle(index);
    } else {
      const newCompleted = new Set(localCompleted);
      if (newCompleted.has(index)) {
        newCompleted.delete(index);
      } else {
        newCompleted.add(index);
      }
      setLocalCompleted(newCompleted);
    }
  };

  const completed = onToggle ? new Set(completedIndices) : localCompleted;
  const progress = objectives.length > 0
    ? Math.round((completed.size / objectives.length) * 100)
    : 0;

  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          {showProgress && (
            <span className="text-sm text-muted-foreground">
              {completed.size}/{objectives.length}
            </span>
          )}
        </div>
        {showProgress && (
          <Progress value={progress} className="h-1.5 mt-2" />
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {objectives.map((objective, index) => {
            const isCompleted = completed.has(index);
            return (
              <li key={index}>
                <button
                  onClick={() => handleToggle(index)}
                  className={`flex items-start gap-3 w-full text-left p-2 rounded-lg transition-colors ${
                    isCompleted
                      ? "bg-success/5 hover:bg-success/10"
                      : "hover:bg-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      isCompleted ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {objective}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {progress === 100 && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg text-center">
            <span className="text-success font-medium">
              🎉 All objectives completed!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
