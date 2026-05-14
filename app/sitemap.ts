import type { MetadataRoute } from "next";
import { fixtures, teams, groups, newsPosts } from "@/lib/data";

const BASE = "https://futbolkick.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/fixtures`,      lastModified: now, changeFrequency: "hourly",  priority: 0.9 },
    { url: `${BASE}/groups`,        lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/teams`,         lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/news`,          lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/predictions`,   lastModified: now, changeFrequency: "daily",   priority: 0.6 },
    { url: `${BASE}/fan-zone`,      lastModified: now, changeFrequency: "daily",   priority: 0.7 },
  ];

  const groupRoutes: MetadataRoute.Sitemap = groups.map((g) => ({
    url:             `${BASE}/groups/${g.id}`,
    lastModified:    now,
    changeFrequency: "daily",
    priority:        0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teams.map((t) => ({
    url:             `${BASE}/teams/${t.id}`,
    lastModified:    now,
    changeFrequency: "weekly",
    priority:        0.7,
  }));

  const matchRoutes: MetadataRoute.Sitemap = fixtures.map((f) => ({
    url:             `${BASE}/matches/${f.id}`,
    lastModified:    now,
    changeFrequency: f.status === "upcoming" ? "daily" : "weekly",
    priority:        f.status === "live" ? 1.0 : 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((p) => ({
    url:             `${BASE}/news/${p.slug}`,
    lastModified:    new Date(p.date),
    changeFrequency: "monthly",
    priority:        p.featured ? 0.8 : 0.6,
  }));

  return [
    ...staticRoutes,
    ...groupRoutes,
    ...teamRoutes,
    ...matchRoutes,
    ...newsRoutes,
  ];
}
