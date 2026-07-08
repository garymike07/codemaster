import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import { Code2, CheckCircle2, Zap, BookOpen, BarChart3, ArrowRight, Brain } from 'lucide-react';
import { COURSE_CATALOG, TRACKS, coursePath } from '@/lib/constants';

const features = [
  { icon: Code2, title: 'Interactive Editor', bgClass: 'bg-primary/10' },
  { icon: CheckCircle2, title: 'Auto-Graded Challenges', bgClass: 'bg-success/10' },
  { icon: Zap, title: 'Learn by Doing', bgClass: 'bg-warning/10' },
  { icon: BookOpen, title: '10 Full Courses', bgClass: 'bg-secondary/10' },
  { icon: BarChart3, title: 'Progress Tracking', bgClass: 'bg-accent/10' },
  { icon: Brain, title: 'AI-Powered Learning', bgClass: 'bg-info/10' },
];

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  const totalLessons = COURSE_CATALOG.reduce((sum, c) => sum + c.lessons, 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-12 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            {!isLoaded ? (
              <div className="h-7 w-20 animate-pulse rounded bg-muted" />
            ) : !isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Get Started</Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    variables: {
                      colorBackground: 'hsl(var(--card))',
                      colorText: 'hsl(var(--foreground))',
                      colorTextSecondary: 'hsl(var(--muted-foreground))',
                      colorPrimary: 'hsl(var(--primary))',
                      colorNeutral: 'hsl(var(--muted-foreground))',
                    },
                    elements: {
                      userButtonPopoverCard: 'shadow-lg border border-border',
                      userButtonPopoverActionButton: 'text-foreground hover:bg-muted/60',
                      userButtonPopoverActionButtonText: 'text-foreground',
                      userButtonPopoverActionButtonIcon: 'text-foreground',
                      userPreviewMainIdentifier: 'text-foreground',
                      userPreviewSecondaryIdentifier: 'text-muted-foreground',
                    },
                  }}
                />
                <Button size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            JavaScript · Python · AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Learn to code with <span className="text-gradient-primary">interactive courses</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            {COURSE_CATALOG.length} courses, {totalLessons}+ lessons — JavaScript, Python, and AI
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {!isLoaded ? (
              <div className="h-9 w-40 animate-pulse rounded bg-muted" />
            ) : !isSignedIn ? (
              <SignUpButton mode="modal">
                <Button className="gap-1">
                  Start Learning Free
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </SignUpButton>
            ) : (
              <Button asChild>
                <Link to="/dashboard">
                  Continue Learning
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link to={isSignedIn ? '/courses' : '#demo'}>
                {isSignedIn ? 'Browse Courses' : 'Try the Editor'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {TRACKS.map((track) => {
        const trackCourses = COURSE_CATALOG.filter((c) => c.track === track.id);
        return (
          <section key={track.id} className="container mx-auto px-4 py-10">
            <div className="mb-6">
              <h2 className={`text-xl font-bold ${track.color}`}>{track.label} Track</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {trackCourses.length} courses · {trackCourses.reduce((s, c) => s + c.lessons, 0)}{' '}
                lessons
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trackCourses.map((course) => (
                <Link
                  key={course.slug}
                  to={isSignedIn ? coursePath(course.slug) : '/'}
                  className="flex items-center gap-3 p-3 border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <span className="text-xl shrink-0" aria-hidden="true">
                    {course.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium truncate">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">{course.lessons} lessons</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {course.level}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">Built for Learners</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-center gap-3 p-3 border border-border bg-card"
              >
                <div
                  className={`h-8 w-8 shrink-0 ${feature.bgClass} flex items-center justify-center`}
                >
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-medium">{feature.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="border border-border bg-card p-6 text-center max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2">Ready to start?</h2>
          <p className="text-xs text-muted-foreground mb-4">
            JavaScript, Python, or AI — pick your track.
          </p>
          {!isLoaded ? (
            <div className="h-9 w-36 animate-pulse rounded bg-muted mx-auto" />
          ) : !isSignedIn ? (
            <SignUpButton mode="modal">
              <Button className="gap-1">
                Create Free Account
                <ArrowRight className="h-3 w-3" />
              </Button>
            </SignUpButton>
          ) : (
            <Button asChild>
              <Link to="/courses">
                Explore All Courses
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 flex justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CodeMaster</p>
          <Link to="/courses">Courses</Link>
        </div>
      </footer>
    </div>
  );
}
