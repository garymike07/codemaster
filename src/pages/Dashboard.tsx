import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { CourseIcon } from "@/components/ui/course-icon";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { ProgressCharts } from "@/components/ProgressCharts";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { COURSE_CATALOG, coursePath } from "@/lib/constants";

export default function Dashboard() {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const { addToast } = useToast();

  const { user } = useUser();
  const continuelearning = useQuery(api.enrollments.getContinueLearning);
  const enrollments = useQuery(api.enrollments.getMyEnrollments);
  const allProgress = useQuery(api.progress.getAllProgress);
  const courses = useQuery(api.courses.list);
  const resetAllProgress = useMutation(api.progress.resetAllProgress);

  // Gamification data
  const userStats = useQuery(api.gamification.getUserStats);
  const streak = useQuery(api.gamification.getStreak);
  const userBadges = useQuery(api.gamification.getUserBadges);

  // Activity data for heatmap
  const activityData = useQuery(api.progress.getActivityHeatmap, { days: 365 });

  const hasPendingDashboardData =
    continuelearning === undefined ||
    enrollments === undefined ||
    allProgress === undefined ||
    userStats === undefined ||
    streak === undefined ||
    userBadges === undefined ||
    activityData === undefined;

  useEffect(() => {
    if (!hasPendingDashboardData) {
      setLoadingTimedOut(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setLoadingTimedOut(true);
    }, 8000);

    return () => window.clearTimeout(timeoutId);
  }, [hasPendingDashboardData]);

  if (hasPendingDashboardData && !loadingTimedOut) {
    return <DashboardSkeleton />;
  }

  if (hasPendingDashboardData && loadingTimedOut) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Unable to load dashboard data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The dashboard is still waiting for your local Convex backend. Make sure `bunx convex dev`
            is running and that `VITE_CONVEX_URL` points to an active local deployment.
          </p>
          <div className="rounded-md border bg-background/60 p-3 text-sm">
            <p><strong>Configured backend:</strong> {import.meta.env.VITE_CONVEX_URL ?? "Not set"}</p>
            <p><strong>Expected local command:</strong> <code>bunx convex dev</code></p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://docs.convex.dev/quickstart", "_blank", "noopener,noreferrer")}
            >
              Convex Setup Help
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = {
    totalCourses: enrollments?.length ?? 0,
    completedLessons: allProgress?.reduce((sum, p) => sum + (p?.completed ?? 0), 0) ?? 0,
    averageProgress:
      allProgress && allProgress.length > 0
        ? Math.round(
          allProgress.reduce((sum, p) => sum + (p?.percentage ?? 0), 0) /
          allProgress.length
        )
        : 0,
  };

  const handleResetProgress = async () => {
    setIsResetting(true);
    try {
      await resetAllProgress();
      setShowResetConfirm(false);
    } catch (error) {
      console.error("Failed to reset progress:", error);
      addToast("Failed to reset progress. Please try again.", "error");
    } finally {
      setIsResetting(false);
    }
  };

  const getLevelName = (level: number) => {
    const names = ["Novice", "Apprentice", "Junior", "Developer", "Senior", "Expert", "Master", "Grandmaster"];
    return names[Math.min(level - 1, names.length - 1)] || "Novice";
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user?.firstName ?? "Learner"}!
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Pick up your JavaScript course where you left off
          </p>
        </div>
      </div>

      {/* Continue Learning */}
      {continuelearning && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Continue Learning
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold">
                  {continuelearning.course.title}
                </h3>
                {continuelearning.currentLesson && (
                  <p className="text-muted-foreground text-sm">
                    {continuelearning.currentLesson.title}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <Progress
                    value={continuelearning.percentage}
                    className="w-32 md:w-48 h-2"
                  />
                  <span className="text-sm text-muted-foreground">
                    {continuelearning.percentage}%
                  </span>
                </div>
              </div>
              <Link
                to={
                  continuelearning.currentLesson
                    ? `/lesson/${continuelearning.currentLesson._id}`
                    : `/course/${continuelearning.course.slug}`
                }
              >
                <Button className="gap-2 w-full sm:w-auto">
                  <span className="emoji-icon">▶️</span>
                  Resume
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gamification Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* XP & Level Card */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level & XP</CardTitle>
            <span className="emoji-icon text-lg">⚡</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{userStats?.level ?? 1}</span>
              <Badge variant="outline" className="text-xs">
                {getLevelName(userStats?.level ?? 1)}
              </Badge>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{userStats?.totalXp ?? 0} XP</span>
                <span>{userStats?.levelProgress?.next ?? 100} XP</span>
              </div>
              <Progress value={userStats?.levelProgress?.progress ?? 0} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card className={streak?.currentStreak && streak.currentStreak > 0 ? "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <span className="emoji-icon text-lg">🔥</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{streak?.currentStreak ?? 0}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Best: {streak?.longestStreak ?? 0} days
            </p>
            {streak?.isActiveToday && (
              <Badge variant="secondary" className="mt-2 text-xs">
                <span className="emoji-icon mr-1">⭐</span>
                Active today
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Lessons Completed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Done</CardTitle>
            <span className="emoji-icon text-lg">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.lessonsCompleted ?? stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {userStats?.challengesCompleted ?? 0} challenges
            </p>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <span className="emoji-icon text-lg">🏅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBadges?.length ?? 0}</div>
            {userBadges && userBadges.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {userBadges.slice(0, 4).map((badge, i) => (
                  <span key={i} className="text-lg" title={badge?.name}>
                    {badge?.icon}
                  </span>
                ))}
                {userBadges.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{userBadges.length - 4}</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Course Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
            <span className="emoji-icon text-lg">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exams Passed
            </CardTitle>
            <span className="emoji-icon text-lg">🏆</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.examsPassed ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Progress
            </CardTitle>
            <span className="emoji-icon text-lg">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Visualization */}
      <ProgressCharts
        totalXp={userStats?.totalXp ?? 0}
        level={userStats?.level ?? 1}
        lessonsCompleted={userStats?.lessonsCompleted ?? stats.completedLessons}
        challengesCompleted={userStats?.challengesCompleted ?? 0}
        examsPassed={userStats?.examsPassed ?? 0}
      />

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="emoji-icon">📅</span>
            Learning Activity
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your coding activity over the past year
          </p>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap
            data={activityData ?? []}
            maxCount={10}
          />
        </CardContent>
      </Card>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <Link to="/courses">
            <Button variant="ghost" size="sm" className="gap-1">
              Browse Catalog
              <span className="emoji-icon">→</span>
            </Button>
          </Link>
        </div>

        {enrollments && enrollments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.slice(0, 6).map((enrollment) => {
              if (!enrollment.course) return null;
              const progress = allProgress?.find(
                (p) => p?.course?._id === enrollment.courseId
              );
              return (
                <Link
                  key={enrollment._id}
                  to={`/course/${enrollment.course.slug}`}
                >
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <CourseIcon icon={enrollment.course.icon} size="md" />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {enrollment.course.description}
                          </p>
                          <div className="space-y-1">
                            <Progress
                              value={progress?.percentage ?? 0}
                              className="h-1.5"
                            />
                            <p className="text-xs text-muted-foreground">
                              {progress?.percentage ?? 0}% complete
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <span className="emoji-icon text-5xl block mb-4">📚</span>
              <h3 className="font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-4">
                Choose from {COURSE_CATALOG.length} courses across JavaScript, Python, and AI
              </p>
              <Link to="/courses">
                <Button className="min-h-11">Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {courses && courses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Explore Courses</h2>
            <Link to="/courses">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((c) => !enrollments?.some((e) => e.courseId === c._id))
              .slice(0, 6)
              .map((course) => (
                <Link key={course._id} to={coursePath(course.slug ?? "")}>
                  <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardContent className="pt-6 flex items-center gap-3">
                      <CourseIcon icon={course.icon} size="md" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">{course.totalLessons} lessons</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="emoji-icon">💻</span>
              Practice Playground
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Experiment with JavaScript code outside of lessons
            </p>
            <Link to="/playground">
              <Button variant="outline" className="w-full min-h-11">
                Open Playground
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="emoji-icon">📋</span>
              JavaScript Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Test your knowledge with coding challenges
            </p>
            <Link to="/exams">
              <Button variant="outline" className="w-full min-h-11">
                Take a Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Reset Progress Section */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <span className="emoji-icon">🔄</span>
            Reset Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Start fresh by resetting all your learning progress. This will clear all completed lessons, 
            playground sessions, AI chat history, and personal notes.
          </p>
          {!showResetConfirm ? (
            <Button
              variant="destructive"
              onClick={() => setShowResetConfirm(true)}
            >
              🗑️ Reset All Progress
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-sm font-medium text-destructive">
                ⚠️ Are you sure? This action cannot be undone!
              </p>
              <p className="text-xs text-muted-foreground">
                All your completed lessons, code sessions, AI conversations, and notes will be permanently deleted.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={handleResetProgress}
                  disabled={isResetting}
                >
                  {isResetting ? "Resetting..." : "Yes, Reset Everything"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowResetConfirm(false)}
                  disabled={isResetting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
