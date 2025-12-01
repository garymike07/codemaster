import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CourseIcon } from "@/components/ui/course-icon";

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-yellow-500/20 text-yellow-500",
  advanced: "bg-red-500/20 text-red-500",
};

export default function Courses() {
  const courses = useQuery(api.courses.list);
  const enrollments = useQuery(api.enrollments.getMyEnrollments);
  const allProgress = useQuery(api.progress.getAllProgress);

  const getEnrollmentForCourse = (courseId: string) => {
    return enrollments?.find((e) => e.courseId === courseId);
  };

  const getProgressForCourse = (courseId: string) => {
    return allProgress?.find((p) => p?.course?._id === courseId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Explore our catalog of programming courses
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => {
          const enrollment = getEnrollmentForCourse(course._id);
          const progress = getProgressForCourse(course._id);
          const isEnrolled = !!enrollment;

          return (
            <Link key={course._id} to={`/course/${course.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <CourseIcon icon={course.icon} size="lg" />
                      <Badge
                        className={
                          difficultyColors[
                            course.difficulty as keyof typeof difficultyColors
                          ]
                        }
                      >
                        {course.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="emoji-icon">⏱️</span>
                        {course.estimatedHours}h
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="emoji-icon">📖</span>
                        {course.totalLessons} lessons
                      </div>
                    </div>

                    {isEnrolled && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <span className="emoji-icon">📊</span>
                            Progress
                          </span>
                          <span>{progress?.percentage ?? 0}%</span>
                        </div>
                        <Progress
                          value={progress?.percentage ?? 0}
                          className="h-1.5"
                        />
                      </div>
                    )}

                    {!isEnrolled && (
                      <div className="text-sm text-primary font-medium">
                        Start learning →
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {courses?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <span className="emoji-icon text-5xl block mb-4">📚</span>
            <h3 className="font-semibold mb-2">No courses available</h3>
            <p className="text-muted-foreground">
              Check back soon for new courses!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
