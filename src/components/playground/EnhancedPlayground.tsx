import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LazyMonacoEditor } from "@/components/LazyMonacoEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-context";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  Play,
  RotateCcw,
  Save,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Terminal,
  FileCode,
} from "lucide-react";

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  description?: string;
}

interface PlaygroundConfig {
  enabled: boolean;
  starterCode?: string;
  language?: string;
  testCases?: TestCase[];
  hints?: string[];
  solution?: string;
}

interface EnhancedPlaygroundProps {
  lessonId: Id<"lessons">;
  config?: PlaygroundConfig;
  codeTemplate?: string;
  language?: string;
  onRunCode?: (code: string) => Promise<string>;
  onRunTests?: (code: string) => Promise<TestResult[]>;
  onAskAI?: (question: string, code: string) => void;
}

export function EnhancedPlayground({
  lessonId,
  config,
  codeTemplate,
  language = "javascript",
  onRunCode,
  onRunTests,
  onAskAI,
}: EnhancedPlaygroundProps) {
  const { theme } = useTheme();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("output");
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Editor settings
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);

  // Convex queries and mutations
  const savedSession = useQuery(api.playgrounds.getSession, { lessonId });
  const saveSession = useMutation(api.playgrounds.saveSession);
  const resetSession = useMutation(api.playgrounds.resetSession);

  // Load saved code or starter code
  useEffect(() => {
    if (savedSession?.code) {
      setCode(savedSession.code);
      if (savedSession.lastRunOutput) {
        setOutput(savedSession.lastRunOutput);
      }
      if (savedSession.testResults) {
        setTestResults(savedSession.testResults);
      }
    } else {
      const starterCode = config?.starterCode || codeTemplate || "";
      setCode(starterCode);
    }
    setHasUnsavedChanges(false);
  }, [savedSession, config?.starterCode, codeTemplate]);

  // Auto-save
  const debouncedSave = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    try {
      await saveSession({
        lessonId,
        code,
        lastRunOutput: output || undefined,
        testResults: testResults.length > 0 ? testResults : undefined,
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save session:", error);
    } finally {
      setIsSaving(false);
    }
  }, [lessonId, code, output, testResults, hasUnsavedChanges, saveSession]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timer = setTimeout(() => {
      debouncedSave();
    }, 3000);

    return () => clearTimeout(timer);
  }, [code, hasUnsavedChanges, debouncedSave]);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value ?? "");
    setHasUnsavedChanges(true);
  };

  const handleRun = async () => {
    if (!onRunCode) return;

    setIsRunning(true);
    setActiveTab("output");
    setOutput("");

    try {
      const result = await onRunCode(code);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
      setHasUnsavedChanges(true);
    }
  };

  const handleRunTests = async () => {
    if (!onRunTests) return;

    setIsRunning(true);
    setActiveTab("tests");
    setTestResults([]);

    try {
      const results = await onRunTests(code);
      setTestResults(results);
    } catch (error) {
      console.error("Test execution error:", error);
    } finally {
      setIsRunning(false);
      setHasUnsavedChanges(true);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset code to starter template? Your changes will be lost.")) {
      return;
    }

    try {
      await resetSession({ lessonId });
      const starterCode = config?.starterCode || codeTemplate || "";
      setCode(starterCode);
      setOutput("");
      setTestResults([]);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to reset session:", error);
    }
  };

  const handleRevealHint = () => {
    if (config?.hints && revealedHints < config.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  const handleShowSolution = () => {
    if (!confirm("Are you sure you want to see the solution?")) {
      return;
    }
    setShowSolution(true);
  };

  const handleLoadSolution = () => {
    if (config?.solution) {
      setCode(config.solution);
      setHasUnsavedChanges(true);
    }
  };

  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = testResults.length;
  const effectiveLanguage = config?.language || language;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning || !onRunCode}
            className="gap-1"
          >
            {isRunning ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Play className="w-3 h-3" />
            )}
            Run
          </Button>

          {config?.testCases && config.testCases.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleRunTests}
              disabled={isRunning || !onRunTests}
              className="gap-1"
            >
              <FileCode className="w-3 h-3" />
              Run Tests
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-xs">
              Unsaved
            </Badge>
          )}
          {isSaving && (
            <span className="text-xs text-muted-foreground">Saving...</span>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFontSize((prev) => Math.max(10, prev - 2))}
          >
            A-
          </Button>
          <span className="text-xs text-muted-foreground">{fontSize}px</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFontSize((prev) => Math.min(24, prev + 2))}
          >
            A+
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[200px]">
        <LazyMonacoEditor
          height="100%"
          language={effectiveLanguage === "c++" ? "cpp" : effectiveLanguage}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            wordWrap: wordWrap ? "on" : "off",
          }}
        />
      </div>

      {/* Output Panel */}
      <div className="h-48 border-t border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-border px-4 bg-muted/30">
            <TabsList className="bg-transparent">
              <TabsTrigger value="output" className="gap-1">
                <Terminal className="w-3 h-3" />
                Output
              </TabsTrigger>
              {config?.testCases && config.testCases.length > 0 && (
                <TabsTrigger value="tests" className="gap-1">
                  <FileCode className="w-3 h-3" />
                  Tests
                  {testResults.length > 0 && (
                    <Badge
                      variant={
                        passedTests === totalTests ? "success" : "destructive"
                      }
                      className="ml-1"
                    >
                      {passedTests}/{totalTests}
                    </Badge>
                  )}
                </TabsTrigger>
              )}
              {config?.hints && config.hints.length > 0 && (
                <TabsTrigger value="hints" className="gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Hints
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="output" className="p-4 h-32 overflow-auto m-0">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {output || "Run your code to see output"}
            </pre>
          </TabsContent>

          <TabsContent value="tests" className="p-4 h-32 overflow-auto m-0">
            {testResults.length > 0 ? (
              <div className="space-y-2">
                {testResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-sm ${
                      result.passed
                        ? "bg-success/10 border border-success/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="font-medium">
                        Test {idx + 1}: {result.passed ? "Passed" : "Failed"}
                      </span>
                    </div>
                    {!result.passed && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        <p>Expected: {result.expected}</p>
                        <p>Got: {result.actual}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Run tests to see results
              </p>
            )}
          </TabsContent>

          <TabsContent value="hints" className="p-4 h-32 overflow-auto m-0">
            <div className="space-y-3">
              {config?.hints?.slice(0, revealedHints).map((hint, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-primary/5 border border-primary/20 rounded-lg text-sm"
                >
                  <span className="font-medium text-primary">
                    Hint {idx + 1}:
                  </span>{" "}
                  {hint}
                </div>
              ))}

              {config?.hints && revealedHints < config.hints.length && (
                <Button size="sm" variant="outline" onClick={handleRevealHint}>
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Reveal Hint ({revealedHints + 1}/{config.hints.length})
                </Button>
              )}

              {config?.solution && (
                <div className="pt-2 border-t">
                  {showSolution ? (
                    <div className="space-y-2">
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        <code>{config.solution}</code>
                      </pre>
                      <Button size="sm" onClick={handleLoadSolution}>
                        Load Solution into Editor
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleShowSolution}
                    >
                      Show Solution
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Help */}
      {onAskAI && (
        <div className="p-2 border-t border-border bg-muted/30">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAskAI("Help me debug this code", code)}
            className="gap-1"
          >
            <span className="emoji-icon">🤖</span>
            Ask AI for Help
          </Button>
        </div>
      )}
    </div>
  );
}
