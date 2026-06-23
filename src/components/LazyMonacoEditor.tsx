import { lazy, Suspense } from "react";
import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

type MonacoEnvironmentWithWorkers = typeof globalThis & {
  MonacoEnvironment?: {
    getWorker: (_moduleId: string, label: string) => Worker;
  };
};

let monacoConfigured = false;

function configureMonaco() {
  if (monacoConfigured) {
    return;
  }

  const monacoGlobal = globalThis as MonacoEnvironmentWithWorkers;

  monacoGlobal.MonacoEnvironment = {
    getWorker(_moduleId, label) {
      switch (label) {
        case "json":
          return new jsonWorker();
        case "css":
        case "scss":
        case "less":
          return new cssWorker();
        case "html":
        case "handlebars":
        case "razor":
          return new htmlWorker();
        case "typescript":
        case "javascript":
          return new tsWorker();
        default:
          return new editorWorker();
      }
    },
  };

  loader.config({ monaco });
  monacoConfigured = true;
}

configureMonaco();

const MonacoEditor = lazy(async () => {
  const mod = await import("@monaco-editor/react");
  return { default: mod.Editor };
});

interface LazyMonacoEditorProps {
  height?: string | number;
  language?: string;
  value?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: unknown) => void;
  options?: Record<string, unknown>;
  className?: string;
}

export function LazyMonacoEditor({
  height = "400px",
  language = "javascript",
  value = "",
  theme = "vs-dark",
  onChange,
  onMount,
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
        onMount={onMount}
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
