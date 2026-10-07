/**
 * Project catalogue — the single source of truth for the Projects section.
 *
 * Everything the section renders (filter tabs, counts, cards, modal) is derived
 * from this array, so adding or updating a project is a one-entry change here.
 * No component hardcodes a project, a category, or a demo behaviour.
 */

/* ── Types ─────────────────────────────────────────────────────────────────── */

/**
 * Category ids.
 *
 * `all` is a pseudo-category used only by the filter bar; no project carries it.
 * Only categories that actually own projects are listed — an empty tab is worse
 * than no tab, so UI/UX and Web3 categories were left out rather than shipped
 * with zero results.
 */
export type ProjectCategoryId = "all" | "agents" | "fullstack";

/** The categories a project can genuinely belong to (i.e. excluding `all`). */
export type ProjectCategory = Exclude<ProjectCategoryId, "all">;

/**
 * How a project's demo is reached.
 *
 * This used to be a single `previewUrl: string` that held either a real URL or
 * a magic sentinel ("terminal-mockup" / "wellness-terminal" /
 * "studies-terminal"). Because both cases lived in one `string`, every consumer
 * had to re-implement the same string-comparison dispatch, and that dispatch
 * was copy-pasted four times across the section. A discriminated union makes
 * "open a URL" and "open a modal" impossible to confuse.
 */
export type ProjectPreview =
  | { kind: "live"; url: string }
  | { kind: "wellness" }
  | { kind: "studies" };

/** Preview kinds that are served by an in-page modal rather than a URL. */
export type InteractivePreviewKind = "wellness" | "studies";

export type Project = {
  id: number;
  title: string;
  /** Short impact line — one sentence, shown under the title on the card. */
  tagline: string;
  /** Full overview, shown in the case-study modal. */
  description: string;
  /**
   * Optional problem statement. Left unset until it is written per project —
   * the modal hides the section entirely rather than showing filler.
   */
  problem?: string;
  /** Concrete, checkable capabilities. */
  features: string[];
  image: string;
  category: ProjectCategory;
  gitUrl: string;
  preview: ProjectPreview;
  techStack: string[];
  /**
   * Headline results, e.g. "10k+ API calls/day".
   *
   * Deliberately empty across the catalogue: there are no audited usage
   * numbers behind these projects yet, and inventing them puts false claims
   * in front of employers. The UI renders a metrics row only when a project has
   * at least one entry, so dropping real numbers in below turns them on with no
   * other change.
   */
  metrics?: string[];
  /** Opt-in highlight. Rendered with a gradient ring and a "Featured" badge. */
  featured?: boolean;
};

/* ── Data ──────────────────────────────────────────────────────────────────── */

