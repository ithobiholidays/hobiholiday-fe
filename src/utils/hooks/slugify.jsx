function slugify(text) {
  if (!text) return ""; // handle undefined, null, empty

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

function deslugify(slug) {
  if (!slug) return "";

  if (slug)
    return slug
      .replace(/-comma/g, ",")
      .replace(/plus/g, "+")
      .replace(/-and/g, " &")
      .replace(/-/g, " ")
      .replace(/\s+,/g, ",")
      .replace(/\b\w/g, (c) => c.toUpperCase());
}

module.exports = { slugify, deslugify };
