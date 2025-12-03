import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Lightbulb, AlertTriangle } from "lucide-react";

interface LessonNotesProps {
    content: string;
    keyTakeaways?: string[];
    commonMistakes?: Array<{
        mistake: string;
        explanation: string;
        howToAvoid: string;
    }>;
    onAskAI?: (question: string) => void;
}

export function LessonNotes({
    content,
    keyTakeaways,
    commonMistakes,
    onAskAI
}: LessonNotesProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["main"]));

    const toggleSection = (section: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(section)) {
            newExpanded.delete(section);
        } else {
            newExpanded.add(section);
        }
        setExpandedSections(newExpanded);
    };

    const renderMarkdown = (text: string) => {
        return text
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
            .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
            .replace(/## (.*)/g, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
            .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p class="my-4">')
            .replace(/^(.+)$/gm, '<p class="my-2">$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h(\d)><\/p>/g, '</h$1>')
            .replace(/<p><pre>/g, '<pre>')
            .replace(/<\/pre><\/p>/g, '</pre>')
            .replace(/<p>- /g, '<li>')
            .replace(/<\/li><\/p>/g, '</li>');
    };

    return (
        <div className="space-y-6">
            {/* Main Content */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => toggleSection("main")}
                        className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
                    >
                        {expandedSections.has("main") ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                        Lesson Content
                    </button>
                    {onAskAI && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAskAI("Explain this lesson in simple terms")}
                            className="gap-2"
                        >
                            <span className="emoji-icon">🤖</span>
                            Ask AI
                        </Button>
                    )}
                </div>

                {expandedSections.has("main") && (
                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                    />
                )}
            </Card>

            {/* Key Takeaways */}
            {keyTakeaways && keyTakeaways.length > 0 && (
                <Card className="p-6 bg-primary/5 border-primary/20">
                    <button
                        onClick={() => toggleSection("takeaways")}
                        className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-primary transition-colors w-full"
                    >
                        {expandedSections.has("takeaways") ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Key Takeaways
                    </button>

                    {expandedSections.has("takeaways") && (
                        <ul className="space-y-2 ml-7">
                            {keyTakeaways.map((takeaway, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            )}

            {/* Common Mistakes */}
            {commonMistakes && commonMistakes.length > 0 && (
                <Card className="p-6 bg-warning/5 border-warning/20">
                    <button
                        onClick={() => toggleSection("mistakes")}
                        className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-warning transition-colors w-full"
                    >
                        {expandedSections.has("mistakes") ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        Common Mistakes to Avoid
                    </button>

                    {expandedSections.has("mistakes") && (
                        <div className="space-y-4 ml-7">
                            {commonMistakes.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Badge variant="destructive" className="mt-1">
                                            {index + 1}
                                        </Badge>
                                        <div className="flex-1">
                                            <p className="font-semibold text-warning">{item.mistake}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {item.explanation}
                                            </p>
                                            <p className="text-sm mt-2 bg-success/10 border border-success/20 rounded p-2">
                                                <strong className="text-success">How to avoid:</strong> {item.howToAvoid}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
