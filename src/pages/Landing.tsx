import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseIcon } from "@/components/ui/course-icon";
import { Logo } from "@/components/ui/logo";
import {
  Code2,
  Play,
  CheckCircle,
  Zap,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Play,
    title: "Interactive Code Editor",
    description:
      "Write and execute code directly in your browser with real-time feedback.",
  },
  {
    icon: CheckCircle,
    title: "Auto-Graded Exercises",
    description:
      "Get instant feedback on your solutions with automated test cases.",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description:
      "Practice with hands-on coding challenges after each concept.",
  },
  {
    icon: Users,
    title: "Expert-Crafted Content",
    description:
      "Courses designed by industry professionals and educators.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed progress tracking.",
  },
  {
    icon: Code2,
    title: "Multiple Languages",
    description:
      "Learn Python, JavaScript, React, Go, Rust, and many more.",
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
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button size="sm">Go to Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          <Badge variant="secondary" className="px-4 py-1">
            Learn to code the right way
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">
            Master Programming with{" "}
            <span className="text-primary">Interactive Learning</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl px-4">
            Learn programming through hands-on practice. Write real code, get
            instant feedback, and track your progress as you build skills in
            the most in-demand languages.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
            <Link to="/courses">
              <Button size="lg" variant="outline">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="container py-16 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
          <p className="text-muted-foreground">
            Start your journey with our most popular programming courses
          </p>
        </div>
        
        <div className="relative w-full">
          {/* Gradient Masks for Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee pause-on-hover min-w-full shrink-0">
              {[...courses, ...courses].map((course, index) => (
                <div
                  key={`${course.name}-${index}`}
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer w-[200px] shrink-0 bg-card"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-medium">{course.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop (handled by single map with double data above, but animate-marquee needs width adjustments if using transform translate) */}
            {/* A safer way for pure CSS marquee is 2 sets of identical content */}
            <div className="flex gap-4 animate-marquee pause-on-hover min-w-full shrink-0" aria-hidden="true">
              {[...courses, ...courses].map((course, index) => (
                <div
                  key={`duplicate-${course.name}-${index}`}
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer w-[200px] shrink-0 bg-card"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-medium">{course.name}</span>
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
      <section className="container px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why CodeMaster?</h2>
          <p className="text-muted-foreground">
            Everything you need to become a proficient programmer
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-3 p-6 rounded-lg border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 py-12 md:py-16">
        <div className="rounded-lg border border-border bg-card p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of learners who are building their programming skills
            with CodeMaster.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Logo className="mb-4" />
              <p className="text-muted-foreground max-w-sm">
                Empowering the next generation of developers with interactive learning, 
                expert-crafted courses, and real-world projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="text-lg emoji-icon">📞</span>
                  <a href="tel:0792618156">0792618156</a>
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="text-lg emoji-icon">📧</span>
                  <a href="mailto:wrootmike@gmail.com">wrootmike@gmail.com</a>
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="text-lg emoji-icon">🔗</span>
                  <a 
                    href="https://www.linkedin.com/in/mike-waitindi-654bb2344/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeMaster. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Designed with 💻 by Mike Waitindi
              </p>
              <img 
                src="/developer.png" 
                alt="Mike Waitindi" 
                className="h-8 w-8 rounded-full object-cover border border-border" 
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
