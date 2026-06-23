import { useMemo, useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CourseIcon } from "@/components/ui/course-icon";
import { BookOpen, Clock, BarChart3, Search, Database, RefreshCw } from "lucide-react";
import { COURSE_CATALOG, TRACKS, coursePath, type CourseTrack } from "@/lib/constants";

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-yellow-500/20 text-yellow-500",
  advanced: "bg-red-500/20 text-red-500",
};

export default function Courses() {
  const [trackFilter, setTrackFilter] = useState<CourseTrack | "all">("all");
  const [search, setSearch] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);
  const seedAttemptedRef = useRef(false);
  const { isSignedIn } = useUser();
  const courses = useQuery(api.courses.list);
  const enrollments = useQuery(api.enrollments.getMyEnrollments);
  const allProgress = useQuery(api.progress.getAllProgress);
  const ensureSeeded = useMutation(api.ensureSeeded.run);

  useEffect(() => {
    if (courses === undefined || seedAttemptedRef.current) return;
    if (courses.length > 0) return;
    seedAttemptedRef.current = true;
    ensureSeeded().catch(() => {});
  }, [courses, ensureSeeded]);

  const getEnrollmentForCourse = (courseId: string) =>
    enrollments?.find((e) => e.courseId === courseId);

  const getProgressForCourse = (courseId: string) =>
    allProgress?.find((p) => p?.course?._id === courseId);

  const filteredCourses = useMemo(() => {
    if (!courses) return undefined;
    return courses.filter((course) => {
      const meta = COURSE_CATALOG.find((c) => c.slug === course.slug);
      const matchesTrack =
        trackFilter === "all" || meta?.track === trackFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q);
      return matchesTrack && matchesSearch;
    });
  }, [courses, trackFilter, search]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <p className="text-muted-foreground">
          JavaScript, Python, and AI — {COURSE_CATALOG.length} structured courses with interactive lessons
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-md border border-input bg-background text-sm"
            aria-label="Search courses"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={trackFilter === "all" ? "secondary" : "outline"}
            className="min-h-11"
            onClick={() => setTrackFilter("all")}
          >
            All tracks
          </Button>
          {TRACKS.map((track) => (
            <Button
              key={track.id}
              size="sm"
              variant={trackFilter === track.id ? "secondary" : "outline"}
              className="min-h-11"
              onClick={() => setTrackFilter(track.id)}
            >
              {track.label}
            </Button>
          ))}
        </div>
      </div>

      {!courses && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="space-y-4 animate-pulse">
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCourses && filteredCourses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const enrollment = getEnrollmentForCourse(course._id);
            const progress = getProgressForCourse(course._id);
            const meta = COURSE_CATALOG.find((c) => c.slug === course.slug);
            const isEnrolled = !!enrollment;

            return (
              <Link key={course._id} to={coursePath(course.slug ?? "")}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <CourseIcon icon={course.icon} size="lg" />
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            className={
                              difficultyColors[
                                course.difficulty as keyof typeof difficultyColors
                              ] ?? difficultyColors.beginner
                            }
                          >
                            {course.difficulty}
                          </Badge>
                          {meta && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {meta.track}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.estimatedHours}h
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {course.totalLessons} lessons
                        </div>
                      </div>

                      {isEnrolled && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <BarChart3 className="h-4 w-4" />
                              Progress
                            </span>
                            <span>{progress?.percentage ?? 0}%</span>
                          </div>
                          <Progress value={progress?.percentage ?? 0} className="h-1.5" />
                        </div>
                      )}

                      {!isEnrolled && isSignedIn && (
                        <p className="text-sm text-primary font-medium">Start learning →</p>
                      )}

                      {!isSignedIn && (
                        <p className="text-sm text-muted-foreground">Sign in to enroll</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {filteredCourses?.length === 0 && courses && courses.length > 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No courses match your filters.
          </CardContent>
        </Card>
      )}

      {courses?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Courses will auto-seed when the backend finishes syncing.
              You can also run <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bun run seed</code> to populate the database immediately.
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={isSeeding}
              onClick={() => {
                setIsSeeding(true);
                ensureSeeded()
                  .catch(() => {})
                  .finally(() => setIsSeeding(false));
              }}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSeeding ? "animate-spin" : ""}`} />
              {isSeeding ? "Seeding..." : "Seed Now"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
