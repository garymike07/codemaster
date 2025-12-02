import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, X, Trash2 } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

type ExamStatus = "not_started" | "in_progress" | "completed" | "";
type DifficultyLevel = "beginner" | "intermediate" | "advanced";

type GeneratorConfig = {
  topic: string;
  difficulty: DifficultyLevel;
  language: string;
};

export default function ExamCentre() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<ExamStatus>("");
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"exams"> | null>(null);
  
  const [genConfig, setGenConfig] = useState<GeneratorConfig>({
    topic: "React Hooks",
    difficulty: "beginner",
    language: "javascript",
  });

  const topics = [
    "React Hooks",
    "Array Methods",
    "String Manipulation",
    "Async Programming",
    "DOM Manipulation",
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming",
    "Functional Programming",
    "Error Handling",
    "ES6+ Features",
    "State Management"
  ];

  const publishedExams = useQuery(api.examPublishing.getPublishedExams);
  const generateQuestions = useAction(api.ai.generateExamQuestions);
  const createPracticeExam = useMutation(api.exams.createPracticeExam);
  const deleteExam = useMutation(api.exams.deleteExam);

  const filteredExams = publishedExams?.filter((exam) => {
    if (!statusFilter) return true;
    return exam.status === statusFilter;
  });

  const getStatusBadge = (status: string, passed?: boolean, score?: number) => {
    switch (status) {
      case "completed":
        return passed ? (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <span className="emoji-icon mr-1">✅</span>
            Passed ({score}%)
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <span className="emoji-icon mr-1">❌</span>
            Failed ({score}%)
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <span className="emoji-icon mr-1">▶️</span>
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <span className="emoji-icon mr-1">📄</span>
            Not Started
          </Badge>
        );
    }
  };

  const handleStartExam = (examId: Id<"exams">) => {
    navigate(`/exam-workspace/${examId}`);
  };

  const handleDelete = async (examId: Id<"exams">, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this AI challenge? This cannot be undone.")) {
      setDeletingId(examId);
      try {
        await deleteExam({ examId });
      } catch (error) {
        console.error("Failed to delete exam:", error);
        alert("Failed to delete exam");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genConfig.topic) return;

    setIsGenerating(true);
    try {
      const result = await generateQuestions({
        topic: genConfig.topic,
        language: genConfig.language,
        difficulty: genConfig.difficulty,
        questionCount: 3,
      });

      if (result.success && result.questions.length > 0) {
        // Map the questions to ensure strict type compatibility
        // The AI action returns questions with minimal fields, createPracticeExam expects specific shape
        const questionsForExam = result.questions.map(q => ({
          id: q.id,
          type: "code" as const,
          question: q.question,
          codeTemplate: q.codeTemplate || "",
          testCases: q.testCases?.map(tc => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: tc.isHidden
          })) || [],
          solution: q.solution || "",
          points: q.points,
          hints: q.hints
        }));

        const examId = await createPracticeExam({
          questions: questionsForExam,
        });

        setIsGeneratorOpen(false);
        navigate(`/exam-workspace/${examId}`);
      } else {
        alert("Failed to generate questions: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong generating the exam.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-8 relative">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Exam Centre</h1>
            <p className="text-muted-foreground">
              View and take your published exams
            </p>
          </div>
          <Button 
            onClick={() => setIsGeneratorOpen(true)} 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all hover:scale-105"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Challenge
          </Button>
        </div>

        {/* AI Generator Modal */}
        {isGeneratorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Generate AI Exam
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => !isGenerating && setIsGeneratorOpen(false)}
                  disabled={isGenerating}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <select
                    value={genConfig.topic}
                    onChange={(e) => setGenConfig({ ...genConfig, topic: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isGenerating}
                  >
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                      value={genConfig.difficulty}
                      onChange={(e) =>
                        setGenConfig({
                          ...genConfig,
                          difficulty: e.target.value as DifficultyLevel,
                        })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isGenerating}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select
                      value={genConfig.language}
                      onChange={(e) => setGenConfig({ ...genConfig, language: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isGenerating}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600" 
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Challenge
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats */}
        {publishedExams && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{publishedExams.length}</div>
                <p className="text-sm text-muted-foreground">Total Exams</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {publishedExams.filter((e) => e.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {publishedExams.filter((e) => e.status === "in_progress").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {publishedExams.filter((e) => e.passed).length}
                </div>
                <p className="text-sm text-muted-foreground">Passed</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="emoji-icon">🔍</span>
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "not_started" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("not_started")}
                >
                  New
                </Button>
                <Button
                  variant={statusFilter === "in_progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("in_progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exams Grid */}
        {filteredExams === undefined ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredExams.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <span className="emoji-icon text-5xl block mb-4 opacity-50">🏆</span>
              <h3 className="text-lg font-semibold mb-2">No Exams Available</h3>
              <p className="text-muted-foreground">
                {statusFilter
                  ? "No exams match your filter criteria."
                  : "No exams have been published yet. Check back later!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <Card key={exam._id} className={`group hover:shadow-lg transition-shadow relative ${exam.courseId === "AI_PRACTICE" ? "border-purple-500/50 dark:border-purple-400/30" : ""}`}>
                {exam.courseId === "AI_PRACTICE" && (
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(exam._id, e)}
                      disabled={deletingId === exam._id}
                    >
                      {deletingId === exam._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between pr-8">
                    <div>
                      <CardTitle className="line-clamp-1 flex items-center gap-2">
                        {exam.courseId === "AI_PRACTICE" && <Sparkles className="h-4 w-4 text-purple-500" />}
                        {exam.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {exam.courseName}
                      </p>
                    </div>
                    {getStatusBadge(exam.status, exam.passed, exam.score)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {exam.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <span className="emoji-icon">⏱️</span>
                      {exam.durationMinutes} min
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="emoji-icon">📄</span>
                      {exam.questions.length} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="emoji-icon">🏆</span>
                      {exam.totalPoints} pts
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Pass: {exam.passingScore}%
                    </span>
                    <Button
                      onClick={() => handleStartExam(exam._id)}
                      disabled={(exam.status === "completed" && exam.passed) || deletingId === exam._id}
                    >
                      {exam.status === "completed"
                        ? exam.passed
                          ? "Completed"
                          : "Retry"
                        : exam.status === "in_progress"
                        ? "Continue"
                        : "Start Exam"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
