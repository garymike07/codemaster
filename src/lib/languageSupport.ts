// Languages that support code execution via Judge0 in CodeMaster
export const EXECUTABLE_LANGUAGES = ['javascript', 'js', 'python'] as const;

export type ExecutableLanguage = (typeof EXECUTABLE_LANGUAGES)[number];

export function isExecutableLanguage(language?: string): boolean {
  if (!language) return false;
  const n = language.toLowerCase();
  return n === 'javascript' || n === 'js' || n === 'python';
}

export function getJudge0LanguageId(language?: string): number {
  switch (language?.toLowerCase()) {
    case 'python':
      return 71;
    case 'javascript':
    case 'js':
    default:
      return 63;
  }
}

export function getMonacoLanguage(language?: string): string {
  switch (language?.toLowerCase()) {
    case 'python':
      return 'python';
    case 'javascript':
    case 'js':
      return 'javascript';
    default:
      return 'plaintext';
  }
}
