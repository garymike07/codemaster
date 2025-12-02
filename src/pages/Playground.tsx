import { useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Play, Download, Share2, RotateCcw } from "lucide-react";
import { useTheme } from "@/components/theme-context";
import { EditorControls } from "@/components/EditorControls";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

const LANGUAGE_TEMPLATES = {
    javascript: `// JavaScript Playground
console.log("Hello, World!");

// Try writing your code here
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("CodeMaster"));`,

    python: `# Python Playground
print("Hello, World!")

# Try writing your code here
def greet(name):
    return f"Hello, {name}!"

print(greet("CodeMaster"))`,

    typescript: `// TypeScript Playground
const greeting: string = "Hello, World!";
console.log(greeting);

// Try writing your code here
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("CodeMaster"));`,

    java: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(greet("CodeMaster"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

    cpp: `// C++ Playground
#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    cout << greet("CodeMaster") << endl;
    return 0;
}`,
};

const getLanguageId = (language: keyof typeof LANGUAGE_TEMPLATES): number => {
    const languageMap: Record<keyof typeof LANGUAGE_TEMPLATES, number> = {
        javascript: 63,  // JavaScript (Node.js 12.14.0)
        python: 71,      // Python (3.8.1)
        typescript: 74,  // TypeScript (3.7.4)
        java: 62,        // Java (OpenJDK 13.0.1)
        cpp: 54,         // C++ (GCC 9.2.0)
    };
    return languageMap[language];
};

export default function Playground() {
    const { theme } = useTheme();
    const [language, setLanguage] = useState<keyof typeof LANGUAGE_TEMPLATES>("javascript");
    const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Editor State
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(true);

    useKeyboardShortcut({
        key: "Enter",
        ctrlKey: true,
        callback: () => handleRun(),
    });

    const handleLanguageChange = (newLang: keyof typeof LANGUAGE_TEMPLATES) => {
        setLanguage(newLang);
        setCode(LANGUAGE_TEMPLATES[newLang]);
        setOutput("");
        setError(null);
    };

    const handleRun = async () => {
        setIsRunning(true);
        setOutput("");
        setError(null);

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
                        language_id: getLanguageId(language),
                    }),
                }
            );

            const data = await response.json();

            if (data.stdout) {
                setOutput(atob(data.stdout));
            } else if (data.stderr) {
                setError(atob(data.stderr));
            } else if (data.compile_output) {
                setError(`Compile Error:\n${atob(data.compile_output)}`);
            } else if (data.status?.description) {
                if (data.status.id === 3) {
                    setOutput(data.status.description);
                } else {
                    setError(data.status.description);
                }
            } else {
                setOutput("No output");
            }
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(LANGUAGE_TEMPLATES[language]);
        setOutput("");
        setError(null);
    };

    const handleDownload = () => {
        const extensions: Record<keyof typeof LANGUAGE_TEMPLATES, string> = {
            javascript: "js",
            typescript: "ts",
            python: "py",
            java: "java",
            cpp: "cpp",
        };
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `playground.${extensions[language]}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleShare = () => {
        // In a real app, this would generate a shareable link
        alert("Share functionality coming soon!");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <span className="emoji-icon">←</span>
                                    Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold font-display">Code Playground</h1>
                                <p className="text-sm text-muted-foreground">
                                    Experiment with code in your browser
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={language} onValueChange={handleLanguageChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Editor */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                        <div className="w-3 h-3 rounded-full bg-warning" />
                                        <div className="w-3 h-3 rounded-full bg-success" />
                                    </div>
                                    <Badge variant="secondary" className="text-xs capitalize">
                                        {language}
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" onClick={handleReset}>
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Reset
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={handleDownload}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={handleShare}>
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div className="h-[600px] flex flex-col">
                                <div className="border-b border-border bg-muted/30 p-2">
                                    <EditorControls
                                        fontSize={fontSize}
                                        onFontSizeChange={setFontSize}
                                        theme={theme === "dark" ? "dark" : "light"}
                                        onThemeChange={() => { }} // Theme is global
                                        wordWrap={wordWrap}
                                        onWordWrapToggle={() => setWordWrap(!wordWrap)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Editor
                                        height="100%"
                                        language={language}
                                        value={code}
                                        onChange={(value) => setCode(value || "")}
                                        theme={theme === "dark" ? "vs-dark" : "light"}
                                        options={{
                                            minimap: { enabled: true },
                                            fontSize: fontSize,
                                            fontFamily: "'JetBrains Mono', monospace",
                                            lineNumbers: "on",
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            tabSize: 2,
                                            wordWrap: wordWrap ? "on" : "off",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="border-t border-border p-4 flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">
                                    Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Enter</kbd> to run
                                </p>
                                <Button onClick={handleRun} disabled={isRunning} className="gap-2">
                                    <Play className="w-4 h-4" />
                                    {isRunning ? "Running..." : "Run Code"}
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Output & Info */}
                    <div className="space-y-6">
                        {/* Output */}
                        <Card>
                            <div className="bg-muted/50 px-4 py-3 border-b border-border">
                                <h3 className="font-semibold">Output</h3>
                            </div>
                            <div className="p-4 min-h-[200px] max-h-[400px] overflow-auto">
                                {error ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-destructive">
                                            <span className="text-lg">❌</span>
                                            <span className="font-semibold">Error</span>
                                        </div>
                                        <pre className="font-mono text-sm whitespace-pre-wrap text-destructive">{error}</pre>
                                    </div>
                                ) : output ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-success">
                                            <span className="text-lg">✓</span>
                                            <span className="font-semibold">Success</span>
                                        </div>
                                        <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        Run your code to see output here
                                    </p>
                                )}
                            </div>
                        </Card>

                        {/* Tips */}
                        <Card>
                            <div className="bg-muted/50 px-4 py-3 border-b border-border">
                                <h3 className="font-semibold">💡 Tips</h3>
                            </div>
                            <div className="p-4 space-y-3 text-sm">
                                <div>
                                    <p className="font-medium text-primary mb-1">Keyboard Shortcuts</p>
                                    <ul className="text-muted-foreground space-y-1">
                                        <li>• <kbd className="px-1 bg-muted rounded text-xs">Ctrl+S</kbd> - Save code</li>
                                        <li>• <kbd className="px-1 bg-muted rounded text-xs">Ctrl+/</kbd> - Toggle comment</li>
                                        <li>• <kbd className="px-1 bg-muted rounded text-xs">Ctrl+F</kbd> - Find</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-medium text-secondary mb-1">Features</p>
                                    <ul className="text-muted-foreground space-y-1">
                                        <li>• Auto-completion</li>
                                        <li>• Syntax highlighting</li>
                                        <li>• Error detection</li>
                                        <li>• Code formatting</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
