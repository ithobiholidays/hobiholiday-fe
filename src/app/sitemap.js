import { slugify } from "@/utils/hooks/slugify";

const BASE_URL = "https://www.hobiholidays.com";
const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// Revalidate sitemap sekali sehari (detik)
export const revalidate = 86400;

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Sitemap fetch failed:", url, err?.message);
    return null;
  }
}

export default async function sitemap() {
  const now = new Date();

  // 1. Halaman statis (publik)
  const staticPaths = [
    { path: "/home", priority: 1, changeFrequency: "daily" },
    { path: "/tour-schedule/category/all", priority: 0.9, changeFrequency: "daily" },
    { path: "/private-trip", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/history", priority: 0.5, changeFrequency: "yearly" },
    { path: "/why-us", priority: 0.5, changeFrequency: "yearly" },
    { path: "/management", priority: 0.5, changeFrequency: "yearly" },
    { path: "/awards", priority: 0.5, changeFrequency: "yearly" },
    { path: "/investor", priority: 0.4, changeFrequency: "yearly" },
    { path: "/career", priority: 0.4, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.4, changeFrequency: "monthly" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-and-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // 2. Halaman kategori tour schedule
  const catRes = await fetchJSON(`${API_URL}/category/all?s=1`);
  const categories = Array.isArray(catRes?.data) ? catRes.data : [];
  for (const cat of categories) {
    if (!cat?.name) continue;
    entries.push({
      url: `${BASE_URL}/tour-schedule/category/${slugify(cat.name)}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // 3. Halaman detail produk (tour)
  const prodRes = await fetchJSON(`${API_URL}/product/all?s=1`);
  const products = Array.isArray(prodRes?.data) ? prodRes.data : [];
  const seen = new Set();
  for (const product of products) {
    const categoryName = product?.categories?.[0];
    if (!categoryName || !product?.title) continue;

    const tripSlug = slugify(`${product.title} ${product.date || ""}`);
    const url = `${BASE_URL}/tour-schedule/category/${slugify(categoryName)}/${tripSlug}`;
    if (seen.has(url)) continue;
    seen.add(url);

    entries.push({
      url,
      lastModified: product?.updatedAt ? new Date(product.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
