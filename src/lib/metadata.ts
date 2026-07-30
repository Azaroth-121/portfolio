import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogSubtitle,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogSubtitle?: string;
}): Metadata {
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle ?? title)}${
    ogSubtitle ? `&subtitle=${encodeURIComponent(ogSubtitle)}` : ""
  }`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: path },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
