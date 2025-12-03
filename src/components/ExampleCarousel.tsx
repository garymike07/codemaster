import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Code, Play } from "lucide-react";

interface Example {
    title: string;
    description: string;
    code: string;
    explanation: string;
    output?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
}

interface ExampleCarouselProps {
    examples: Example[];
    onLoadExample?: (code: string) => void;
    onAskAI?: (question: string, code: string) => void;
}

export function ExampleCarousel({
    examples,
    onLoadExample,
    onAskAI
}: ExampleCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!examples || examples.length === 0) {
        return (
            <Card className="p-8 text-center">
                <p className="text-muted-foreground">No examples available for this lesson.</p>
            </Card>
        );
    }

    const currentExample = examples[currentIndex];

    const nextExample = () => {
        setCurrentIndex((prev) => (prev + 1) % examples.length);
    };

    const prevExample = () => {
        setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
    };

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case "beginner":
                return "bg-success/10 text-success border-success/20";
            case "intermediate":
                return "bg-warning/10 text-warning border-warning/20";
            case "advanced":
                return "bg-destructive/10 text-destructive border-destructive/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                        Example {currentIndex + 1} of {examples.length}
                    </h3>
                    {currentExample.difficulty && (
                        <Badge className={getDifficultyColor(currentExample.difficulty)}>
                            {currentExample.difficulty}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevExample}
                        disabled={examples.length <= 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                        {currentIndex + 1} / {examples.length}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextExample}
                        disabled={examples.length <= 1}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Example Content */}
            <Card className="p-6">
                <div className="space-y-4">
                    {/* Title and Description */}
                    <div>
                        <h4 className="text-xl font-semibold mb-2">{currentExample.title}</h4>
                        <p className="text-muted-foreground">{currentExample.description}</p>
                    </div>

                    {/* Tabs for Code and Explanation */}
                    <Tabs defaultValue="code" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="code">
                                <Code className="w-4 h-4 mr-2" />
                                Code
                            </TabsTrigger>
                            <TabsTrigger value="explanation">
                                <span className="emoji-icon mr-2">💡</span>
                                Explanation
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="code" className="space-y-4">
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                <code className="text-sm font-mono">{currentExample.code}</code>
                            </pre>

                            {currentExample.output && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Expected Output:</p>
                                    <pre className="bg-success/10 border border-success/20 p-3 rounded-lg">
                                        <code className="text-sm font-mono">{currentExample.output}</code>
                                    </pre>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {onLoadExample && (
                                    <Button
                                        onClick={() => onLoadExample(currentExample.code)}
                                        className="gap-2"
                                    >
                                        <Play className="w-4 h-4" />
                                        Try This Example
                                    </Button>
                                )}
                                {onAskAI && (
                                    <Button
                                        variant="outline"
                                        onClick={() => onAskAI("Explain this code in detail", currentExample.code)}
                                        className="gap-2"
                                    >
                                        <span className="emoji-icon">🤖</span>
                                        AI Explain
                                    </Button>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="explanation">
                            <div className="prose prose-invert max-w-none">
                                <p className="whitespace-pre-wrap">{currentExample.explanation}</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>

            {/* Quick Navigation Dots */}
            {examples.length > 1 && (
                <div className="flex justify-center gap-2">
                    {examples.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? "bg-primary w-8"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                }`}
                            aria-label={`Go to example ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
