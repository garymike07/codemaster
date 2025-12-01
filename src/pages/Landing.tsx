import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseIcon } from "@/components/ui/course-icon";
import { Logo } from "@/components/ui/logo";
import { LinkBridgeLogo } from "@/components/ui/linkbridge-logo";

const features = [
  {
    emoji: "▶️",
    title: "Interactive Code Editor",
    description:
      "Write and execute code directly in your browser with real-time feedback.",
    bgClass: "bg-coral/10",
  },
  {
    emoji: "✅",
    title: "Auto-Graded Exercises",
    description:
      "Get instant feedback on your solutions with automated test cases.",
    bgClass: "bg-mint/10",
  },
  {
    emoji: "⚡",
    title: "Learn by Doing",
    description:
      "Practice with hands-on coding challenges after each concept.",
    bgClass: "bg-amber/10",
  },
  {
    emoji: "👨‍🏫",
    title: "Expert-Crafted Content",
    description:
      "Courses designed by industry professionals and educators.",
    bgClass: "bg-violet/10",
  },
  {
    emoji: "🏆",
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed progress tracking.",
    bgClass: "bg-rose/10",
  },
  {
    emoji: "💻",
    title: "Multiple Languages",
    description:
      "Learn Python, JavaScript, React, Go, Rust, and many more.",
    bgClass: "bg-indigo/10",
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
          <div className="flex items-center gap-3">
            <Logo />
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">Powered by</span>
              <LinkBridgeLogo size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  🔑 Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">🚀 Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button size="sm">📊 Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-display tracking-wide">
            <span className="text-violet">&#9679;</span> Learn to code the right way
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl leading-[1.1]">
            <span className="font-serif italic font-normal">Love coding</span>{" "}
            <span className="text-gradient-ocean font-display font-bold">again</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl px-4 leading-relaxed font-sans">
            <span className="font-heading font-medium text-foreground">CodeMaster</span> is an interactive learning platform crafted for{" "}
            <span className="text-mint font-medium">speed</span>,{" "}
            <span className="text-amber font-medium">practice</span>, and{" "}
            <span className="text-rose font-medium">real-world skills</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  🚀 Start Learning Free
                  <span className="emoji-icon">→</span>
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  📊 Go to Dashboard
                  <span className="emoji-icon">→</span>
                </Button>
              </Link>
            </SignedIn>
            <Link to="/courses">
              <Button size="lg" variant="outline">
                📚 Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="container py-16 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-display">
            <span className="emoji-icon">🔥</span> <span className="text-gradient-purple">Popular</span> Courses
          </h2>
          <p className="text-muted-foreground font-sans">
            Start your journey with our <span className="text-sky font-medium">most popular</span> programming courses
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
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-mint transition-all duration-300 cursor-pointer w-[200px] shrink-0 bg-card hover:shadow-lg"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-medium font-display">{course.name}</span>
                  <Badge variant="secondary" className="text-xs font-sans">
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
                  className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border hover:border-mint transition-all duration-300 cursor-pointer w-[200px] shrink-0 bg-card hover:shadow-lg"
                >
                  <CourseIcon icon={course.icon} size="lg" />
                  <span className="font-medium font-display">{course.name}</span>
                  <Badge variant="secondary" className="text-xs font-sans">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">
            <span className="emoji-icon">💡</span> Why <span className="font-serif italic text-gradient-coral">CodeMaster</span>?
          </h2>
          <p className="text-muted-foreground font-sans">
            Everything you need to become a <span className="text-teal font-medium">proficient programmer</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 bg-card hover:shadow-lg"
            >
              <div className={`h-12 w-12 rounded-lg ${feature.bgClass} flex items-center justify-center`}>
                <span className="text-2xl emoji-icon">{feature.emoji}</span>
              </div>
              <h3 className="font-semibold text-lg font-display">{feature.title}</h3>
              <p className="text-muted-foreground font-sans text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 py-12 md:py-16">
        <div className="rounded-xl border border-border bg-gradient-to-br from-card via-card to-violet/5 p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">
            <span className="emoji-icon">🎯</span> Ready to <span className="font-serif italic text-gradient-sunset">Start Learning</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-sans">
            Join <span className="text-gold font-semibold">thousands</span> of learners who are building their programming skills
            with <span className="font-heading text-foreground">CodeMaster</span>.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                ✨ Create Free Account
                <span className="emoji-icon">→</span>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                📊 Go to Dashboard
                <span className="emoji-icon">→</span>
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
              <p className="text-muted-foreground max-w-sm font-sans">
                Empowering the <span className="text-lime font-medium">next generation</span> of developers with{" "}
                <span className="text-sky">interactive learning</span>, 
                expert-crafted courses, and real-world projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-display text-coral"><span className="emoji-icon">📬</span> Contact Us</h4>
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
              <h4 className="font-semibold mb-4 font-display text-violet"><span className="emoji-icon">📜</span> Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                <li><a href="#" className="hover:text-mint transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-sans">
              © {new Date().getFullYear()} <span className="font-heading text-foreground">CodeMaster</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <LinkBridgeLogo size="md" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
