import type { MetadataRoute } from "next";

const BASE = "https://techruby.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [{ url: `${BASE}/`, lastModified, changeFrequency: "weekly", priority: 1 }];
}
