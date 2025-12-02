import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Exams from "./pages/Exams";
import ExamRunner from "./pages/ExamRunner";
import ExamCentre from "./pages/ExamCentre";
import ExamWorkspace from "./pages/ExamWorkspace";
import Playground from "./pages/Playground";
import { DashboardLayout } from "./components/layout/DashboardLayout";

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
  );
}

export default App;
