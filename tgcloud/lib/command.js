export function commandName(text) {
  if (!text?.startsWith('/')) return null;
  const token = text.split(/\s+/, 1)[0];
  return token.slice(1).split('@', 1)[0].toLowerCase();
}

export function commandArgs(text) {
  const idx = text.indexOf(' ');
  return idx === -1 ? '' : text.slice(idx + 1).trim();
}
