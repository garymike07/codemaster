import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Doc, Id } from "../../convex/_generated/dataModel";
import { useTheme } from "@/components/theme-context";
import ChatAssistant from "@/components/ChatAssistant";
import { EnhancedTestResults } from "@/components/EnhancedTestResults";
import { EditorControls } from "@/components/EditorControls";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

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
  const [activeTab, setActiveTab] = useState("output");
  const [mobileView, setMobileView] = useState<"content" | "editor">("content");

  // Editor State
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);

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

  const getLanguageId = (language?: string) => {
    switch (language?.toLowerCase()) {
      case "cpp":
      case "c++":
        return 54; // C++ (GCC 9.2.0)
      case "java":
        return 62; // Java (OpenJDK 13.0.1)
      case "python":
        return 71; // Python (3.8.1)
      case "c":
        return 50; // C (GCC 9.2.0)
      case "c#":
      case "csharp":
        return 51; // C# (Mono 6.6.0.161)
      case "javascript":
      case "js":
      default:
        return 63; // JavaScript (Node.js 12.14.0)
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setTestResults([]);
    setActiveTab("output");

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
            language_id: getLanguageId(lesson?.language),
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
    setActiveTab("tests");

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
              language_id: getLanguageId(lesson?.language),
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
    if (lesson.type === "theory") {
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
      // If it's the last lesson, go back to course page or dashboard
      navigate(`/course/${lesson.courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background px-2 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Link to={`/course/javascript`}>
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
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Panel - Content */}
        <div className={`${mobileView === "content" ? "flex" : "hidden"} md:flex w-full md:w-1/2 border-r border-border overflow-auto p-4 md:p-6 flex-col`}>
          <div className="prose prose-invert max-w-none text-sm md:text-base">
            <div
              dangerouslySetInnerHTML={{
                __html: lesson.content
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/## (.*)/g, '<h2>$1</h2>')
                  .replace(/# (.*)/g, '<h1>$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(.+)$/gm, '<p>$1</p>')
                  .replace(/<p><\/p>/g, '')
                  .replace(/<p><h/g, '<h')
                  .replace(/<\/h(\d)><\/p>/g, '</h$1>')
                  .replace(/<p><pre>/g, '<pre>')
                  .replace(/<\/pre><\/p>/g, '</pre>')
                  .replace(/<p>- /g, '<li>')
                  .replace(/<\/li><\/p>/g, '</li>'),
              }}
            />
          </div>
        </div>

        {/* Right Panel - Editor & Output */}
        <div className={`${mobileView === "editor" ? "flex" : "hidden"} md:flex w-full md:w-1/2 flex-col flex-1`}>
          {/* Code Editor */}
          <div className="flex-1 border-b border-border min-h-[200px] md:min-h-0 flex flex-col">
            <div className="border-b border-border bg-muted/30 p-2">
              <EditorControls
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                theme={theme === "dark" ? "dark" : "light"}
                onThemeChange={() => { }} // Theme is global, maybe we want local override? For now just display current.
                wordWrap={wordWrap}
                onWordWrapToggle={() => setWordWrap(!wordWrap)}
              />
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                language={lesson?.language?.toLowerCase() === "c++" ? "cpp" : lesson?.language?.toLowerCase() || "javascript"}
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

          {/* Output Panel */}
          <div className="h-48 md:h-64 flex flex-col shrink-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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

          {/* Action Buttons */}
          <div className="border-t border-border p-4 flex items-center justify-between">
            {lesson.type !== "theory" && (
              <Button
                variant="outline"
                onClick={runCode}
                disabled={isRunning}
                className="gap-2"
              >
                {isRunning ? (
                  <span className="emoji-icon animate-spin">⏳</span>
                ) : (
                  <span className="emoji-icon">▶️</span>
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
                  {lesson.type === "theory" ? "Mark as Complete" : "Submit & Continue"}
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
