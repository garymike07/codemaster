import { lazy, Suspense } from "react";

// Singleton to ensure Monaco is only initialized once
let monacoInitialized = false;

// Lazy load Monaco Editor - don't import loader at top level to avoid AMD conflicts with Clerk
const MonacoEditor = lazy(async () => {
  // Dynamically import the loader only when needed
  const { loader } = await import("@monaco-editor/react");
  
  // Configure Monaco only once to prevent duplicate module definitions
  if (!monacoInitialized) {
    loader.config({
      paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
      },
    });
    monacoInitialized = true;
  }
  
  // Return the Editor component
  const mod = await import("@monaco-editor/react");
  return { default: mod.Editor };
});

interface LazyMonacoEditorProps {
  height?: string | number;
  language?: string;
  value?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
  options?: Record<string, unknown>;
  className?: string;
}

export function LazyMonacoEditor({
  height = "400px",
  language = "javascript",
  value = "",
  theme = "vs-dark",
  onChange,
  options = {},
  className,
}: LazyMonacoEditorProps) {
  return (
    <Suspense
      fallback={
        <div
          className={className}
          style={{ height, display: "flex", alignItems: "center", justifyContent: "center", background: "#1e1e1e" }}
        >
          <span style={{ color: "#666" }}>Loading editor...</span>
        </div>
      }
    >
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        theme={theme}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          ...options,
        }}
      />
    </Suspense>
  );
}

export default LazyMonacoEditor;
