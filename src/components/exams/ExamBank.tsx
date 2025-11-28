import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Code,
  FileText,
  Trash2,
  Edit,
  BarChart3,
  Filter,
} from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

type Difficulty = "beginner" | "intermediate" | "advanced";
type QuestionType = "multiple_choice" | "code" | "short_answer";

interface ExamBankProps {
  onSelectQuestion?: (question: BankQuestion) => void;
  selectionMode?: boolean;
}

interface BankQuestion {
  _id: Id<"examBank">;
  type: QuestionType;
  question: string;
  difficulty: Difficulty;
  language?: string;
  topic?: string;
  points: number;
  usageCount?: number;
  createdAt: number;
}

export function ExamBank({ onSelectQuestion, selectionMode }: ExamBankProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "">("");
  const [typeFilter, setTypeFilter] = useState<QuestionType | "">("");
  const [editingQuestion, setEditingQuestion] = useState<Id<"examBank"> | null>(null);

  const questions = useQuery(api.examBank.getMyQuestions, {
    searchQuery: searchQuery || undefined,
    difficulty: difficultyFilter || undefined,
    type: typeFilter || undefined,
  });

  const stats = useQuery(api.examBank.getBankStats);
  const deleteQuestion = useMutation(api.examBank.deleteQuestion);

  const handleDelete = async (questionId: Id<"examBank">) => {
    if (confirm("Are you sure you want to delete this question?")) {
      await deleteQuestion({ questionId });
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />;
      case "multiple_choice":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && !selectionMode && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.byType.code}</div>
              <p className="text-sm text-muted-foreground">Coding Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.byType.multiple_choice}</div>
              <p className="text-sm text-muted-foreground">Multiple Choice</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.totalUsage}</div>
              <p className="text-sm text-muted-foreground">Times Used</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 px-3 py-2 rounded-md border bg-background"
                />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "")}
                className="flex-1 sm:flex-none px-3 py-2 rounded-md border bg-background text-sm"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as QuestionType | "")}
                className="flex-1 sm:flex-none px-3 py-2 rounded-md border bg-background text-sm"
              >
                <option value="">All Types</option>
                <option value="code">Code</option>
                <option value="multiple_choice">MCQ</option>
                <option value="short_answer">Short</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {questions === undefined ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No questions in your bank yet.</p>
              <p className="text-sm">Create exams to automatically save questions here.</p>
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card
              key={question._id}
              className={`cursor-pointer transition-colors ${
                selectionMode ? "hover:border-primary" : ""
              }`}
              onClick={() => selectionMode && onSelectQuestion?.(question as BankQuestion)}
            >
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(question.type)}
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.points} pts</Badge>
                      {question.language && (
                        <Badge variant="secondary">{question.language}</Badge>
                      )}
                      {question.topic && (
                        <Badge variant="outline">{question.topic}</Badge>
                      )}
                    </div>
                    <p className="text-sm line-clamp-2">{question.question}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Used {question.usageCount || 0} times</span>
                      <span>
                        Created {new Date(question.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {!selectionMode && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingQuestion(question._id);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(question._id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal - simplified for now */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Question editing coming soon...
              </p>
              <Button onClick={() => setEditingQuestion(null)}>Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
