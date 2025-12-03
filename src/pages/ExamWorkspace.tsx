import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { LazyMonacoEditor } from "@/components/LazyMonacoEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Loader2,
  Save,
} from "lucide-react";
import { useTheme } from "@/components/theme-context";
import type { Id } from "../../convex/_generated/dataModel";

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

interface Question {
  id: string;
  type: "multiple_choice" | "code" | "short_answer";
  question: string;
  options?: string[];
  codeTemplate?: string;
  testCases?: TestCase[];
  hints?: string[];
  points: number;
}

interface TestResult {
  passed: boolean;
  expected: string;
  actual: string;
  input: string;
}

export default function ExamWorkspace() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const exam = useQuery(
    api.examPublishing.getExamForTaking,
    examId ? { examId: examId as Id<"exams"> } : "skip"
  );
  const submitExam = useMutation(api.exams.submitExam);
  const saveProgress = useMutation(api.examPublishing.saveProgress);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    percentageScore: number;
    passed: boolean;
    totalPoints: number | undefined;
  } | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initialize timer
  useEffect(() => {
    if (exam) {
      setTimeLeft(exam.durationMinutes * 60);
      // Load existing answers if resuming
      if (exam.existingSubmission?.answers) {
        const answerMap: Record<string, string> = {};
        exam.existingSubmission.answers.forEach((a: { questionId: string; answer: string }) => {
          answerMap[a.questionId] = a.answer;
        });
        setAnswers(answerMap);
      }
    }
  }, [exam]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isSubmitted]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!exam || isSubmitted) return;

    const autoSave = setInterval(async () => {
      if (Object.keys(answers).length > 0) {
        const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        }));
        await saveProgress({
          examId: exam._id,
          answers: answersArray,
        });
        setLastSaved(new Date());
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [exam, answers, isSubmitted, saveProgress]);

  const handleSubmit = useCallback(async () => {
    if (!exam || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const answersArray = exam.questions.map((q: { id: string }) => ({
        questionId: q.id,
        answer: answers[q.id] ?? "",
      }));

      const result = await submitExam({
        examId: exam._id,
        answers: answersArray,
        startedAt,
      });

      setResult(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [exam, answers, startedAt, submitExam, isSubmitting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const runTests = async () => {
    if (!exam) return;
    const question = exam.questions[currentQuestion] as Question;
    if (question.type !== "code" || !question.testCases) return;

    setIsRunningTests(true);
    setTestResults([]);
    const results: TestResult[] = [];
    const code = answers[question.id] || question.codeTemplate || "";

    for (const testCase of question.testCases) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
              source_code: btoa(code),
              language_id: 63, // JavaScript
              stdin: testCase.input ? btoa(testCase.input) : undefined,
            }),
          }
        );

        const data = await response.json();
        const actual = data.stdout ? atob(data.stdout).trim() : data.stderr ? atob(data.stderr) : "";
        const passed = actual === testCase.expectedOutput.trim();

        results.push({
          passed,
          expected: testCase.expectedOutput,
          actual,
          input: testCase.input,
        });
      } catch {
        results.push({
          passed: false,
          expected: testCase.expectedOutput,
          actual: "Error running test",
          input: testCase.input,
        });
      }
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Check if exam was already completed
  if (exam.existingSubmission?.isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Exam Already Completed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              You have already submitted this exam.
            </p>
            <Button onClick={() => navigate("/exam-centre")}>
              Back to Exam Centre
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results screen
  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {result.passed ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
            <CardTitle className="text-2xl">
              {result.passed ? "Congratulations!" : "Better luck next time"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{result.percentageScore}%</p>
              <p className="text-muted-foreground">
                {result.score} / {result.totalPoints} points
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={result.passed ? "default" : "destructive"}>
                  {result.passed ? "Passed" : "Failed"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passing Score</span>
                <span>{exam.passingScore}%</span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => navigate("/exam-centre")}
            >
              Back to Exam Centre
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = exam.questions[currentQuestion] as Question;
  const answeredCount = Object.keys(answers).filter((k) => answers[k]).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background px-2 md:px-4 py-2 md:py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="font-semibold text-sm md:text-base truncate">{exam.title}</h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{exam.courseName}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {lastSaved && (
              <span className="hidden sm:flex text-xs text-muted-foreground items-center gap-1">
                <Save className="h-3 w-3" />
                Saved
              </span>
            )}
            <Badge
              variant={timeLeft && timeLeft < 300 ? "destructive" : "secondary"}
              className="gap-1 text-sm md:text-base px-2 md:px-3 py-1"
            >
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
            </Badge>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              variant={answeredCount === exam.questions.length ? "default" : "outline"}
              size="sm"
              className="md:size-default"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="hidden sm:inline">Submit</span>
              )}
              <span className="sm:hidden">Done</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Question Navigator */}
      <div className="md:hidden border-b border-border bg-muted/30 p-2 overflow-x-auto">
        <div className="flex gap-2">
          {exam.questions.map((q: { id: string }, idx: number) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-8 h-8 shrink-0 rounded-md text-sm font-medium transition-colors ${
                idx === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : answers[q.id]
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Question Navigator Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 border-r border-border p-4 bg-muted/30">
          <h3 className="font-semibold mb-4">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {exam.questions.map((q: { id: string }, idx: number) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                  idx === currentQuestion
                    ? "bg-primary text-primary-foreground"
                    : answers[q.id]
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900" />
              <span className="text-muted-foreground">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted" />
              <span className="text-muted-foreground">Not answered</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Progress: {answeredCount} / {exam.questions.length}
            </p>
          </div>
        </aside>

        {/* Main Question Area */}
        <main className="flex-1 p-3 md:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Q{currentQuestion + 1}</Badge>
                <Badge variant="secondary">{question.points} pts</Badge>
                <Badge variant="outline" className="capitalize text-xs">
                  {question.type.replace("_", " ")}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(exam.questions.length - 1, prev + 1)
                    )
                  }
                  disabled={currentQuestion === exam.questions.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Question Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-normal whitespace-pre-wrap">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === "multiple_choice" && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                          answers[question.id] === option
                            ? "border-primary bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "code" && (
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <LazyMonacoEditor
                        height="300px"
                        className="md:h-[400px]"
                        language="javascript"
                        theme={theme === "dark" ? "vs-dark" : "light"}
                        value={answers[question.id] || question.codeTemplate || ""}
                        onChange={(value) => handleAnswer(question.id, value || "")}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    </div>

                    {/* Test Runner */}
                    {question.testCases && question.testCases.length > 0 && (
                      <div className="space-y-4">
                        <Button
                          onClick={runTests}
                          disabled={isRunningTests}
                          variant="outline"
                        >
                          {isRunningTests ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Running Tests...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Run Tests
                            </>
                          )}
                        </Button>

                        {testResults.length > 0 && (
                          <div className="space-y-2">
                            {testResults.map((result, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-md ${
                                  result.passed
                                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  {result.passed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  )}
                                  <span className="font-medium">
                                    Test Case {idx + 1}
                                  </span>
                                </div>
                                <div className="text-sm space-y-1 font-mono">
                                  <p>Input: {result.input || "(none)"}</p>
                                  <p>Expected: {result.expected}</p>
                                  <p>Got: {result.actual || "(no output)"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {question.type === "short_answer" && (
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 p-3 rounded-md border bg-background resize-none"
                  />
                )}
              </CardContent>
            </Card>

            {/* Hints */}
            {question.hints && question.hints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Hints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {question.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
