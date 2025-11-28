import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Wand2, Loader2, Check, AlertCircle } from "lucide-react";

interface Question {
  id: string;
  type: "multiple_choice" | "code" | "short_answer";
  question: string;
  options?: string[];
  correctAnswer?: string;
  solution?: string;
  points: number;
  codeTemplate?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }>;
  hints?: string[];
}

interface AIQuestionGeneratorProps {
  onClose: () => void;
  onGenerate: (questions: Question[]) => void;
}

export function AIQuestionGenerator({ onClose, onGenerate }: AIQuestionGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [questionCount, setQuestionCount] = useState(3);
  const [questionType, setQuestionType] = useState<"code" | "multiple_choice">("code");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());

  const generateCodingQuestions = useAction(api.ai.generateExamQuestions);
  const generateMCQuestions = useAction(api.ai.generateMultipleChoiceQuestions);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please select a topic");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedQuestions([]);

    try {
      let result;
      if (questionType === "code") {
        result = await generateCodingQuestions({
          topic,
          language,
          difficulty,
          questionCount,
        });
      } else {
        result = await generateMCQuestions({
          topic,
          language,
          difficulty,
          questionCount,
        });
      }

      if (result.success && result.questions) {
        setGeneratedQuestions(result.questions);
        setSelectedQuestions(new Set(result.questions.map((q: Question) => q.id)));
      } else {
        setError(result.error || "Failed to generate questions. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred while generating questions.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleQuestion = (id: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQuestions(newSelected);
  };

  const handleAddSelected = () => {
    const questionsToAdd = generatedQuestions.filter((q) =>
      selectedQuestions.has(q.id)
    );
    onGenerate(questionsToAdd);
  };

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
  ];

  const topics = [
    // Fundamentals
    { category: "Fundamentals", items: [
      "Variables and Data Types",
      "Operators and Expressions",
      "Control Flow (if/else, switch)",
      "Loops (for, while, do-while)",
      "Functions and Methods",
      "Scope and Closures",
    ]},
    // Data Structures
    { category: "Data Structures", items: [
      "Arrays and Lists",
      "Strings and String Manipulation",
      "Objects and Dictionaries",
      "Sets and Maps",
      "Stacks and Queues",
      "Linked Lists",
      "Trees and Binary Trees",
      "Graphs",
      "Hash Tables",
    ]},
    // Algorithms
    { category: "Algorithms", items: [
      "Sorting Algorithms",
      "Searching Algorithms",
      "Recursion",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Divide and Conquer",
      "Backtracking",
      "Two Pointers Technique",
      "Sliding Window",
    ]},
    // OOP & Design
    { category: "OOP & Design", items: [
      "Classes and Objects",
      "Inheritance and Polymorphism",
      "Encapsulation and Abstraction",
      "Interfaces and Abstract Classes",
      "Design Patterns",
      "SOLID Principles",
    ]},
    // Web Development
    { category: "Web Development", items: [
      "DOM Manipulation",
      "Event Handling",
      "Async/Await and Promises",
      "HTTP and REST APIs",
      "JSON Parsing",
      "Error Handling",
      "Local Storage and Sessions",
    ]},
    // Advanced Topics
    { category: "Advanced Topics", items: [
      "Regular Expressions",
      "File I/O Operations",
      "Memory Management",
      "Multithreading Basics",
      "Testing and Debugging",
      "Code Optimization",
    ]},
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-2 md:p-4">
      <Card className="w-full max-w-2xl mx-2 md:mx-4 max-h-[95vh] md:max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b sticky top-0 bg-background">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            AI Question Generator
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Configuration */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic *</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">Select a topic...</option>
                {topics.map((group) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.items.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Question Type</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as "code" | "multiple_choice")}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="code">Coding Challenges</option>
                <option value="multiple_choice">Multiple Choice</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Questions</label>
              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                min={1}
                max={10}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Questions
              </>
            )}
          </Button>

          {/* Generated Questions Preview */}
          {generatedQuestions.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Generated Questions ({selectedQuestions.size} selected)
                </h3>
                <Button
                  size="sm"
                  onClick={() => {
                    if (selectedQuestions.size === generatedQuestions.length) {
                      setSelectedQuestions(new Set());
                    } else {
                      setSelectedQuestions(
                        new Set(generatedQuestions.map((q) => q.id))
                      );
                    }
                  }}
                  variant="outline"
                >
                  {selectedQuestions.size === generatedQuestions.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {generatedQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedQuestions.has(question.id)
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          selectedQuestions.has(question.id)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedQuestions.has(question.id) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            Q{index + 1}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {question.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-2">{question.question}</p>
                        {question.testCases && question.testCases.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {question.testCases.length} test case(s)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSelected}
                  disabled={selectedQuestions.size === 0}
                >
                  Add {selectedQuestions.size} Question
                  {selectedQuestions.size !== 1 ? "s" : ""}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
