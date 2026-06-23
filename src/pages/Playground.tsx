import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyMonacoEditor } from "@/components/LazyMonacoEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Download, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme-context";
import { EditorControls } from "@/components/EditorControls";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useAuth } from "@/hooks/useAuth";
import { executeRemoteCode } from "@/lib/remoteCodeExecution";

const TEMPLATES = {
  javascript: `// JavaScript Playground
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("CodeMaster"));`,
  python: `# Python Playground
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("CodeMaster"))`,
};

export default function Playground() {
  const { theme } = useTheme();
  const { getToken } = useAuth();
  const [language, setLanguage] = useState<"javascript" | "python">("javascript");
  const [code, setCode] = useState(TEMPLATES.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);

  useKeyboardShortcut({
    key: "Enter",
    ctrlKey: true,
    callback: () => handleRun(),
  });

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError(null);

    try {
      const data = await executeRemoteCode({ code, language, getToken });

      if (data.output) {
        setOutput(data.output);
      } else if (data.error) {
        setError(data.error);
      } else if (data.status === "Accepted") {
        setOutput(data.status);
      } else if (data.status) {
        setError(data.status);
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
    setCode(TEMPLATES[language]);
    setOutput("");
    setError(null);
  };

  const handleLanguageChange = (lang: "javascript" | "python") => {
    setLanguage(lang);
    setCode(TEMPLATES[lang]);
    setOutput("");
    setError(null);
  };

  const handleDownload = () => {
    const ext = language === "python" ? "py" : "js";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2 min-h-11" asChild>
                <Link to="/dashboard">← Dashboard</Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Code Playground</h1>
                <p className="text-sm text-muted-foreground">
                  Practice JavaScript or Python
                </p>
              </div>
            </div>
            <Select value={language} onValueChange={(v) => handleLanguageChange(v as "javascript" | "python")}>
              <SelectTrigger className="w-[160px] min-h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">playground.js</Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={handleReset} className="min-h-11">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleDownload} className="min-h-11">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="h-[500px] md:h-[600px] flex flex-col">
                <div className="border-b border-border bg-muted/30 p-2">
                  <EditorControls
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    theme={theme === "dark" ? "dark" : "light"}
                    onThemeChange={() => {}}
                    wordWrap={wordWrap}
                    onWordWrapToggle={() => setWordWrap(!wordWrap)}
                  />
                </div>
                <div className="flex-1">
                  <LazyMonacoEditor
                    height="100%"
                    language="javascript"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme={theme === "dark" ? "vs-dark" : "light"}
                    options={{
                      minimap: { enabled: false },
                      fontSize,
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
              <div className="border-t border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Enter</kbd> to run
                </p>
                <Button onClick={handleRun} disabled={isRunning} className="gap-2 min-h-11 w-full sm:w-auto">
                  <Play className="w-4 h-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-semibold">Output</h3>
              </div>
              <div className="p-4 min-h-[200px] max-h-[400px] overflow-auto">
                {error ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap text-destructive">{error}</pre>
                ) : output ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-muted-foreground text-sm">Run your code to see output here</p>
                )}
              </div>
            </Card>

            <Card>
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-semibold">Quick tips</h3>
              </div>
              <div className="p-4 space-y-3 text-sm text-muted-foreground">
                <p>Use <code className="text-xs bg-muted px-1 rounded">console.log()</code> to print values.</p>
                <p>Try array methods like <code className="text-xs bg-muted px-1 rounded">.map()</code> and <code className="text-xs bg-muted px-1 rounded">.filter()</code>.</p>
                <p>Need structure? Continue in the <Link to="/course/javascript-fundamentals" className="text-primary hover:underline">JavaScript course</Link>.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
