export const capitalize = (s) =>
  s?.length ? s[0].toUpperCase() + s.slice(1) : s ?? "";

export const camelCaseToPhrase = (input) => {
  if (!input) return "";
  const normalized = String(input).replace(/[_-]+/g, " ");
  const spaced = normalized.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.trim().replace(/\s+/g, " ");
};