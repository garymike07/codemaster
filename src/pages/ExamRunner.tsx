import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import type { Id } from "../../convex/_generated/dataModel";

export default function ExamRunner() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const exam = useQuery(
    api.exams.getById,
    examId ? { examId: examId as Id<"exams"> } : "skip"
  );
  
  const submitExam = useMutation(api.exams.submitExam);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    percentageScore: number;
    passed: boolean;
    totalPoints: number | undefined;
  } | null>(null);

  useEffect(() => {
    if (exam) {
      setTimeLeft(exam.durationMinutes * 60);
    }
  }, [exam]);

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
  }, [timeLeft, isSubmitted]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const question = exam.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / exam.questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  };

  const handleSubmit = async () => {
    const submissionAnswers = exam.questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id] ?? "",
    }));

    const result = await submitExam({
      examId: exam._id,
      answers: submissionAnswers,
      startedAt,
    });

    setResult(result);
    setIsSubmitted(true);
  };

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {result.passed ? (
              <span className="emoji-icon text-6xl block mb-4">🎉</span>
            ) : (
              <span className="emoji-icon text-6xl block mb-4">😔</span>
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
                <Badge variant={result.passed ? "success" : "destructive"}>
                  {result.passed ? "Passed" : "Failed"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passing Score</span>
                <span>{exam.passingScore}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/exams")}
              >
                Back to Exams
              </Button>
              {!result.passed && (
                <Button
                  className="flex-1"
                  onClick={() => {
                    setIsSubmitted(false);
                    setResult(null);
                    setAnswers({});
                    setCurrentQuestion(0);
                    setTimeLeft(exam.durationMinutes * 60);
                  }}
                >
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background px-4 py-3 sticky top-0 z-10">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="font-semibold">{exam.title}</h1>
            <p className="text-sm text-muted-foreground">
              {exam.course?.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={timeLeft && timeLeft < 300 ? "destructive" : "secondary"}
              className="gap-1 text-base px-3 py-1"
            >
              <span className="emoji-icon">⏱️</span>
              {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
            </Badge>
            <Button onClick={handleSubmit}>Submit Exam</Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {exam.questions.length}
              </span>
              <span>{answeredCount} answered</span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Question Navigator */}
          <div className="flex flex-wrap gap-2">
            {exam.questions.map((q, index) => (
              <Button
                key={q.id}
                variant={
                  currentQuestion === index
                    ? "default"
                    : answers[q.id]
                    ? "secondary"
                    : "outline"
                }
                size="sm"
                className="w-10 h-10"
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {/* Question */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{question.points} pts</Badge>
                <Badge variant="secondary" className="capitalize">
                  {question.type.replace("_", " ")}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-2">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "multiple_choice" && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        answers[question.id] === option
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[question.id] === option
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {answers[question.id] === option && (
                            <span className="emoji-icon text-xs">✓</span>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === "short_answer" && (
                <textarea
                  className="w-full p-4 rounded-lg border border-border bg-background resize-none"
                  rows={4}
                  placeholder="Type your answer here..."
                  value={answers[question.id] ?? ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <span className="emoji-icon">←</span>
              Previous
            </Button>
            {currentQuestion < exam.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="gap-2"
              >
                Next
                <span className="emoji-icon">→</span>
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                Submit Exam
              </Button>
            )}
          </div>

          {/* Warning */}
          {answeredCount < exam.questions.length && (
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <span className="emoji-icon">⚠️</span>
              You have {exam.questions.length - answeredCount} unanswered
              questions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
