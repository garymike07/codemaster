import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play, RotateCcw } from "lucide-react";

const INITIAL_CODE = `# Try coding right now!
def greet(name):
    return f"Hello, {name}! 👋"

# Change the name below
print(greet("World"))`;

const EXPECTED_OUTPUT = "Hello, World! 👋";

export function InteractiveDemo() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setSuccess(false);
    
    // Simulate code execution
    setTimeout(() => {
      // Simple pattern matching for the demo
      if (code.includes('print(greet(')) {
        const match = code.match(/print\(greet\("(.+?)"\)\)/);
        if (match) {
          const name = match[1];
          const result = `Hello, ${name}! 👋`;
          setOutput(result);
          setSuccess(result === EXPECTED_OUTPUT);
        } else {
          setOutput("Error: Check your syntax");
        }
      } else {
        setOutput("Error: Make sure to call print(greet(...))");
      }
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setCode(INITIAL_CODE);
    setOutput("");
    setSuccess(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-lg border border-border overflow-hidden bg-card shadow-lg">
        {/* Header */}
        <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <span className="text-sm font-mono text-muted-foreground ml-2">
              demo.py
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="h-[250px]">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
            }}
          />
        </div>

        {/* Output */}
        {output && (
          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                Output:
              </span>
              <div className="flex-1">
                <pre className={`text-sm font-mono ${
                  success ? "text-success" : output.includes("Error") ? "text-destructive" : "text-foreground"
                }`}>
                  {output}
                </pre>
                {success && (
                  <p className="text-xs text-success mt-2 flex items-center gap-1">
                    ✓ Perfect! You're ready to start learning.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        ✨ <span className="text-primary font-medium">No signup required</span> - Try editing the code above!
      </p>
    </div>
  );
}
