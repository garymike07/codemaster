import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileQuestion, CheckCircle, XCircle, Trophy } from "lucide-react";

export default function Exams() {
  const exams = useQuery(api.exams.list);
  const submissions = useQuery(api.exams.getMySubmissions);

  const availableExams =
    exams?.filter(
      (exam) => !submissions?.some((s) => s.examId === exam._id && s.passed)
    ) ?? [];

  const completedExams = submissions?.filter((s) => s.passed) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exams</h1>
        <p className="text-muted-foreground">
          Test your knowledge with course assessments
        </p>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">
            Available ({availableExams.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedExams.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            History ({submissions?.length ?? 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          {availableExams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableExams.map((exam) => (
                <Card key={exam._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        {exam.course && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {exam.course.title}
                          </p>
                        )}
                      </div>
                      <Badge>{exam.questions.length} questions</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {exam.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {exam.durationMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        Pass: {exam.passingScore}%
                      </span>
                    </div>
                    <Link to={`/exam/${exam._id}`}>
                      <Button className="w-full">Start Exam</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No exams available</h3>
                <p className="text-muted-foreground">
                  Check back later for new assessments
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedExams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedExams.map((submission) => (
                <Card key={submission._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {submission.exam?.title}
                        </CardTitle>
                        {submission.course && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {(submission.course as { title: string }).title}
                          </p>
                        )}
                      </div>
                      <Badge variant="success" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Passed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Score</span>
                        <span className="font-medium">
                          {submission.percentageScore}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points</span>
                        <span>
                          {submission.score}/{submission.exam?.totalPoints}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time</span>
                        <span>
                          {Math.floor((submission.timeSpentSeconds ?? 0) / 60)}m{" "}
                          {(submission.timeSpentSeconds ?? 0) % 60}s
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No completed exams</h3>
                <p className="text-muted-foreground">
                  Complete an exam to see your results here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission._id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {submission.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <h4 className="font-medium">
                            {submission.exam?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {submission.percentageScore}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {submission.score}/{submission.exam?.totalPoints} points
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No exam history</h3>
                <p className="text-muted-foreground">
                  Your exam attempts will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
