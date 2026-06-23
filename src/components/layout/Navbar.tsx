import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  ClipboardCheck,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme-context";

const navIconMap: Record<string, React.ElementType> = {
  "/dashboard": LayoutDashboard,
  "/courses": GraduationCap,
  "/playground": Code2,
  "/exams": ClipboardCheck,
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/courses", label: "Courses" },
    { href: "/playground", label: "Practice" },
    { href: "/exams", label: "Quizzes" },
  ];

  const isNavActive = (href: string) => {
    if (href === "/courses") {
      return location.pathname === "/courses" || location.pathname.startsWith("/course/");
    }
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center">
        <Link to="/dashboard" className="mr-4 md:mr-6 flex items-center gap-3" aria-label="CodeMaster home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = isNavActive(item.href);
            const Icon = navIconMap[item.href];
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 min-h-11"
                asChild
              >
                <Link to={item.href}>
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex-1 md:hidden" />
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 min-h-11 min-w-11"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = isNavActive(item.href);
              const Icon = navIconMap[item.href];
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 min-h-11"
                  asChild
                >
                  <Link to={item.href} onClick={() => setMobileMenuOpen(false)}>
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
