export const siteConfig = {
  name: "Kurt Rainier Sacay",
  title: "Kurt Rainier Sacay — AI & Full-Stack Engineer",
  description:
    "Kurt Rainier Sacay is an AI and full-stack engineer based in Davao City, Philippines, building governed AI features, multi-tenant SaaS platforms on .NET and Next.js, RAG systems, and automation workflows.",
  // TODO: set NEXT_PUBLIC_SITE_URL in the Vercel project before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "iamkurtrainiersacay@gmail.com",
  location: {
    city: "Davao City",
    region: "Davao Region",
    country: "PH",
    timezone: "PHT (UTC+8)",
  },
  links: {
    // TODO(Kurt): this GitHub account was created 2026-07-28 and currently has
    // one repository and no bio, display name, or profile README. A client who
    // clicks through sees an empty account — populate it before launch.
    github: "https://github.com/Azaroth-121",
    linkedin: "https://www.linkedin.com/in/kurt-rainier-sacay-5a3aa72b7/",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/contact" },
] as const;
