import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { executeRemoteCode } from "@/lib/remoteCodeExecution";

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
  const { getToken } = useAuth();
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const executeCode = useCallback(
    async (code: string, language: string, stdin?: string): Promise<ExecutionResult> => {
      setIsExecuting(true);
      setResult(null);

      try {
        const execResult = await executeRemoteCode({ code, language, stdin, getToken });
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
    [getToken]
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
