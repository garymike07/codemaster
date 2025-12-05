// Languages that support code execution via Judge0
export const EXECUTABLE_LANGUAGES = [
  'python',
  'csharp',
  'c#',
  'cpp',
  'c++',
  'javascript',
  'js',
  'java',
  'html',
  'css',
] as const;

export type ExecutableLanguage = typeof EXECUTABLE_LANGUAGES[number];

/**
 * Check if a language supports code execution in the editor
 * Languages not in this list will show notes-only mode
 */
export function isExecutableLanguage(language?: string): boolean {
  if (!language) return false;
  return EXECUTABLE_LANGUAGES.includes(language.toLowerCase() as ExecutableLanguage);
}

/**
 * Get the Judge0 language ID for a given language
 */
export function getJudge0LanguageId(language?: string): number {
  switch (language?.toLowerCase()) {
    case 'python':
      return 71; // Python 3.8.1
    case 'javascript':
    case 'js':
      return 63; // JavaScript (Node.js)
    case 'java':
      return 62; // Java (OpenJDK 13.0.1)
    case 'cpp':
    case 'c++':
      return 54; // C++ (GCC 9.2.0)
    case 'csharp':
    case 'c#':
      return 51; // C# (Mono 6.6.0.161)
    case 'c':
      return 50; // C (GCC 9.2.0)
    default:
      return 63; // Default to JavaScript
  }
}

/**
 * Get Monaco editor language identifier
 */
export function getMonacoLanguage(language?: string): string {
  switch (language?.toLowerCase()) {
    case 'python':
      return 'python';
    case 'javascript':
    case 'js':
      return 'javascript';
    case 'java':
      return 'java';
    case 'cpp':
    case 'c++':
      return 'cpp';
    case 'csharp':
    case 'c#':
      return 'csharp';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'typescript':
    case 'ts':
      return 'typescript';
    case 'go':
      return 'go';
    case 'rust':
      return 'rust';
    default:
      return 'plaintext';
  }
}
