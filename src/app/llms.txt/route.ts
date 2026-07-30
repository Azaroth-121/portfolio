import { siteConfig } from "@/config/site";
import { getAllWork } from "@/lib/content";

// Served as a route handler (not a static public/ file) so the domain
// resolves from NEXT_PUBLIC_SITE_URL instead of being hardcoded — see the
// TODO on siteConfig.url until that env var is set in Vercel.
export async function GET() {
  const work = getAllWork();

  const lines = [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    `Location: ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country} (${siteConfig.location.timezone})`,
    `Email: ${siteConfig.email}`,
    `Available for: AI chatbot implementation (RAG on your own documents), automation workflow builds (n8n/Make.com, CRM and telephony integrations), and web platform builds (Next.js or WordPress, SEO-correct from day one).`,
    "",
    "## Pages",
    `- Home: ${siteConfig.url}/`,
    `- About: ${siteConfig.url}/about`,
    `- Work: ${siteConfig.url}/work`,
    `- Services: ${siteConfig.url}/services`,
    `- Notes: ${siteConfig.url}/notes`,
    `- Contact: ${siteConfig.url}/contact`,
    `- Davao (local clients): ${siteConfig.url}/davao`,
    "",
    "## Case studies",
    ...work.map((entry) => `- ${entry.title}: ${siteConfig.url}/work/${entry.slug} — ${entry.summary}`),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
