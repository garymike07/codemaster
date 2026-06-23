import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import {
  Code2,
  CheckCircle2,
  Zap,
  BookOpen,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { COURSE_CATALOG, TRACKS, coursePath } from "@/lib/constants";

const features = [
  {
    icon: Code2,
    title: "Interactive Editor",
    description: "Write and run JavaScript or Python in the browser with instant feedback.",
    bgClass: "bg-primary/10",
  },
  {
    icon: CheckCircle2,
    title: "Auto-Graded Challenges",
    description: "Practice exercises with automated tests after every concept.",
    bgClass: "bg-success/10",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description: "Short theory lessons followed by hands-on coding — not passive video.",
    bgClass: "bg-warning/10",
  },
  {
    icon: BookOpen,
    title: "10 Full Courses",
    description: "JavaScript, Python, and AI tracks from beginner to intermediate.",
    bgClass: "bg-secondary/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Resume where you left off with streaks, XP, and completion percentages.",
    bgClass: "bg-accent/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "In-lesson AI tutor, quizzes, and dedicated AI development courses.",
    bgClass: "bg-info/10",
  },
];

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  const totalLessons = COURSE_CATALOG.reduce((sum, c) => sum + c.lessons, 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            {!isLoaded ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : !isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="min-h-11">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="min-h-11">Get Started</Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <UserButton afterSignOutUrl="/" />
                <Button size="sm" className="min-h-11" asChild>
                  <Link to="/dashboard">
                    Dashboard
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            JavaScript · Python · AI
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight font-bold">
            Learn to code with{" "}
            <span className="text-gradient-primary">interactive courses</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            CodeMaster offers {COURSE_CATALOG.length} structured courses and {totalLessons}+ lessons
            across web development, Python, and practical AI — with notes, exercises, and progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {!isLoaded ? (
              <div className="h-11 w-48 animate-pulse rounded-md bg-muted" />
            ) : !isSignedIn ? (
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2 min-h-11">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
            ) : (
              <Button size="lg" className="gap-2 min-h-11" asChild>
                <Link to="/dashboard">
                  Continue Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="min-h-11" asChild>
              <Link to={isSignedIn ? "/courses" : "#demo"}>
                {isSignedIn ? "Browse Courses" : "Try the Editor"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="demo" className="container mx-auto px-4 py-12 md:py-16 bg-muted/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Try JavaScript Now</h2>
          <p className="text-muted-foreground">Edit the code and click Run — no account required.</p>
        </div>
        <InteractiveDemo />
      </section>

      {TRACKS.map((track) => {
        const trackCourses = COURSE_CATALOG.filter((c) => c.track === track.id);
        return (
          <section key={track.id} className="container mx-auto px-4 py-12 md:py-16">
            <div className="mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold ${track.color}`}>{track.label} Track</h2>
              <p className="text-muted-foreground mt-1">
                {trackCourses.length} courses · {trackCourses.reduce((s, c) => s + c.lessons, 0)} lessons
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trackCourses.map((course) => (
                <Link
                  key={course.slug}
                  to={isSignedIn ? coursePath(course.slug) : "/"}
                  className="flex flex-col gap-3 p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">{course.icon}</span>
                    <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                  </div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{course.description}</p>
                  <p className="text-xs text-muted-foreground">{course.lessons} lessons</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Built for Learners</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col gap-3 p-6 rounded-lg border border-border bg-card">
                <div className={`h-12 w-12 rounded-lg ${feature.bgClass} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="rounded-xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 md:p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-muted-foreground mb-8">
            Pick a track — JavaScript for web, Python for data and backends, or AI for modern product features.
          </p>
          {!isLoaded ? (
            <div className="h-11 w-48 animate-pulse rounded-md bg-muted mx-auto" />
          ) : !isSignedIn ? (
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2 min-h-11">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
          ) : (
            <Button size="lg" className="gap-2 min-h-11" asChild>
              <Link to="/courses">
                Explore All Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CodeMaster — JavaScript, Python & AI learning</p>
          <Link to="/courses" className="hover:text-foreground transition-colors">
            Course catalog
          </Link>
        </div>
      </footer>
    </div>
  );
}
