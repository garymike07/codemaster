import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/useToast';
import { CourseIcon } from '@/components/ui/course-icon';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { DashboardSkeleton } from '@/components/ui/skeleton';
import { COURSE_CATALOG, coursePath } from '@/lib/constants';

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
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setLoadingTimedOut(true);
    }, 8000);

    return () => {
      window.clearTimeout(timeoutId);
      setLoadingTimedOut(false);
    };
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
            The dashboard is still waiting for your local Convex backend. Make sure `bunx convex
            dev` is running and that `VITE_CONVEX_URL` points to an active local deployment.
          </p>
          <div className="rounded-md border bg-background/60 p-3 text-sm">
            <p>
              <strong>Configured backend:</strong> {import.meta.env.VITE_CONVEX_URL ?? 'Not set'}
            </p>
            <p>
              <strong>Expected local command:</strong> <code>bunx convex dev</code>
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open('https://docs.convex.dev/quickstart', '_blank', 'noopener,noreferrer')
              }
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
            allProgress.reduce((sum, p) => sum + (p?.percentage ?? 0), 0) / allProgress.length
          )
        : 0,
  };

  const handleResetProgress = async () => {
    setIsResetting(true);
    try {
      await resetAllProgress();
      setShowResetConfirm(false);
    } catch (error) {
      console.error('Failed to reset progress:', error);
      addToast('Failed to reset progress. Please try again.', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Welcome back, {user?.firstName ?? 'Learner'}</h1>
        </div>
      </div>

      {/* Continue Learning */}
      {continuelearning && (
        <Card className="border-primary/20">
          <CardHeader className="pb-1">
            <div className="text-xs text-muted-foreground">Continue Learning</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-sm font-semibold truncate">{continuelearning.course.title}</h3>
                {continuelearning.currentLesson && (
                  <p className="text-xs text-muted-foreground truncate">
                    {continuelearning.currentLesson.title}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Progress value={continuelearning.percentage} className="w-24 h-1.5" />
                  <span className="text-xs text-muted-foreground">
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
                <Button size="sm">Resume</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats row */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Level & XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{userStats?.level ?? 1}</div>
            <div className="text-xs text-muted-foreground">{userStats?.totalXp ?? 0} XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{streak?.currentStreak ?? 0}</div>
            <div className="text-xs text-muted-foreground">Best: {streak?.longestStreak ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Lessons Done</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {userStats?.lessonsCompleted ?? stats.completedLessons}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{userBadges?.length ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Stats */}
      <div className="grid gap-3 grid-cols-3">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Exams Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{userStats?.examsPassed ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Learning Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap data={activityData ?? []} maxCount={10} />
        </CardContent>
      </Card>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">My Courses</h2>
          <Link to="/courses">
            <Button variant="ghost" size="sm">
              Browse Catalog
            </Button>
          </Link>
        </div>

        {enrollments && enrollments.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.slice(0, 6).map((enrollment) => {
              if (!enrollment.course) return null;
              const progress = allProgress?.find((p) => p?.course?._id === enrollment.courseId);
              return (
                <Link key={enrollment._id} to={`/course/${enrollment.course.slug}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <CourseIcon icon={enrollment.course.icon} size="sm" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate">
                            {enrollment.course.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={progress?.percentage ?? 0} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">
                              {progress?.percentage ?? 0}%
                            </span>
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
            <CardContent className="py-8 text-center">
              <h3 className="font-semibold text-sm mb-1">No courses yet</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {COURSE_CATALOG.length} courses available
              </p>
              <Link to="/courses">
                <Button size="sm">Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {courses && courses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Explore Courses</h2>
            <Link to="/courses">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((c) => !enrollments?.some((e) => e.courseId === c._id))
              .slice(0, 6)
              .map((course) => (
                <Link key={course._id} to={coursePath(course.slug ?? '')}>
                  <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-3 flex items-center gap-3">
                      <CourseIcon icon={course.icon} size="sm" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium truncate">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {course.totalLessons} lessons
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Practice Playground</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Write and test JavaScript</span>
            <Link to="/playground">
              <Button size="sm" variant="outline">
                Open
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">JavaScript Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Test your knowledge</span>
            <Link to="/exams">
              <Button size="sm" variant="outline">
                Take Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Reset Progress Section */}
      <Card className="border-destructive/50">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm text-destructive">Reset Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResetConfirm ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Clear all completed lessons and data
              </span>
              <Button variant="destructive" size="sm" onClick={() => setShowResetConfirm(true)}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="space-y-2 p-3 bg-destructive/10 border border-destructive/30">
              <p className="text-xs font-medium text-destructive">
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleResetProgress}
                  disabled={isResetting}
                >
                  {isResetting ? 'Resetting...' : 'Yes, Reset'}
                </Button>
                <Button
                  size="sm"
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