export const projectsData: Project[] = [
  {
    id: 16,
    title: "AURA Luxury Storefront",
    tagline:
      "Luxury tech storefront where the whole cart checks out over WhatsApp.",
    description:
      "A direct-to-consumer store for premium audio and wearables — AURA Max ANC over-ears, AURA Pods Pro, AURA Chrono titanium smartwatch and AURA Pulse fitness band, alongside chargers and desk power. WhatsApp is the primary ordering channel rather than a form: any product, cart or checkout is sent to the team pre-filled and ready to confirm, with concierge chat, order tracking and custom bundle or engraving requests handled in the same thread. Built to sell direct and put the margin into materials, sound and craft instead of middlemen.",
    features: [
      "WhatsApp checkout — product, cart or order sent pre-filled",
      "Concierge chat with a product specialist",
      "Live order tracking inside the chat thread",
      "Custom orders, bundles and engraving",
      "Audio, wearables and charging collection",
      "Direct-to-consumer pricing with no middlemen",
    ],
    image: "/Aura.jpg",
    category: "fullstack",
    gitUrl: "https://github.com/Fatimahnoman/Aura-Luxury-Storefront/",
    preview: { kind: "live", url: "https://aura-luxury-storefront.vercel.app/" },
    techStack: ["React", "Vite", "Tailwind CSS", "WhatsApp API", "Vercel"],
    metrics: [],
    featured: true,
  },
  {
    id: 14,
    title: "Nexus SaaS Dashboard",
    tagline:
      "Enterprise SaaS landing page and analytics dashboard in a single app.",
    description:
      "An enterprise SaaS platform for B2B startups and AI agencies that pairs a conversion-focused marketing landing page with an interactive analytics dashboard, switched between client-side without a page reload. The landing side carries the dark glassmorphism treatment — floating 3D cards, glowing borders, and a monthly/yearly pricing toggle that applies a 20% discount automatically. The dashboard side renders revenue and telemetry charts, a live activity stream for running AI agent operations and API latency, agent-deployment and export modals, and light/dark theming. Built on TanStack Start with TypeScript and a 50-component Radix UI kit.",
    features: [
      "Dual-mode app — landing page and dashboard, one client-side toggle",
      "Pricing toggle with automatic 20% yearly discount",
      "Revenue and telemetry charts via Recharts",
      "Live activity stream for agent operations and API latency",
      "Agent deployment and export modals",
      "50-component Radix UI kit with light/dark theming",
    ],
    image: "/Nexus-Dashboard.jpg",
    category: "fullstack",
    gitUrl: "https://github.com/Fatimahnoman/Nexus-Saas-Dashboard",
    preview: {
      kind: "live",
      url: "https://nexus-saas-dashboard-sepia.vercel.app/",
    },
    techStack: [
      "TanStack Start",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Vercel",
    ],
    metrics: [],
  },
  {
    id: 17,
    title: "Apex Booking Portal",
    tagline:
      "Multi-tier booking engine for high-ticket consultations, with a working four-step booking flow.",
    description:
      "A scheduling portal for premium consultation businesses, built around a four-step booking flow — service, date and time, details, confirmation — that runs end to end in the browser. Six priced consultation tiers sit alongside a roster of specialists whose availability is tracked individually, so a slot can be booked against a specific partner rather than a generic calendar. A provider-side view flips the same app to the other side of the transaction, and currency and language switchers sit in the header. The integrations surface covers Google Calendar two-way sync, Outlook 365, Stripe, generated PDF receipts and automatic client timezone detection. React with Vite and Tailwind CSS, deployed on Vercel.",
    features: [
      "Four-step booking flow — service, slot, details, confirmation",
      "Six priced consultation tiers with per-session durations",
      "Per-specialist availability, including fully-booked states",
      "Provider-side view of the same booking app",
      "Currency and language switchers in the header",
      "Integration surface for Calendar, Outlook 365, Stripe and PDF receipts",
    ],
    image: "/Apex-Booking-Portal.jpg",
    category: "fullstack",
    gitUrl: "https://github.com/Fatimahnoman/Apex-Booking-Portal",
    preview: { kind: "live", url: "https://apex-booking-portal.vercel.app/" },
    techStack: ["React", "Vite", "Tailwind CSS", "Vercel"],
    metrics: [],
  },
  {
    id: 7,
    title: "StudiesHelper Agent",
    tagline:
      "Specialised agents that handle study reminders and motivation through the OpenAI Agents SDK.",
    description:
      "An intelligent multi-agent system built with OpenAI Agents SDK, featuring specialized agents for study reminders and motivation.",
    features: [
      "Multi-agent orchestration",
      "Specialised study reminder agents",
      "Dedicated motivation agent",
      "Built on the OpenAI Agents SDK",
    ],
    image: "/Agenthelper.jpg",
    category: "agents",
    gitUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    preview: { kind: "studies" },
    techStack: ["OpenAI SDK", "Python", "Multi-Agent System"],
    metrics: [],
  },
  {
    id: 9,
    title: "WellnessOracle Agent",
    tagline:
      "Gemini-powered agents covering nutrition, injury support, workout planning and goal tracking.",
    description:
      "An intelligent multi-agent AI system powered by Google Gemini, featuring specialized agents for nutrition guidance, injury support, workout planning, and goal tracking.",
    features: [
      "Nutrition guidance agent",
      "Injury support agent",
      "Workout planning agent",
      "Goal tracking agent",
      "Guardrails around health advice",
    ],
    image: "/wellness_agent.jpg",
    category: "agents",
    gitUrl: "https://github.com/Fatimahnoman/Health_Wellness_Agent",
    preview: { kind: "wellness" },
    techStack: ["Python", "Gemini API", "Multi-Agent", "Guardrails"],
    metrics: [],
  },
  {
    id: 2,
    title: "AI Humanoid Robotics Textbook",
    tagline:
      "Physical AI and humanoid robotics taught through an interactive textbook with a RAG study assistant.",
    description:
      "An AI-powered interactive platform for learning Physical AI and Humanoid Robotics, featuring a RAG-based chatbot for educational support.",
    features: [
      "Interactive learning content on Physical AI",
      "Humanoid robotics curriculum",
      "RAG chatbot for educational support",
    ],
    image: "/Book%20image.png",
    category: "fullstack",
    gitUrl:
      "https://github.com/Fatimahnoman/Hack01-Physical-AI-Humanoid-Robotics-TextBook-With-Chatbot",
    preview: {
      kind: "live",
      url: "https://hack01-physical-ai-humanoid-robotic-eta.vercel.app/",
    },
    techStack: ["Next.js", "Tailwind CSS", "RAG Chatbot", "OpenRouter"],
    metrics: [],
  },
  {
    id: 1,
    title: "The Embroidery Atelier",
    tagline:
      "A conversion-focused storefront built for a handcrafted embroidery brand.",
    description:
      "A premium, fully responsive e-commerce platform dedicated to the art of handcrafted embroidery. Built for elegance and high conversion.",
    features: [
      "Fully responsive storefront",
      "Premium product presentation",
      "Conversion-focused layout",
    ],
    image: "/embroidery.jpg",
    category: "fullstack",
    gitUrl: "https://github.com/Fatimahnoman/The-Embroidery-Atelier",
    preview: { kind: "live", url: "https://the-embroidery-atelier.vercel.app" },
    techStack: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
    metrics: [],
  },
  {
    id: 10,
    title: "Crown Carat Ring Boutique",
    tagline:
      "A high-end ring boutique built around motion and visual polish.",
    description:
      "A luxury, premium e-commerce web platform showcasing exquisite rings, designed with a sleek user interface, smooth transitions, and high-end aesthetics.",
    features: [
      "Premium ring showcase interface",
      "Smooth transitions",
      "High-end visual aesthetic",
    ],
    image: "/crown_carat.jpg",
    category: "fullstack",
    gitUrl: "https://github.com/Fatimahnoman/Crown-Carat-Ring-Boutique",
    preview: { kind: "live", url: "https://crown-carat-ring-boutique.vercel.app/" },
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    metrics: [],
  },
];

