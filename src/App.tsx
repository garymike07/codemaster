import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Lazy load pages for better initial load performance
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LessonPlayer = lazy(() => import("./pages/LessonPlayer"));
const ModuleLearningHub = lazy(() => import("./pages/ModuleLearningHub"));
const Exams = lazy(() => import("./pages/Exams"));
const ExamRunner = lazy(() => import("./pages/ExamRunner"));
const ExamCentre = lazy(() => import("./pages/ExamCentre"));
const ExamWorkspace = lazy(() => import("./pages/ExamWorkspace"));
const Playground = lazy(() => import("./pages/Playground"));

// Loading spinner for lazy loaded components
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Courses />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:slug"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CourseDetail />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <LessonPlayer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/module/:lessonId"
        element={
          <ProtectedRoute>
            <ModuleLearningHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exams"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Exams />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam/:examId"
        element={
          <ProtectedRoute>
            <ExamRunner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam-centre"
        element={
          <ProtectedRoute>
            <ExamCentre />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam-workspace/:examId"
        element={
          <ProtectedRoute>
            <ExamWorkspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playground"
        element={
          <ProtectedRoute>
            <Playground />
          </ProtectedRoute>
        }
      />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
