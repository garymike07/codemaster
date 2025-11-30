import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { LinkBridgeLogo } from "@/components/ui/linkbridge-logo";
import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  Moon,
  Sun,
  ChevronDown,
  Users,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const currentUser = useQuery(api.users.current);
  const switchRole = useMutation(api.users.switchRole);

  const studentNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: BookOpen },
    { href: "/courses", label: "Courses", icon: GraduationCap },
    { href: "/exams", label: "Exams", icon: ClipboardList },
  ];

  const teacherNavItems = [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "Courses", icon: GraduationCap },
    { href: "/teacher", label: "Students", icon: Users },
  ];

  const navItems = currentUser?.role === "teacher" ? teacherNavItems : studentNavItems;

  const handleSwitchRole = async () => {
    await switchRole();
  };

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
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href + item.label} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
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
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="flex items-center gap-2">
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 md:gap-2 px-2 md:px-3">
                  <Badge
                    variant={
                      currentUser.role === "teacher" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {currentUser.role === "teacher" ? "T" : "S"}
                    <span className="hidden sm:inline ml-1">
                      {currentUser.role === "teacher" ? "eacher" : "tudent"}
                    </span>
                  </Badge>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Current Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSwitchRole}>
                  Switch to{" "}
                  {currentUser.role === "teacher" ? "Student" : "Teacher"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
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
              const Icon = item.icon;
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
                    <Icon className="h-4 w-4" />
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
