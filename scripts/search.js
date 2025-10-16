// search.js - safe regex compiler and highlight helper
export function compileRegex(input, flags = 'i') {
  if (!input) return null;
  try {
    return new RegExp(input, flags);
  } catch (e) {
    return null; // caller should handle null as "invalid regex"
  }
}

export function highlight(text, re) {
  if (!re) return text;
  // escape HTML - minimal
  const escaped = String(text).replace(/[&<>"']/g, (s) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
  return escaped.replace(re, (m) => `<mark>${m}</mark>`);
}
