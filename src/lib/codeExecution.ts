export function utf8ToBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64(str: string): string {
  try { return decodeURIComponent(escape(atob(str))); } catch { return atob(str); }
}
