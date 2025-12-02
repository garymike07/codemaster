import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { LinkBridgeLogo } from "@/components/ui/linkbridge-logo";

import { useTheme } from "@/components/theme-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", emoji: "📊" },
    { href: "/courses", label: "Courses", emoji: "🎓" },
    { href: "/playground", label: "Playground", emoji: "💻" },
    { href: "/exams", label: "Exams", emoji: "📝" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/dashboard" className="mr-4 md:mr-6 flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Powered by</span>
            <LinkBridgeLogo size="sm" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href + item.label} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <span className="emoji-icon">{item.emoji}</span>
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex-1 md:hidden" />
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <span className="emoji-icon text-xl">✕</span> : <span className="emoji-icon text-xl">☰</span>}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <span className="emoji-icon text-lg">☀️</span>
            ) : (
              <span className="emoji-icon text-lg">🌙</span>
            )}
          </Button>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href + item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <span className="emoji-icon">{item.emoji}</span>
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
