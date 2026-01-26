export function slugify(text) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replaceAll("&", "and")
    .replaceAll(",", "-comma")
    .replaceAll("+", "plus")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function deslugify(slug) {
  if (!slug) return "";

  return slug
    .replace(/-comma/g, ",")
    .replace(/plus/g, "+")
    .replace(/-and/g, " &")
    .replace(/-/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
