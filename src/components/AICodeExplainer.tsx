import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

interface AICodeExplainerProps {
    selectedCode?: string;
    lessonContext?: string;
    onExplain?: (code: string, context: string) => Promise<string>;
}

export function AICodeExplainer({
    selectedCode,
    lessonContext,
    onExplain
}: AICodeExplainerProps) {
    const [isExplaining, setIsExplaining] = useState(false);
    const [explanation, setExplanation] = useState<string>("");
    const [showExplanation, setShowExplanation] = useState(false);

    const handleExplain = async () => {
        if (!selectedCode || !onExplain) return;

        setIsExplaining(true);
        setShowExplanation(true);

        try {
            const result = await onExplain(selectedCode, lessonContext || "");
            setExplanation(result);
        } catch (error) {
            setExplanation("Sorry, I couldn't explain this code. Please try again.");
        } finally {
            setIsExplaining(false);
        }
    };

    const handleSimplify = async () => {
        if (!selectedCode || !onExplain) return;

        setIsExplaining(true);

        try {
            const result = await onExplain(
                selectedCode,
                `${lessonContext}\n\nPlease explain this in very simple terms, as if explaining to a beginner.`
            );
            setExplanation(result);
        } catch (error) {
            setExplanation("Sorry, I couldn't simplify this explanation. Please try again.");
        } finally {
            setIsExplaining(false);
        }
    };

    const handleMoreDetails = async () => {
        if (!selectedCode || !onExplain) return;

        setIsExplaining(true);

        try {
            const result = await onExplain(
                selectedCode,
                `${lessonContext}\n\nPlease provide a detailed, in-depth explanation with examples.`
            );
            setExplanation(result);
        } catch (error) {
            setExplanation("Sorry, I couldn't provide more details. Please try again.");
        } finally {
            setIsExplaining(false);
        }
    };

    if (!selectedCode) {
        return (
            <Card className="p-6 bg-muted/30 border-dashed">
                <div className="text-center text-muted-foreground">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select code in the editor to get AI explanations</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="space-y-4">
                {/* Selected Code Preview */}
                <div>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Selected Code
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto max-h-32">
                        <code>{selectedCode}</code>
                    </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        size="sm"
                        onClick={handleExplain}
                        disabled={isExplaining}
                        className="gap-2"
                    >
                        {isExplaining ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        Explain This
                    </Button>

                    {showExplanation && (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleSimplify}
                                disabled={isExplaining}
                            >
                                Simplify
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleMoreDetails}
                                disabled={isExplaining}
                            >
                                More Details
                            </Button>
                        </>
                    )}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className="border-t border-border pt-4">
                        {isExplaining ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">AI is thinking...</span>
                            </div>
                        ) : (
                            <div className="prose prose-sm prose-invert max-w-none">
                                <p className="whitespace-pre-wrap">{explanation}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}
