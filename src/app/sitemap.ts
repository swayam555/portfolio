import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
