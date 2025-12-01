import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CourseIcon } from "@/components/ui/course-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Id } from "../../convex/_generated/dataModel";

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-yellow-500/20 text-yellow-500",
  advanced: "bg-red-500/20 text-red-500",
};

const lessonTypeIcons = {
  theory: "📖",
  practice: "💻",
  challenge: "🏆",
};

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = useQuery(api.courses.getBySlug, { slug: slug ?? "" });
  const courseWithModules = useQuery(
    api.courses.getCourseWithModulesAndLessons,
    course ? { courseId: course._id } : "skip"
  );
  const enrollment = useQuery(
    api.enrollments.getEnrollment,
    course ? { courseId: course._id } : "skip"
  );
  const progressData = useQuery(
    api.progress.getForCourse,
    course ? { courseId: course._id } : "skip"
  );
  const courseProgress = useQuery(
    api.progress.getCourseProgress,
    course ? { courseId: course._id } : "skip"
  );

  const enroll = useMutation(api.enrollments.enroll);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const isEnrolled = !!enrollment;
  const completedLessonIds = new Set(progressData?.map((p) => p.lessonId) ?? []);

  const handleEnroll = async () => {
    await enroll({ courseId: course._id });
  };

  const getFirstLesson = () => {
    if (!courseWithModules?.modules?.length) return null;
    const firstModule = courseWithModules.modules[0];
    if (!firstModule.lessons?.length) return null;
    return firstModule.lessons[0];
  };

  const getNextLesson = () => {
    if (!courseWithModules?.modules) return getFirstLesson();
    
    for (const module of courseWithModules.modules) {
      for (const lesson of module.lessons) {
        if (!completedLessonIds.has(lesson._id)) {
          return lesson;
        }
      }
    }
    return getFirstLesson();
  };

  const nextLesson = getNextLesson();

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/courses">
        <Button variant="ghost" size="sm" className="gap-2">
          <span className="emoji-icon">←</span>
          Back to Courses
        </Button>
      </Link>

      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <CourseIcon icon={course.icon} size="xl" />
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  className={
                    difficultyColors[
                      course.difficulty as keyof typeof difficultyColors
                    ]
                  }
                >
                  {course.difficulty}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <span className="emoji-icon">⏱️</span>
                  {course.estimatedHours} hours
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <span className="emoji-icon">📖</span>
                  {course.totalLessons} lessons
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">{course.description}</p>
        </div>

        {/* Progress / Enroll Card */}
        <Card className="md:w-80 shrink-0">
          <CardHeader>
            <CardTitle>
              {isEnrolled ? "Your Progress" : "Get Started"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEnrolled ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{courseProgress?.percentage ?? 0}%</span>
                  </div>
                  <Progress value={courseProgress?.percentage ?? 0} />
                  <p className="text-sm text-muted-foreground">
                    {courseProgress?.completed ?? 0} of {courseProgress?.total ?? 0} lessons completed
                  </p>
                </div>
                {nextLesson && (
                  <Link to={`/lesson/${nextLesson._id}`}>
                    <Button className="w-full gap-2">
                      <span className="emoji-icon">▶️</span>
                      {completedLessonIds.size === 0
                        ? "Start Learning"
                        : "Continue Learning"}
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Enroll to track your progress and access all lessons.
                </p>
                <Button className="w-full" onClick={handleEnroll}>
                  Enroll Now - Free
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Course Content */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {courseWithModules?.modules && courseWithModules.modules.length > 0 ? (
          <Accordion type="multiple" className="space-y-2">
            {courseWithModules.modules.map((module, index) => (
              <AccordionItem
                key={module._id}
                value={module._id}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">
                      Module {index + 1}
                    </span>
                    <span className="font-medium">{module.title}</span>
                    <Badge variant="secondary" className="ml-2">
                      {module.lessons.length} lessons
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessonIds.has(lesson._id);
                      return (
                        <Link
                          key={lesson._id}
                          to={isEnrolled ? `/lesson/${lesson._id}` : "#"}
                          onClick={(e) => {
                            if (!isEnrolled) e.preventDefault();
                          }}
                        >
                          <div
                            className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                              isEnrolled
                                ? "hover:bg-muted cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {isCompleted ? (
                              <span className="emoji-icon text-lg">✅</span>
                            ) : (
                              <span className="emoji-icon text-lg">⭕</span>
                            )}
                            <span className="text-lg">
                              {
                                lessonTypeIcons[
                                  lesson.type as keyof typeof lessonTypeIcons
                                ]
                              }
                            </span>
                            <div className="flex-1">
                              <p
                                className={
                                  isCompleted ? "text-muted-foreground" : ""
                                }
                              >
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {lesson.type}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No lessons available yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
