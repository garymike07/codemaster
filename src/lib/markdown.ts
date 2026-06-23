const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function renderSafeMarkdown(text: string, compact = false): string {
  const escaped = escapeHtml(text);
  const paragraphClass = compact ? "my-3 leading-relaxed" : "my-2";
  const codeClass = compact
    ? "bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm"
    : "bg-muted p-4 rounded-lg overflow-x-auto my-4";

  return escaped
    .replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      `<pre class="${codeClass}"><code>$2</code></pre>`
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>'
    )
    .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
    .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*)/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, `</p><p class="${paragraphClass}">`)
    .replace(/^(.+)$/gm, `<p class="${paragraphClass}">$1</p>`)
    .replace(/<p[^>]*><\/p>/g, "")
    .replace(/<p[^>]*><h/g, "<h")
    .replace(/<\/h(\d)><\/p>/g, "</h$1>")
    .replace(/<p[^>]*><pre/g, "<pre")
    .replace(/<\/pre><\/p>/g, "</pre>")
    .replace(/<p[^>]*><li/g, "<li")
    .replace(/<\/li><\/p>/g, "</li>");
}
