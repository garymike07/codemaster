import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { AIQuestionGenerator } from "./AIQuestionGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Plus,
  Trash2,
  Wand2,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Question {
  id: string;
  type: "multiple_choice" | "code" | "short_answer";
  question: string;
  options?: string[];
  correctAnswer?: string;
  solution?: string;
  points: number;
  codeTemplate?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }>;
  hints?: string[];
}

interface ExamCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export function ExamCreator({ isOpen, onClose, onSave }: ExamCreatorProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [passingScore, setPassingScore] = useState(70);
  const [selectedCourse, setSelectedCourse] = useState<Id<"courses"> | "">("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const courses = useQuery(api.courses.list);
  const createExam = useMutation(api.teacher.createExam);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      type: "code",
      question: "",
      solution: "",
      points: 20,
      codeTemplate: "",
      testCases: [],
      hints: [],
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(newQuestion.id);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleAIQuestionsGenerated = (generatedQuestions: Question[]) => {
    setQuestions([...questions, ...generatedQuestions]);
    setShowAIGenerator(false);
  };

  const calculateTotalPoints = () => {
    return questions.reduce((sum, q) => sum + q.points, 0);
  };

  const handleSave = async () => {
    if (!title || !selectedCourse || questions.length === 0) {
      alert("Please fill in all required fields and add at least one question.");
      return;
    }

    setSaving(true);
    try {
      await createExam({
        courseId: selectedCourse as Id<"courses">,
        title,
        description,
        durationMinutes: duration,
        passingScore,
        questions: questions.map((q) => ({
          id: q.id,
          type: q.type,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer || q.solution || "",
          solution: q.solution,
          points: q.points,
          codeTemplate: q.codeTemplate,
          testCases: q.testCases,
          hints: q.hints,
        })),
      });
      onSave?.();
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create exam";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-2 md:py-8">
      <Card className="w-full max-w-4xl mx-2 md:mx-4 max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b sticky top-0 bg-background z-10">
          <CardTitle>Create New Exam</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., JavaScript Fundamentals Quiz"
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course *</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value as Id<"courses">)}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">Select a course</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this exam covers..."
              rows={2}
              className="w-full px-3 py-2 rounded-md border bg-background resize-none"
            />
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={5}
                max={180}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Passing Score (%)</label>
              <input
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Total Points</label>
              <div className="px-3 py-2 rounded-md border bg-muted">
                {calculateTotalPoints()} points
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Questions ({questions.length})
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIGenerator(true)}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate with AI
                </Button>
                <Button size="sm" onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-8 border rounded-lg border-dashed">
                <p className="text-muted-foreground mb-4">
                  No questions yet. Add questions manually or generate with AI.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowAIGenerator(true)}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Questions with AI
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <Card key={question.id} className="border">
                    <div
                      className="p-3 cursor-pointer flex items-center justify-between"
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === question.id ? null : question.id
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="font-medium text-sm truncate max-w-md">
                          {question.question || "New Question"}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {question.type.replace("_", " ")}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.points} pts
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveQuestion(question.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        {expandedQuestion === question.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    {expandedQuestion === question.id && (
                      <CardContent className="pt-0 border-t">
                        <div className="space-y-4 pt-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Question Type
                              </label>
                              <select
                                value={question.type}
                                onChange={(e) =>
                                  handleUpdateQuestion(question.id, {
                                    type: e.target.value as Question["type"],
                                  })
                                }
                                className="w-full px-3 py-2 rounded-md border bg-background"
                              >
                                <option value="code">Coding Challenge</option>
                                <option value="multiple_choice">
                                  Multiple Choice
                                </option>
                                <option value="short_answer">Short Answer</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Points</label>
                              <input
                                type="number"
                                value={question.points}
                                onChange={(e) =>
                                  handleUpdateQuestion(question.id, {
                                    points: Number(e.target.value),
                                  })
                                }
                                min={1}
                                className="w-full px-3 py-2 rounded-md border bg-background"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Question Text
                            </label>
                            <textarea
                              value={question.question}
                              onChange={(e) =>
                                handleUpdateQuestion(question.id, {
                                  question: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full px-3 py-2 rounded-md border bg-background resize-none font-mono text-sm"
                            />
                          </div>

                          {question.type === "code" && (
                            <>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Code Template
                                </label>
                                <textarea
                                  value={question.codeTemplate || ""}
                                  onChange={(e) =>
                                    handleUpdateQuestion(question.id, {
                                      codeTemplate: e.target.value,
                                    })
                                  }
                                  rows={4}
                                  placeholder="// Starter code for the student"
                                  className="w-full px-3 py-2 rounded-md border bg-background resize-none font-mono text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Solution
                                </label>
                                <textarea
                                  value={question.solution || ""}
                                  onChange={(e) =>
                                    handleUpdateQuestion(question.id, {
                                      solution: e.target.value,
                                    })
                                  }
                                  rows={4}
                                  placeholder="// Reference solution"
                                  className="w-full px-3 py-2 rounded-md border bg-background resize-none font-mono text-sm"
                                />
                              </div>
                            </>
                          )}

                          {question.type === "multiple_choice" && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Correct Answer
                              </label>
                              <input
                                type="text"
                                value={question.correctAnswer}
                                onChange={(e) =>
                                  handleUpdateQuestion(question.id, {
                                    correctAnswer: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 rounded-md border bg-background"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Create Exam"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Generator Modal */}
      {showAIGenerator && (
        <AIQuestionGenerator
          onClose={() => setShowAIGenerator(false)}
          onGenerate={handleAIQuestionsGenerated}
        />
      )}
    </div>
  );
}
