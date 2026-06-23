import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeMaster — JavaScript, Python & AI
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
            <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </Link>
            <Link to="/exams" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Quizzes
            </Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
