import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Id, Doc } from "../../convex/_generated/dataModel";
import { EnhancedLessonNotes } from "@/components/learning/EnhancedLessonNotes";
import { PersonalNotes } from "@/components/learning/PersonalNotes";
import { LearningObjectives } from "@/components/learning/LearningObjectives";
import { EnhancedExampleLibrary } from "@/components/examples/EnhancedExampleLibrary";
import { EnhancedPlayground } from "@/components/playground/EnhancedPlayground";
import { StreamingChatAssistant } from "@/components/ai/StreamingChatAssistant";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import {
  BookOpen,
  Code2,
  Lightbulb,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  FileText,
} from "lucide-react";
import { isExecutableLanguage } from "@/lib/languageSupport";

export default function ModuleLearningHub() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { executeCode, runTests } = useCodeExecution();

  const [activeTab, setActiveTab] = useState("notes");
  const [playgroundCode, setPlaygroundCode] = useState("");

  // Fetch lesson data
  const lesson = useQuery(
    api.courses.getLesson,
    lessonId ? { lessonId: lessonId as Id<"lessons"> } : "skip"
  );

  // Fetch course lessons for navigation
  const courseLessons = useQuery(
    api.courses.getCourseLessons,
    lesson ? { courseId: lesson.courseId as Id<"courses"> } : "skip"
  ) as Doc<"lessons">[] | undefined;

  // Fetch progress
  const progress = useQuery(
    api.progress.getForCourse,
    lesson ? { courseId: lesson.courseId as Id<"courses"> } : "skip"
  );

  // AI Actions
  const explainCode = useAction(api.ai.explainCode);

  // Get current lesson index and navigation
  const currentIndex = courseLessons?.findIndex((l) => l._id === lessonId) ?? -1;
  const prevLesson = currentIndex > 0 ? courseLessons?.[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < (courseLessons?.length ?? 0) - 1
      ? courseLessons?.[currentIndex + 1]
      : null;

  // Calculate module progress
  const completedLessonIds = new Set(progress?.map((p) => p.lessonId) ?? []);
  const moduleProgress =
    courseLessons && courseLessons.length > 0
      ? Math.round((completedLessonIds.size / courseLessons.length) * 100)
      : 0;

  // Set initial playground code when lesson changes
  const initialCode = lesson?.codeTemplate || lesson?.playground?.starterCode || "";
  useEffect(() => {
    setPlaygroundCode(initialCode);
  }, [initialCode]);

  // Check if this lesson's language supports code execution
  const canExecuteCode = isExecutableLanguage(lesson?.language);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const handleAskAI = async (question: string) => {
    // This will be handled by the ChatAssistant component
    console.log("AI Question:", question);
  };

  const handleExplainCode = async (code: string) => {
    try {
      const result = await explainCode({
        code,
        context: lesson.content,
        simplify: false,
      });
      return result.explanation || "Could not generate explanation";
    } catch (error) {
      console.error("Failed to explain code:", error);
      return "Failed to explain code";
    }
  };

  const handleLoadExample = (code: string) => {
    setPlaygroundCode(code);
    setActiveTab("playground");
  };

  const handleRunCode = async (code: string): Promise<string> => {
    const result = await executeCode(code, lesson?.language || "javascript");
    if (result.error) {
      return `Error: ${result.error}`;
    }
    return result.output || "No output";
  };

  const handleRunTests = async (code: string) => {
    if (!lesson?.playground?.testCases) return [];
    return await runTests(code, lesson?.language || "javascript", lesson.playground.testCases);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back and Title */}
            <div className="flex items-center gap-4">
              <Link to={`/course/${lesson.courseId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-lg">{lesson.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="capitalize">
                    {lesson.type}
                  </Badge>
                  {lesson.estimatedMinutes && (
                    <span>~{lesson.estimatedMinutes} min</span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Course Progress</p>
                <p className="text-xs text-muted-foreground">
                  {completedLessonIds.size}/{courseLessons?.length ?? 0} lessons
                </p>
              </div>
              <Progress value={moduleProgress} className="w-32 h-2" />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!prevLesson}
                onClick={() => prevLesson && navigate(`/module/${prevLesson._id}`)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!nextLesson}
                onClick={() => nextLesson && navigate(`/module/${nextLesson._id}`)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link to={`/lesson/${lesson._id}`}>
                <Button size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Full Player
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="notes" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Notes</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Examples</span>
                  {lesson.examples && (
                    <Badge variant="secondary" className="ml-1 hidden sm:inline">
                      {lesson.examples.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="playground"
                  className="gap-2"
                  disabled={lesson.type === "theory" || !canExecuteCode}
                >
                  <Code2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Playground</span>
                </TabsTrigger>
                <TabsTrigger value="mynotes" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">My Notes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-0">
                <EnhancedLessonNotes
                  content={lesson.content}
                  notes={lesson.notes}
                  keyTakeaways={lesson.keyTakeaways}
                  commonMistakes={lesson.commonMistakes}
                  onAskAI={handleAskAI}
                />
              </TabsContent>

              <TabsContent value="examples" className="mt-0">
                {lesson.examples && lesson.examples.length > 0 ? (
                  <EnhancedExampleLibrary
                    examples={lesson.examples}
                    onLoadExample={handleLoadExample}
                    onAskAI={(question, code) => handleExplainCode(code)}
                    language={lesson.language}
                  />
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No examples available for this lesson yet.
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="playground" className="mt-0">
                {lesson.type !== "theory" && canExecuteCode ? (
                  <Card className="h-[600px] overflow-hidden">
                    <EnhancedPlayground
                      lessonId={lesson._id}
                      config={lesson.playground}
                      codeTemplate={lesson.codeTemplate}
                      language={lesson.language}
                      onRunCode={handleRunCode}
                      onRunTests={handleRunTests}
                      onAskAI={(question, code) => handleExplainCode(code)}
                    />
                  </Card>
                ) : !canExecuteCode ? (
                  <Card className="p-8 text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Notes-Only Mode</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Code execution is not available for {lesson.language || "this language"}. 
                      Focus on the lesson notes and examples to learn the concepts.
                    </p>
                    <Badge variant="secondary" className="mt-4 capitalize">
                      {lesson.language || "Unknown"} - Read & Learn
                    </Badge>
                  </Card>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      This is a theory lesson. No playground available.
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="mynotes" className="mt-0">
                <PersonalNotes lessonId={lesson._id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Learning Objectives */}
            {lesson.notes?.learningObjectives && (
              <LearningObjectives
                objectives={lesson.notes.learningObjectives}
                showProgress
              />
            )}

            {/* Lesson Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Lessons in Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {courseLessons?.map((l, idx) => {
                    const isCompleted = completedLessonIds.has(l._id);
                    const isCurrent = l._id === lessonId;

                    return (
                      <Link
                        key={l._id}
                        to={`/module/${l._id}`}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          isCurrent
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span
                          className={`text-sm truncate ${
                            isCurrent ? "font-medium" : ""
                          } ${isCompleted ? "text-muted-foreground" : ""}`}
                        >
                          {idx + 1}. {l.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggested Questions */}
            {lesson.aiConfig?.suggestedQuestions &&
              lesson.aiConfig.suggestedQuestions.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="emoji-icon">🤖</span>
                      Suggested Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lesson.aiConfig.suggestedQuestions.map((question, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 px-3"
                          onClick={() => handleAskAI(question)}
                        >
                          <span className="text-sm">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>

      {/* AI Assistant with Streaming */}
      <StreamingChatAssistant
        lessonId={lesson._id}
        context={lesson.content}
        code={playgroundCode}
        lessonType={lesson.type}
        suggestedQuestions={lesson.aiConfig?.suggestedQuestions}
      />
    </div>
  );
}
