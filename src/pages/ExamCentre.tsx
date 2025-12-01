import { useState } from "react";
import { useQuery } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

type ExamStatus = "not_started" | "in_progress" | "completed" | "";

export default function ExamCentre() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<ExamStatus>("");
  
  const publishedExams = useQuery(api.examPublishing.getPublishedExams);

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

  const handleStartExam = (examId: string) => {
    navigate(`/exam-workspace/${examId}`);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Exam Centre</h1>
          <p className="text-muted-foreground">
            View and take your published exams
          </p>
        </div>

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
              <Card key={exam._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{exam.title}</CardTitle>
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
                      disabled={exam.status === "completed" && exam.passed}
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
