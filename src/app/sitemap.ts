import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllNotes, getAllWork } from "@/lib/content";

const STATIC_ROUTES = [
  "",
  "/about",
  "/work",
  "/services",
  "/notes",
  "/contact",
  "/davao",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const workEntries: MetadataRoute.Sitemap = getAllWork().map((entry) => ({
    url: `${siteConfig.url}/work/${entry.slug}`,
    lastModified: new Date(),
  }));

  const noteEntries: MetadataRoute.Sitemap = getAllNotes().map((note) => ({
    url: `${siteConfig.url}/notes/${note.slug}`,
    lastModified: new Date(note.date),
  }));

  return [...staticEntries, ...workEntries, ...noteEntries];
}
