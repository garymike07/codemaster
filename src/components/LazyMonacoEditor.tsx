import { lazy, Suspense } from "react";
import { loader } from "@monaco-editor/react";

// Configure Monaco loader ONCE at module level
let monacoConfigured = false;
if (!monacoConfigured) {
  loader.config({
    paths: {
      vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
    },
  });
  monacoConfigured = true;
}

// Lazy load the actual Monaco Editor
const MonacoEditor = lazy(() => {
  return import("@monaco-editor/react").then((mod) => ({ default: mod.Editor }));
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
