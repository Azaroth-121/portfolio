import {
  siDocker,
  siDotnet,
  siDrizzle,
  siExpress,
  siFastify,
  siFirebase,
  siGit,
  siGithubactions,
  siGooglechrome,
  siHubspot,
  siKicad,
  siArduino,
  siMake,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPaypal,
  siPhp,
  siPnpm,
  siPostgresql,
  siPwa,
  siPython,
  siReact,
  siReactquery,
  siSqlite,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTurborepo,
  siTypescript,
  siJavascript,
  siVercel,
  siVite,
  siVitest,
  siWordpress,
  siZod,
  siElectron,
  siFlutter,
  siLangchain,
} from "simple-icons";

/**
 * One entry per technology. `path` is a 24×24 Simple Icons glyph (CC0);
 * brands without a published glyph (Microsoft, OpenAI, Oracle) get a
 * typographic monogram instead. `ink` = the brand colour is too dark to read
 * on a dark field, so the glyph renders in the text colour.
 */
export type StackIcon = {
  id: string;
  title: string;
  hex: string;
  path?: string;
  monogram?: string;
  ink?: boolean;
};

type SimpleIcon = { title: string; hex: string; path: string };

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function fromSimple(id: string, icon: SimpleIcon, title = icon.title): StackIcon {
  return { id, title, hex: `#${icon.hex}`, path: icon.path, ink: luminance(icon.hex) < 0.12 };
}

export const ICONS = {
  typescript: fromSimple("typescript", siTypescript),
  javascript: fromSimple("javascript", siJavascript),
  react: fromSimple("react", siReact),
  next: fromSimple("next", siNextdotjs),
  node: fromSimple("node", siNodedotjs),
  dotnet: fromSimple("dotnet", siDotnet, ".NET 8"),
  csharp: { id: "csharp", title: "C#", hex: "#9B4F96", monogram: "C#" },
  azure: { id: "azure", title: "Azure", hex: "#0078D4", monogram: "Az" },
  openai: { id: "openai", title: "OpenAI", hex: "#10A37F", monogram: "AI" },
  java: { id: "java", title: "Java", hex: "#E76F00", monogram: "Jv" },
  bicep: { id: "bicep", title: "Bicep", hex: "#0078D4", monogram: "Bi" },
  postgres: fromSimple("postgres", siPostgresql),
  drizzle: fromSimple("drizzle", siDrizzle),
  tailwind: fromSimple("tailwind", siTailwindcss),
  docker: fromSimple("docker", siDocker),
  supabase: fromSimple("supabase", siSupabase),
  firebase: fromSimple("firebase", siFirebase),
  vite: fromSimple("vite", siVite),
  vitest: fromSimple("vitest", siVitest),
  githubactions: fromSimple("githubactions", siGithubactions),
  git: fromSimple("git", siGit),
  python: fromSimple("python", siPython),
  n8n: fromSimple("n8n", siN8n),
  make: fromSimple("make", siMake, "Make.com"),
  wordpress: fromSimple("wordpress", siWordpress),
  arduino: fromSimple("arduino", siArduino),
  kicad: fromSimple("kicad", siKicad),
  chrome: fromSimple("chrome", siGooglechrome, "Chrome Extensions"),
  pnpm: fromSimple("pnpm", siPnpm),
  turborepo: fromSimple("turborepo", siTurborepo),
  vercel: fromSimple("vercel", siVercel),
  ollama: fromSimple("ollama", siOllama),
  paypal: fromSimple("paypal", siPaypal),
  stripe: fromSimple("stripe", siStripe),
  express: fromSimple("express", siExpress),
  fastify: fromSimple("fastify", siFastify),
  sqlite: fromSimple("sqlite", siSqlite),
  mysql: fromSimple("mysql", siMysql),
  php: fromSimple("php", siPhp),
  hubspot: fromSimple("hubspot", siHubspot),
  zod: fromSimple("zod", siZod),
  reactquery: fromSimple("reactquery", siReactquery, "TanStack Query"),
  pwa: fromSimple("pwa", siPwa),
  electron: fromSimple("electron", siElectron),
  flutter: fromSimple("flutter", siFlutter),
  langchain: fromSimple("langchain", siLangchain),
} satisfies Record<string, StackIcon>;

export type IconId = keyof typeof ICONS;

/** The hero constellation: three rings, innermost = daily drivers. */
export const ORBIT_RINGS: { radius: number; duration: number; size: number; reverse?: boolean; icons: IconId[] }[] = [
  { radius: 27, duration: 60, size: 54, icons: ["typescript", "react", "dotnet", "postgres", "openai"] },
  { radius: 38, duration: 90, size: 50, reverse: true, icons: ["next", "azure", "node", "csharp", "tailwind", "docker"] },
  { radius: 48, duration: 130, size: 46, icons: ["supabase", "vite", "python", "n8n", "githubactions", "drizzle", "chrome", "vitest"] },
];

/** The scrolling logo band, two rows. */
export const MARQUEE_ROWS: IconId[][] = [
  ["typescript", "react", "next", "node", "dotnet", "csharp", "postgres", "azure", "openai", "docker", "tailwind", "supabase", "vite", "githubactions"],
  ["python", "n8n", "make", "drizzle", "vitest", "chrome", "pnpm", "turborepo", "firebase", "wordpress", "express", "fastify", "sqlite", "ollama", "arduino", "kicad"],
];

/** Map the free-text `stack` labels used in case-study frontmatter to icons. */
const LABEL_MATCHERS: [RegExp, IconId][] = [
  [/typescript/i, "typescript"],
  [/javascript/i, "javascript"],
  [/next/i, "next"],
  [/react/i, "react"],
  [/\.net|c#/i, "dotnet"],
  [/postgres/i, "postgres"],
  [/azure/i, "azure"],
  [/openai|llm/i, "openai"],
  [/drizzle/i, "drizzle"],
  [/supabase/i, "supabase"],
  [/node/i, "node"],
  [/express/i, "express"],
  [/chrome/i, "chrome"],
  [/n8n/i, "n8n"],
  [/wordpress/i, "wordpress"],
  [/vitest/i, "vitest"],
  [/pwa|offline/i, "pwa"],
  [/arduino/i, "arduino"],
  [/kicad|pcb/i, "kicad"],
  [/tailwind/i, "tailwind"],
  [/firebase/i, "firebase"],
];

export function iconForLabel(label: string): StackIcon | undefined {
  const hit = LABEL_MATCHERS.find(([re]) => re.test(label));
  return hit ? ICONS[hit[1]] : undefined;
}