/* ── Derived helpers ─────────────────────────────────────────────────────────
 * projectsData is a static module-level constant, so everything below is
 * computed exactly once at import time rather than re-derived on every render.
 */

export type ProjectFilter = {
  id: ProjectCategoryId;
  label: string;
  count: number;
};

/**
 * Filter order and labels. Order of this array is the order of the tabs.
 * To add a category: add the id to `ProjectCategoryId`, add it here, and set
 * `category` on the relevant projects — counts recompute automatically.
 */
const FILTER_DEFS: { id: ProjectCategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "agents", label: "AI Agents & Automation" },
  { id: "fullstack", label: "Full-Stack Apps" },
];

export const projectFilters: ProjectFilter[] = FILTER_DEFS.map((f) => ({
  ...f,
  count:
    f.id === "all"
      ? projectsData.length
      : projectsData.filter((p) => p.category === f.id).length,
}));

/** Display label for a category id, falling back to the id itself. */
export const getCategoryLabel = (id: ProjectCategoryId): string =>
  FILTER_DEFS.find((f) => f.id === id)?.label ?? id;

export const filterProjects = (category: ProjectCategoryId) =>
  category === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === category);

/**
 * Live search across title and tech stack, as specified.
 * Matching is case-insensitive and substring-based, so "next" finds "Next.js".
 */
export const searchProjects = (list: Project[], query: string): Project[] => {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(q)),
  );
};

export const isLivePreview = (project: Project) => project.preview.kind === "live";

/** URL to open in a new tab, or null when the demo is served by a modal. */
export const getLiveUrl = (project: Project): string | null =>
  project.preview.kind === "live" ? project.preview.url : null;

/** Short, honest status label for the card badge. */
export const getStatusLabel = (project: Project): string =>
  project.preview.kind === "live" ? "Live" : "Interactive Demo";

export const getPreviewLabel = (project: Project): string => {
  switch (project.preview.kind) {
    case "live":
      return "Live Demo";
    case "studies":
      return "Chat with Agent";
    default:
      return "Open Terminal";
  }
};

export const getProjectById = (id: number) =>
  projectsData.find((p) => p.id === id);