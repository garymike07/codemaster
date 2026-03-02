import { useState, useCallback } from "react";

interface ExecutionResult {
  output: string;
  error: string;
  status: string;
  time?: number;
  memory?: number;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  description?: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
  isHidden?: boolean;
}

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const executeCode = useCallback(
    async (code: string, language: string, stdin?: string): Promise<ExecutionResult> => {
      setIsExecuting(true);
      setResult(null);

      // Fix #4: Use Judge0 API directly (consistent with Playground.tsx and LessonPlayer.tsx)
      const judge0Url = import.meta.env.VITE_JUDGE0_API_URL;
      const judge0Key = import.meta.env.VITE_JUDGE0_API_KEY;

      if (!judge0Url || !judge0Key) {
        const errorResult: ExecutionResult = {
          output: "",
          error: "Code execution is not configured. Please contact support.",
          status: "Error",
        };
        setResult(errorResult);
        setIsExecuting(false);
        return errorResult;
      }

      const languageMap: Record<string, number> = {
        javascript: 63,
        python: 71,
        typescript: 74,
        java: 62,
        cpp: 54,
        csharp: 51,
        c: 50,
        ruby: 72,
        go: 60,
        rust: 73,
        kotlin: 78,
        swift: 83,
      };
      const languageId = languageMap[language?.toLowerCase()] ?? 63;

      try {
        const response = await fetch(
          `${judge0Url}/submissions?base64_encoded=true&wait=true`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": judge0Key,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
              source_code: btoa(code),
              language_id: languageId,
              stdin: stdin ? btoa(stdin) : undefined,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const output = data.stdout ? atob(data.stdout) : "";
        const error = data.stderr
          ? atob(data.stderr)
          : data.compile_output
          ? atob(data.compile_output)
          : "";
        const status = data.status?.description ?? "Unknown";

        const execResult: ExecutionResult = { output, error, status };
        setResult(execResult);
        return execResult;
      } catch (error) {
        const errorResult: ExecutionResult = {
          output: "",
          error: error instanceof Error ? error.message : "Execution failed",
          status: "Error",
        };
        setResult(errorResult);
        return errorResult;
      } finally {
        setIsExecuting(false);
      }
    },
    []
  );

  const runTests = useCallback(
    async (
      code: string,
      language: string,
      testCases: TestCase[]
    ): Promise<TestResult[]> => {
      setIsExecuting(true);
      const results: TestResult[] = [];

      try {
        for (const testCase of testCases) {
          const execResult = await executeCode(code, language, testCase.input);

          const actual = execResult.output.trim();
          const expected = testCase.expectedOutput.trim();
          const passed = actual === expected;

          results.push({
            passed,
            input: testCase.input,
            expected,
            actual: execResult.error || actual || "No output",
            description: testCase.description,
          });
        }
      } catch (error) {
        console.error("Test execution error:", error);
      } finally {
        setIsExecuting(false);
      }

      return results;
    },
    [executeCode]
  );

  return {
    executeCode,
    runTests,
    isExecuting,
    result,
  };
}
