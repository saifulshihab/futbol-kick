import { WEBSITE_BASE_URL } from "@/lib/config";
import { fixtures, groups, newsPosts, teams } from "@/lib/data";
import type { MetadataRoute } from "next";

const SITE_LAUNCH_DATE = new Date("2026-05-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: WEBSITE_BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${WEBSITE_BASE_URL}/fixtures`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9
    },
    {
      url: `${WEBSITE_BASE_URL}/groups`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${WEBSITE_BASE_URL}/teams`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${WEBSITE_BASE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${WEBSITE_BASE_URL}/predictions`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "daily",
      priority: 0.6
    },
    {
      url: `${WEBSITE_BASE_URL}/fan-zone`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: "daily",
      priority: 0.7
    }
  ];

  const groupRoutes: MetadataRoute.Sitemap = groups.map((g) => ({
    url: `${WEBSITE_BASE_URL}/groups/${g.id}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8
  }));

  const teamRoutes: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${WEBSITE_BASE_URL}/teams/${t.id}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  const matchRoutes: MetadataRoute.Sitemap = fixtures.map((f) => ({
    url: `${WEBSITE_BASE_URL}/matches/${f.id}`,
    lastModified: now,
    changeFrequency: f.status === "upcoming" ? "daily" : "weekly",
    priority: f.status === "live" ? 1.0 : 0.7
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((p) => ({
    url: `${WEBSITE_BASE_URL}/news/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6
  }));

  return [
    ...staticRoutes,
    ...groupRoutes,
    ...teamRoutes,
    ...matchRoutes,
    ...newsRoutes
  ];
}
