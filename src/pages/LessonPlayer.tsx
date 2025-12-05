import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { LazyMonacoEditor } from "@/components/LazyMonacoEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Doc, Id } from "../../convex/_generated/dataModel";
import { useTheme } from "@/components/theme-context";
import ChatAssistant from "@/components/ChatAssistant";
import { EnhancedTestResults } from "@/components/EnhancedTestResults";
import { EditorControls } from "@/components/EditorControls";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { LessonNotes } from "@/components/LessonNotes";
import { ExampleCarousel } from "@/components/ExampleCarousel";
import { AICodeExplainer } from "@/components/AICodeExplainer";
import { KeyTakeawaysPanel } from "@/components/KeyTakeawaysPanel";
import { BookOpen, Code2, Lightbulb, Play, FileText } from "lucide-react";
import { isExecutableLanguage, getJudge0LanguageId, getMonacoLanguage } from "@/lib/languageSupport";

interface TestResult {
  passed: boolean;
  expected: string;
  actual: string;
}

export default function LessonPlayer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const lesson = useQuery(
    api.courses.getLesson,
    lessonId ? { lessonId: lessonId as Id<"lessons"> } : "skip"
  );

  const courseLessons = useQuery(
    api.courses.getCourseLessons,
    lesson ? { courseId: lesson.courseId as Id<"courses"> } : "skip"
  ) as Doc<"lessons">[] | undefined;

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeMainTab, setActiveMainTab] = useState("notes");
  const [activeEditorTab, setActiveEditorTab] = useState("output");
  const [mobileView, setMobileView] = useState<"content" | "editor">("content");
  const [selectedCode] = useState("");

  // Editor State
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);

  // AI Actions
  const explainCodeAction = useAction(api.ai.explainCode);
  const quizStudentAction = useAction(api.ai.quizStudent);

  useKeyboardShortcut({
    key: "Enter",
    ctrlKey: true,
    callback: () => runCode(),
  });

  const markComplete = useMutation(api.progress.markLessonComplete);

  useEffect(() => {
    if (lesson?.codeTemplate) {
      setCode(lesson.codeTemplate);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Check if this lesson's language supports code execution
  const canExecuteCode = isExecutableLanguage(lesson?.language);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setTestResults([]);
    setActiveEditorTab("output");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: btoa(code),
            language_id: getJudge0LanguageId(lesson?.language),
          }),
        }
      );

      const data = await response.json();

      if (data.stdout) {
        setOutput(atob(data.stdout));
      } else if (data.stderr) {
        setOutput(`Error: ${atob(data.stderr)}`);
      } else if (data.compile_output) {
        setOutput(`Compile Error: ${atob(data.compile_output)}`);
      } else {
        setOutput(data.status?.description || "No output");
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runTests = async () => {
    if (!lesson.testCases || lesson.testCases.length === 0) {
      await runCode();
      return;
    }

    setIsRunning(true);
    setTestResults([]);
    setActiveEditorTab("tests");

    const results: TestResult[] = [];

    for (const testCase of lesson.testCases) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
              source_code: btoa(code),
              language_id: getJudge0LanguageId(lesson?.language),
              stdin: testCase.input ? btoa(testCase.input) : undefined,
            }),
          }
        );

        const data = await response.json();
        const actual = data.stdout ? atob(data.stdout).trim() : "";
        const passed = actual === testCase.expectedOutput.trim();

        results.push({
          passed,
          expected: testCase.expectedOutput,
          actual: actual || (data.stderr ? atob(data.stderr) : "No output"),
        });
      } catch (error) {
        results.push({
          passed: false,
          expected: testCase.expectedOutput,
          actual: `Error: ${error instanceof Error ? error.message : "Unknown"}`,
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    // For theory lessons or non-executable languages, just mark complete
    if (lesson.type === "theory" || !canExecuteCode) {
      await markComplete({ lessonId: lesson._id });
      navigateToNextLesson();
      return;
    }

    await runTests();

    const allPassed = testResults.length === 0 || testResults.every((r) => r.passed);

    if (allPassed) {
      await markComplete({ lessonId: lesson._id });
      navigateToNextLesson();
    }
  };

  const navigateToNextLesson = () => {
    if (!courseLessons || !lesson) return;

    const currentIndex = courseLessons.findIndex((l) => l._id === lesson._id);
    if (currentIndex !== -1 && currentIndex < courseLessons.length - 1) {
      const nextLesson = courseLessons[currentIndex + 1];
      navigate(`/lesson/${nextLesson._id}`);
    } else {
      navigate(`/course/${lesson.courseId}`);
    }
  };

  const handleExplainCode = async (codeToExplain: string, context: string) => {
    const result = await explainCodeAction({
      code: codeToExplain,
      context: context || lesson.content,
      simplify: false,
    });
    return result.success ? result.explanation || "" : "Failed to explain code";
  };

  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setActiveMainTab("practice");
  };

  const handleQuizMe = async () => {
    const result = await quizStudentAction({
      topic: lesson.title,
      context: lesson.content,
      questionCount: 3,
    });

    if (result.success && result.questions) {
      // For now, just log the questions. In a full implementation,
      // you'd show them in a modal or separate component
      console.log("Quiz questions:", result.questions);
      alert(`Generated ${result.questions.length} quiz questions! Check console for details.`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background px-2 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Link to={`/course/${lesson.courseId}`}>
            <Button variant="ghost" size="sm" className="gap-1 md:gap-2 px-2 md:px-3">
              <span className="emoji-icon">←</span>
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="font-semibold text-sm md:text-base truncate">{lesson.title}</h1>
            <Badge variant="secondary" className="text-xs capitalize">
              {lesson.type}
            </Badge>
          </div>
        </div>
        {/* Mobile view toggle */}
        <div className="md:hidden flex gap-1">
          <Button
            variant={mobileView === "content" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("content")}
          >
            <span className="emoji-icon">📖</span>
          </Button>
          <Button
            variant={mobileView === "editor" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("editor")}
          >
            <span className="emoji-icon">💻</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Content Tabs */}
        <div className={`${mobileView === "content" ? "flex" : "hidden"} md:flex w-full md:w-1/2 border-r border-border flex-col`}>
          <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="flex-1 flex flex-col">
            <div className="border-b border-border px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger value="notes" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Notes</span>
                </TabsTrigger>
                {lesson.examples && lesson.examples.length > 0 && (
                  <TabsTrigger value="examples" className="gap-2">
                    <Lightbulb className="w-4 h-4" />
                    <span className="hidden sm:inline">Examples</span>
                    <Badge variant="secondary" className="ml-1">{lesson.examples.length}</Badge>
                  </TabsTrigger>
                )}
                {lesson.type !== "theory" && canExecuteCode && (
                  <TabsTrigger value="practice" className="gap-2">
                    <Code2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Practice</span>
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="notes" className="flex-1 overflow-auto p-4 m-0">
              <div className="space-y-6">
                <LessonNotes
                  content={lesson.content}
                  keyTakeaways={lesson.keyTakeaways}
                  commonMistakes={lesson.commonMistakes}
                />
                {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                  <KeyTakeawaysPanel
                    takeaways={lesson.keyTakeaways}
                    onQuizMe={handleQuizMe}
                  />
                )}
              </div>
            </TabsContent>

            {lesson.examples && lesson.examples.length > 0 && (
              <TabsContent value="examples" className="flex-1 overflow-auto p-4 m-0">
                <ExampleCarousel
                  examples={lesson.examples}
                  onLoadExample={handleLoadExample}
                  onAskAI={handleExplainCode}
                />
              </TabsContent>
            )}

            {lesson.type !== "theory" && canExecuteCode && (
              <TabsContent value="practice" className="flex-1 overflow-auto p-4 m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Practice Challenge</h3>
                  <p className="text-muted-foreground">
                    Use the code editor on the right to complete this challenge.
                    Run your code to test it, then submit when ready.
                  </p>
                  {selectedCode && (
                    <AICodeExplainer
                      selectedCode={selectedCode}
                      lessonContext={lesson.content}
                      onExplain={handleExplainCode}
                    />
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Right Panel - Editor & Output (or Notes-only for non-executable languages) */}
        <div className={`${mobileView === "editor" ? "flex" : "hidden"} md:flex w-full md:w-1/2 flex-col flex-1`}>
          {/* Notes-only mode for non-executable languages */}
          {!canExecuteCode && lesson.type !== "theory" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notes-Only Mode</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Code execution is not available for {lesson.language || "this language"}. 
                Focus on the lesson notes and examples to learn the concepts.
              </p>
              <Badge variant="secondary" className="capitalize">
                {lesson.language || "Unknown"} - Read & Learn
              </Badge>
            </div>
          )}

          {/* Code Editor - only for executable languages */}
          {lesson.type !== "theory" && canExecuteCode && (
            <div className="flex-1 border-b border-border min-h-[200px] md:min-h-0 flex flex-col">
              <div className="border-b border-border bg-muted/30 p-2">
                <EditorControls
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  theme={theme === "dark" ? "dark" : "light"}
                  onThemeChange={() => { }}
                  wordWrap={wordWrap}
                  onWordWrapToggle={() => setWordWrap(!wordWrap)}
                />
              </div>
              <div className="flex-1">
                <LazyMonacoEditor
                  height="100%"
                  language={getMonacoLanguage(lesson?.language)}
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: fontSize,
                    fontFamily: "'JetBrains Mono', monospace",
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    wordWrap: wordWrap ? "on" : "off",
                  }}
                />
              </div>
            </div>
          )}

          {/* Output Panel - only for executable languages */}
          {lesson.type !== "theory" && canExecuteCode && (
            <div className="h-48 md:h-64 flex flex-col shrink-0">
              <Tabs value={activeEditorTab} onValueChange={setActiveEditorTab}>
                <div className="border-b border-border px-4">
                  <TabsList className="bg-transparent">
                    <TabsTrigger value="output">Output</TabsTrigger>
                    {lesson.testCases && lesson.testCases.length > 0 && (
                      <TabsTrigger value="tests">
                        Tests
                        {testResults.length > 0 && (
                          <Badge
                            variant={
                              testResults.every((r) => r.passed)
                                ? "success"
                                : "destructive"
                            }
                            className="ml-2"
                          >
                            {testResults.filter((r) => r.passed).length}/
                            {testResults.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>

                <TabsContent value="output" className="flex-1 p-4 m-0">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {output || "Run your code to see output"}
                  </pre>
                </TabsContent>

                <TabsContent value="tests" className="flex-1 p-4 m-0 overflow-auto">
                  {testResults.length > 0 ? (
                    <EnhancedTestResults
                      results={testResults}
                      testCases={lesson.testCases || []}
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      Run tests to see results
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-border p-4 flex items-center justify-between">
            {lesson.type !== "theory" && canExecuteCode && (
              <Button
                variant="outline"
                onClick={runCode}
                disabled={isRunning}
                className="gap-2"
              >
                {isRunning ? (
                  <span className="emoji-icon animate-spin">⏳</span>
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run Code
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={isRunning}
              className="gap-2 ml-auto"
            >
              {isRunning ? (
                <span className="emoji-icon animate-spin">⏳</span>
              ) : (
                <>
                  {lesson.type === "theory" || !canExecuteCode ? "Mark as Complete" : "Submit & Continue"}
                  <span className="emoji-icon">→</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <ChatAssistant context={lesson.content} code={code} lessonType={lesson.type} />
    </div>
  );
}
