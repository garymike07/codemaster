import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, Clock, Zap } from "lucide-react";

interface TestResult {
    passed: boolean;
    expected: string;
    actual: string;
    executionTime?: number;
    memoryUsed?: number;
}

interface EnhancedTestResultProps {
    results: TestResult[];
    testCases: Array<{ input?: string; expectedOutput: string }>;
}

export function EnhancedTestResults({ results, testCases }: EnhancedTestResultProps) {
    const passedCount = results.filter((r) => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;

    return (
        <div className="space-y-4">
            {/* Summary Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {allPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="font-semibold">
                        {passedCount} / {totalCount} Tests Passed
                    </span>
                </div>
                <Badge variant={allPassed ? "default" : "destructive"}>
                    {allPassed ? "All Passed ✓" : `${totalCount - passedCount} Failed`}
                </Badge>
            </div>

            {/* Individual Test Results */}
            <div className="space-y-3">
                {results.map((result, index) => (
                    <Card
                        key={index}
                        className={`${result.passed
                                ? "border-success/30 bg-success/5"
                                : "border-destructive/30 bg-destructive/5"
                            }`}
                    >
                        <CardContent className="pt-4">
                            {/* Test Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {result.passed ? (
                                        <CheckCircle2 className="w-4 h-4 text-success" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-destructive" />
                                    )}
                                    <span className="font-medium">Test Case {index + 1}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    {result.executionTime && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {result.executionTime}ms
                                        </div>
                                    )}
                                    {result.memoryUsed && (
                                        <div className="flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            {result.memoryUsed}KB
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Input (if exists) */}
                            {testCases[index]?.input && (
                                <div className="mb-2">
                                    <p className="text-xs text-muted-foreground mb-1">Input:</p>
                                    <pre className="text-sm bg-muted/50 p-2 rounded font-mono">
                                        {testCases[index].input}
                                    </pre>
                                </div>
                            )}

                            {/* Output Comparison */}
                            {!result.passed && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Expected:
                                        </p>
                                        <pre className="text-sm bg-success/10 p-2 rounded font-mono border border-success/20">
                                            {result.expected}
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Your Output:
                                        </p>
                                        <pre className="text-sm bg-destructive/10 p-2 rounded font-mono border border-destructive/20">
                                            {result.actual}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {result.passed && (
                                <div className="flex items-center gap-2 text-sm text-success">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Output matches expected result</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Overall Feedback */}
            {allPassed && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-success font-medium mb-1">
                        <CheckCircle2 className="w-5 h-5" />
                        Excellent work!
                    </div>
                    <p className="text-sm text-muted-foreground">
                        All test cases passed. You're ready to move on to the next lesson.
                    </p>
                </div>
            )}
        </div>
    );
}
