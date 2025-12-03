import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Play,
  Lightbulb,
  Filter,
  Copy,
  Check,
} from "lucide-react";

interface ExampleVariation {
  name: string;
  code: string;
  description: string;
}

interface Example {
  id?: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  output?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  concepts?: string[];
  variations?: ExampleVariation[];
}

interface EnhancedExampleLibraryProps {
  examples: Example[];
  onLoadExample?: (code: string) => void;
  onAskAI?: (question: string, code: string) => void;
  language?: string;
}

const difficultyColors = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-warning/10 text-warning border-warning/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export function EnhancedExampleLibrary({
  examples,
  onLoadExample,
  onAskAI,
  language = "javascript",
}: EnhancedExampleLibraryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [conceptFilter, setConceptFilter] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Get all unique concepts
  const allConcepts = useMemo(() => {
    const concepts = new Set<string>();
    examples.forEach((ex) => {
      ex.concepts?.forEach((c) => concepts.add(c));
    });
    return Array.from(concepts);
  }, [examples]);

  // Filter examples by concept
  const filteredExamples = useMemo(() => {
    if (!conceptFilter) return examples;
    return examples.filter((ex) => ex.concepts?.includes(conceptFilter));
  }, [examples, conceptFilter]);

  if (!examples || examples.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No examples available for this lesson.
        </p>
      </Card>
    );
  }

  const currentExample = filteredExamples[currentIndex] || filteredExamples[0];
  const displayCode = selectedVariation !== null && currentExample.variations
    ? currentExample.variations[selectedVariation].code
    : currentExample.code;

  const nextExample = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredExamples.length);
    setSelectedVariation(null);
  };

  const prevExample = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length
    );
    setSelectedVariation(null);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Concept Filter */}
      {allConcepts.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Button
            variant={conceptFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setConceptFilter(null)}
          >
            All
          </Button>
          {allConcepts.map((concept) => (
            <Button
              key={concept}
              variant={conceptFilter === concept ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setConceptFilter(concept);
                setCurrentIndex(0);
              }}
            >
              {concept}
            </Button>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            Example {currentIndex + 1} of {filteredExamples.length}
          </h3>
          {currentExample.difficulty && (
            <Badge className={difficultyColors[currentExample.difficulty]}>
              {currentExample.difficulty}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevExample}
            disabled={filteredExamples.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">
            {currentIndex + 1} / {filteredExamples.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextExample}
            disabled={filteredExamples.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Example Content */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{currentExample.title}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {currentExample.description}
          </p>
          {currentExample.concepts && currentExample.concepts.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {currentExample.concepts.map((concept) => (
                <Badge key={concept} variant="secondary" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="code" className="gap-2">
                <Code className="w-4 h-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="explanation" className="gap-2">
                <Lightbulb className="w-4 h-4" />
                Explanation
              </TabsTrigger>
              {currentExample.variations &&
                currentExample.variations.length > 0 && (
                  <TabsTrigger value="variations" className="gap-2">
                    <span className="emoji-icon">🔄</span>
                    Variations
                  </TabsTrigger>
                )}
            </TabsList>

            <TabsContent value="code" className="space-y-4 mt-4">
              {/* Variation selector */}
              {currentExample.variations &&
                currentExample.variations.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedVariation === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVariation(null)}
                    >
                      Original
                    </Button>
                    {currentExample.variations.map((v, idx) => (
                      <Button
                        key={idx}
                        variant={selectedVariation === idx ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVariation(idx)}
                      >
                        {v.name}
                      </Button>
                    ))}
                  </div>
                )}

              {/* Code block */}
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono">{displayCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleCopyCode}
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Output */}
              {currentExample.output && (
                <div>
                  <p className="text-sm font-semibold mb-2">Expected Output:</p>
                  <pre className="bg-success/10 border border-success/20 p-3 rounded-lg">
                    <code className="text-sm font-mono">
                      {currentExample.output}
                    </code>
                  </pre>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 flex-wrap">
                {onLoadExample && (
                  <Button
                    onClick={() => onLoadExample(displayCode)}
                    className="gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Try This Example
                  </Button>
                )}
                {onAskAI && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      onAskAI("Explain this code step by step", displayCode)
                    }
                    className="gap-2"
                  >
                    <span className="emoji-icon">🤖</span>
                    AI Explain
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="explanation" className="mt-4">
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {currentExample.explanation}
                </p>
              </div>
            </TabsContent>

            {currentExample.variations &&
              currentExample.variations.length > 0 && (
                <TabsContent value="variations" className="mt-4">
                  <div className="space-y-4">
                    {currentExample.variations.map((variation, idx) => (
                      <Card key={idx} className="p-4">
                        <h4 className="font-semibold mb-2">{variation.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {variation.description}
                        </p>
                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                          <code className="text-sm font-mono">
                            {variation.code}
                          </code>
                        </pre>
                        <div className="mt-3 flex gap-2">
                          {onLoadExample && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onLoadExample(variation.code)}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Try This
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Navigation Dots */}
      {filteredExamples.length > 1 && (
        <div className="flex justify-center gap-2">
          {filteredExamples.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setSelectedVariation(null);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
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
