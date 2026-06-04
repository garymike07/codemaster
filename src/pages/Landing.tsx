import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseIcon } from "@/components/ui/course-icon";
import { Logo } from "@/components/ui/logo";
import { LinkBridgeLogo } from "@/components/ui/linkbridge-logo";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import {
  Code2,
  CheckCircle2,
  Zap,
  BookOpen,
  BarChart3,
  Globe,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "SC",
    content: "CodeMaster helped me transition from a non-tech background to landing my dream job. The interactive exercises made learning to code feel like playing a game.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Full-Stack Developer",
    avatar: "JR",
    content: "I've tried many platforms, but CodeMaster's hands-on approach is unmatched. The real-time feedback on my code helped me learn 3x faster.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "CS Student at MIT",
    avatar: "EW",
    content: "The gamification features kept me motivated through tough concepts. I've completed 5 courses and earned my first internship!",
    rating: 5,
  },
  {
    name: "Michael Park",
    role: "Product Manager turned Developer",
    avatar: "MP",
    content: "Finally, a platform that teaches practical skills. Within 3 months, I built my first React app and automated my entire workflow.",
    rating: 5,
  },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "95%", label: "Completion Rate" },
  { value: "4.9", label: "Average Rating" },
  { value: "200+", label: "Coding Challenges" },
];

const features = [
  {
    icon: Code2,
    title: "Interactive Code Editor",
    description:
      "Write and execute code directly in your browser with real-time feedback.",
    bgClass: "bg-primary/10",
  },
  {
    icon: CheckCircle2,
    title: "Auto-Graded Exercises",
    description:
      "Get instant feedback on your solutions with automated test cases.",
    bgClass: "bg-success/10",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description:
      "Practice with hands-on coding challenges after each concept.",
    bgClass: "bg-warning/10",
  },
  {
    icon: BookOpen,
    title: "Expert-Crafted Content",
    description:
      "Courses designed by industry professionals and educators.",
    bgClass: "bg-secondary/10",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed progress tracking.",
    bgClass: "bg-accent/10",
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description:
      "Learn Python, JavaScript, React, Go, Rust, and many more.",
    bgClass: "bg-info/10",
  },
];

const courses = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python", level: "Beginner" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript", level: "Beginner" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", name: "Rust", level: "Advanced" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", name: "Go", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", name: "C#", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", name: "Docker", level: "Intermediate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", name: "Flutter", level: "Intermediate" },
];

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            {!isLoaded ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
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
                <UserButton afterSignOutUrl="/" />
                <Button size="sm" asChild>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm tracking-wide">
            <span className="text-primary mr-1">&#9679;</span> Learn to code the right way
          </Badge>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl leading-[1.1]">
            <span className="font-light">Love coding</span>{" "}
            <span className="text-gradient-primary font-bold">again</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl px-4 leading-relaxed">
            <span className="font-semibold text-foreground">CodeMaster</span> is an interactive learning platform crafted for{" "}
            <span className="text-primary font-medium">speed</span>,{" "}
            <span className="text-warning font-medium">practice</span>, and{" "}
            <span className="text-destructive font-medium">real-world skills</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            {!isLoaded ? (
              <div className="h-10 w-48 animate-pulse rounded-md bg-muted" />
            ) : !isSignedIn ? (
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
            ) : (
              <Button size="lg" className="gap-2" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Link to="/courses">
              <Button size="lg" variant="outline">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container mx-auto px-4 py-16 md:py-20 bg-muted/20">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm tracking-wide mb-4">
            <span className="text-primary mr-1">&#9679;</span> Try it now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Coding in <span className="text-gradient-primary">Seconds</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No signup required. Experience our interactive code editor right now.
          </p>
        </div>
        <InteractiveDemo />
      </section>


      {/* Courses Preview */}
      <section className="container mx-auto px-4 py-16 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient-primary">Popular</span> Courses
          </h2>
          <p className="text-muted-foreground">
            Start your journey with our <span className="text-primary font-medium">most popular</span> programming courses
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee pause-on-hover min-w-full shrink-0">
              {[...courses, ...courses].map((course, index) => (
                <div
                  key={`${course.name}-${index}`}
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 cursor-pointer w-[200px] shrink-0 bg-card hover:shadow-lg"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-semibold">{course.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="flex gap-4 animate-marquee pause-on-hover min-w-full shrink-0" aria-hidden="true">
              {[...courses, ...courses].map((course, index) => (
                <div
                  key={`duplicate-${course.name}-${index}`}
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 cursor-pointer w-[200px] shrink-0 bg-card hover:shadow-lg"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-semibold">{course.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why <span className="text-gradient-secondary">CodeMaster</span>?
          </h2>
          <p className="text-muted-foreground">
            Everything you need to become a <span className="text-primary font-medium">proficient programmer</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-3 p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 bg-card hover:shadow-lg"
              >
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

      {/* Social Proof - Stats */}
      <section className="container mx-auto px-4 py-12 md:py-16 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm tracking-wide mb-4">
            <Star className="h-3.5 w-3.5 inline mr-1 text-warning" />
            Trusted by thousands
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What Our <span className="text-gradient-secondary">Learners</span> Say
          </h2>
          <p className="text-muted-foreground">
            Join a community of <span className="text-primary font-medium">successful developers</span> who started here
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{testimonial.name}</span>
                    <div className="flex text-warning text-sm">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{testimonial.role}</p>
                  <p className="text-sm leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="rounded-xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to <span className="text-gradient-primary">Start Learning</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join <span className="text-primary font-semibold">thousands</span> of learners who are building their programming skills
            with CodeMaster.
          </p>
          {!isLoaded ? (
            <div className="h-10 w-48 animate-pulse rounded-md bg-muted" />
          ) : !isSignedIn ? (
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
          ) : (
            <Button size="lg" className="gap-2" asChild>
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Logo className="mb-4" />
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                Empowering the next generation of developers with interactive learning,
                expert-crafted courses, and real-world projects.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Contact</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="tel:0792618156" className="hover:text-foreground transition-colors">0792618156</a>
                </li>
                <li>
                  <a href="mailto:wrootmike@gmail.com" className="hover:text-foreground transition-colors">wrootmike@gmail.com</a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mike-waitindi-654bb2344/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Legal</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} CodeMaster. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <LinkBridgeLogo size="sm" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}