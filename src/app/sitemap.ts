import type { MetadataRoute } from "next";
import { projectsData } from "@/lib/projects";

const BASE_URL = "https://myportfolio-neon-chi-60.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectsData.map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
