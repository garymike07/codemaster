import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CourseIcon } from "@/components/ui/course-icon";
import { MessagingPanel } from "@/components/messaging/MessagingPanel";
import { ExamCreator } from "@/components/exams/ExamCreator";
import { ExamBank } from "@/components/exams/ExamBank";
import {
  Users,
  ClipboardList,
  Mail,
  BarChart3,
  Plus,
  Trash2,
  MessageSquare,
  Wand2,
  Eye,
  EyeOff,
  Database,
} from "lucide-react";
import type { Id } from "../../convex/_generated/dataModel";

type TabType = "students" | "exams" | "bank" | "messages" | "analytics";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("students");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [showMessaging, setShowMessaging] = useState(false);
  const [showExamCreator, setShowExamCreator] = useState(false);

  const stats = useQuery(api.teacher.getDashboardStats);
  const students = useQuery(api.teacher.getMyStudents);
  const exams = useQuery(api.teacher.getMyExams);
  const unreadCount = useQuery(api.messaging.getUnreadCount);
  const courses = useQuery(api.courses.list);

  const addStudent = useMutation(api.teacher.addStudent);
  const removeStudent = useMutation(api.teacher.removeStudent);
  const publishExam = useMutation(api.examPublishing.publishExam);
  const unpublishExam = useMutation(api.examPublishing.unpublishExam);

  const handleAddStudent = async () => {
    if (!studentEmail) return;
    try {
      await addStudent({ studentEmail });
      setStudentEmail("");
      setShowAddStudent(false);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to add student";
      alert(message);
    }
  };

  const handleRemoveStudent = async (studentId: Id<"users">) => {
    if (confirm("Remove this student from your class?")) {
      await removeStudent({ studentId });
    }
  };

  const handlePublishExam = async (examId: Id<"exams">) => {
    try {
      await publishExam({ examId });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to publish exam";
      alert(message);
    }
  };

  const handleUnpublishExam = async (examId: Id<"exams">) => {
    try {
      await unpublishExam({ examId });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to unpublish exam";
      alert(message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your students and classes</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowMessaging(true)}
          className="relative w-fit"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Messages
          {unreadCount && unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStudents ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalExams ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unreadMessages ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingGrading ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        {(["students", "exams", "bank", "messages", "analytics"] as TabType[]).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize shrink-0"
            size="sm"
          >
            {tab === "students" && <Users className="h-4 w-4 md:mr-2" />}
            {tab === "exams" && <ClipboardList className="h-4 w-4 md:mr-2" />}
            {tab === "bank" && <Database className="h-4 w-4 md:mr-2" />}
            {tab === "messages" && <Mail className="h-4 w-4 md:mr-2" />}
            {tab === "analytics" && <BarChart3 className="h-4 w-4 md:mr-2" />}
            <span className="hidden md:inline">{tab === "bank" ? "Question Bank" : tab}</span>
          </Button>
        ))}
      </div>

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Students</h2>
            <Button onClick={() => setShowAddStudent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          {showAddStudent && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter student email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border bg-background"
                  />
                  <Button onClick={handleAddStudent}>Add</Button>
                  <Button variant="ghost" onClick={() => setShowAddStudent(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {students && students.length > 0 ? (
            <div className="rounded-lg border overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-left">Courses</th>
                    <th className="px-4 py-3 text-left">Progress</th>
                    <th className="px-4 py-3 text-left">Level</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-b">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {student.courses.slice(0, 3).map((course, i) => (
                            <div key={i} title={course.title}>
                              <CourseIcon icon={course.icon} size="sm" />
                            </div>
                          ))}
                          {student.courses.length > 3 && (
                            <span className="text-sm text-muted-foreground">
                              +{student.courses.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <Progress
                            value={
                              student.courses.length > 0
                                ? student.courses.reduce((sum, c) => sum + c.percentage, 0) /
                                  student.courses.length
                                : 0
                            }
                            className="h-2 w-24"
                          />
                          <span className="text-xs text-muted-foreground">
                            {student.stats.lessonsCompleted} lessons
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">Lv {student.stats.level}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowMessaging(true)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveStudent(student._id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No students yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add students to your class to track their progress
                </p>
                <Button onClick={() => setShowAddStudent(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </CardContent>
            </Card>
          )}

        </div>
      )}

      {/* Exams Tab */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Exams</h2>
            <Button onClick={() => setShowExamCreator(true)}>
              <Wand2 className="h-4 w-4 mr-2" />
              Create AI Exam
            </Button>
          </div>

          {exams && exams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {exams.map((exam) => (
                <Card key={exam._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{exam.title}</span>
                      <Badge variant={exam.isPublished ? "default" : "secondary"}>
                        {exam.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Submissions</p>
                        <p className="font-semibold">{exam.submissionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Passed</p>
                        <p className="font-semibold">{exam.passedCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Score</p>
                        <p className="font-semibold">{exam.avgScore}%</p>
                      </div>
                    </div>
                    <Button
                      variant={exam.isPublished ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        exam.isPublished
                          ? handleUnpublishExam(exam._id)
                          : handlePublishExam(exam._id)
                      }
                    >
                      {exam.isPublished ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Publish to Students
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No exams created</h3>
                <p className="text-muted-foreground mb-4">
                  Create exams to assess your students' knowledge
                </p>
                <Button onClick={() => setShowExamCreator(true)}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Create AI Exam
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Question Bank Tab */}
      {activeTab === "bank" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Question Bank</h2>
            <p className="text-muted-foreground text-sm">
              Questions are automatically saved here when you create exams
            </p>
          </div>
          <ExamBank />
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Button onClick={() => setShowMessaging(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Chat
            </Button>
          </div>

          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Real-time Messaging</h3>
              <p className="text-muted-foreground mb-4">
                Chat with your students in real-time using the new messaging system
              </p>
              <Button onClick={() => setShowMessaging(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Open Messages
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Class Analytics</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                {courses && courses.length > 0 ? (
                  <div className="space-y-3">
                    {courses.slice(0, 5).map((course) => {
                      const enrolledCount =
                        students?.filter((s) =>
                          s.courses.some((c) => c.title === course.title)
                        ).length ?? 0;
                      return (
                        <div key={course._id} className="flex items-center gap-3">
                          <CourseIcon icon={course.icon} size="md" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{course.title}</p>
                            <Progress
                              value={(enrolledCount / Math.max(students?.length || 1, 1)) * 100}
                              className="h-1.5"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {enrolledCount} students
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No courses available
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {students && students.length > 0 ? (
                  <div className="space-y-3">
                    {students
                      .sort((a, b) => b.stats.totalXp - a.stats.totalXp)
                      .slice(0, 5)
                      .map((student, index) => (
                        <div key={student._id} className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.stats.totalXp} XP
                            </p>
                          </div>
                          <Badge variant="outline">Lv {student.stats.level}</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No students enrolled
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Messaging Panel */}
      <MessagingPanel
        isOpen={showMessaging}
        onClose={() => setShowMessaging(false)}
      />

      {/* Exam Creator */}
      <ExamCreator
        isOpen={showExamCreator}
        onClose={() => setShowExamCreator(false)}
      />
    </div>
  );
}
