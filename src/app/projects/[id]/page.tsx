import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  getCategoryLabel,
  getLiveUrl,
  getProjectById,
  getStatusLabel,
  projectsData,
} from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) return { title: "Case Study Not Found | Fatimah Noman" };

  return {
    title: `${project.title} – Case Study | Fatimah Noman`,
    description: project.description,
    openGraph: {
      title: `${project.title} – Fatimah Noman`,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} – Fatimah Noman`,
      description: project.description,
      images: [project.image],
    },
  };
}

const hostOf = (url?: string | null): string | null => {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const ProjectCaseStudy = async ({ params }: PageProps) => {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) notFound();

  const index = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = projectsData[(index - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(index + 1) % projectsData.length];
  const liveDemoHref = getLiveUrl(project);
  const hasLiveDemo = liveDemoHref !== null;
  const previewHost = hostOf(liveDemoHref ?? project.gitUrl) ?? "project";
  const caseNumber = String(index + 1).padStart(2, "0");
  let sectionNo = 1;
  const nextSection = () => String(sectionNo++).padStart(2, "0");
  const stackNo = nextSection();
  const problemNo = project.problem ? nextSection() : null;
  const featuresNo = project.features.length > 0 ? nextSection() : null;
  const exploreNo = nextSection();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07090e] text-white">
      {/* ── Ambient obsidian background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-gold-deep/[0.06] blur-[150px]" />
        <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-gold-deep/[0.08] blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[320px] w-[480px] rounded-full bg-gold/[0.05] blur-[150px]" />
      </div>

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090e]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight transition-colors hover:text-gold-light"
          >
            Fatimah
            <span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
              Noman
            </span>
          </Link>
          <span aria-hidden="true" className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600 md:inline">
            ~/projects/{project.id}
          </span>
          <Link
            href="/#project"
            className="group flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 transition-all duration-300 hover:border-gold/40 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            All Projects
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* ── Hero ── */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="text-gold-light">Case_Study // {caseNumber}</span>
            <span aria-hidden="true" className="h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
            <span className="text-gold/90">{getCategoryLabel(project.category)}</span>
          </div>

          <h1
            className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-transparent sm:text-5xl md:text-6xl"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #dbe4f0 38%, #8a94a8 78%, #3d4657 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            {project.title}
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg">
            {project.description}
          </p>

          {/* meta strip */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
            {[
              { label: "Category", value: getCategoryLabel(project.category) },
              { label: "Status", value: getStatusLabel(project) },
              { label: "Stack", value: `${project.techStack.length} Technologies` },
              { label: "Repo", value: hostOf(project.gitUrl) ?? "github.com" },
            ].map((cell) => (
              <div key={cell.label} className="bg-[#0a0d13] px-4 py-4 sm:px-5">
                <dt className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-gray-600">
                  {cell.label}
                </dt>
                <dd className="truncate font-mono text-[10px] uppercase tracking-wider text-gray-200 sm:text-[11px]">
                  {cell.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Preview — browser window frame ── */}
        <div className="group relative mb-12 sm:mb-14">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-gold-deep/10 via-transparent to-gold-deep/10 blur-2xl transition-opacity duration-700"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0d13] shadow-[0_40px_120px_-40px_rgba(139,92,246,0.4)]">
            {/* chrome bar */}
            <div className="flex h-10 items-center gap-3 border-b border-white/[0.06] bg-black/60 px-4">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-center font-mono text-[9px] tracking-wide text-white/55">
                {previewHost}
              </span>
              <span className="w-10" />
            </div>
            <div className="relative aspect-[16/9] bg-[#07070f]">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-contain p-4 sm:p-6"
                priority
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-deep/[0.05] via-transparent to-gold-deep/[0.07]"
              />
            </div>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <section className="mb-12 sm:mb-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
              {stackNo} /
            </span>
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
              <Layers className="h-5 w-5 text-gold" aria-hidden="true" />
              Tech Stack
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
            {project.techStack.map((tech, i) => (
              <li
                key={`${tech}-${i}`}
                className={`rounded-xl border px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 sm:text-[11px] ${
                  i % 2 === 0
                    ? "border-gold/15 bg-gold/[0.05] text-gold-light hover:border-gold/35"
                    : "border-gold/20 bg-gold/[0.06] text-gold-light hover:border-gold/40"
                }`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Problem callout (only when written) ── */}
        {project.problem && (
          <section className="mb-12 border-l-2 border-gold/50 pl-5 sm:mb-14">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
                {problemNo} /
              </span>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Problem Statement</h2>
            </div>
            <p className="max-w-3xl leading-relaxed text-gray-300">{project.problem}</p>
          </section>
        )}

        {/* ── Key Features (only when present) ── */}
        {project.features.length > 0 && (
          <section className="mb-12 sm:mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
                {featuresNo} /
              </span>
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                <Sparkles className="h-5 w-5 text-gold-light" aria-hidden="true" />
                Key Features
              </h2>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors duration-200 hover:border-gold/30"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Explore ── */}
        <section className="mb-14 sm:mb-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
              {exploreNo} /
            </span>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Explore Project</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {hasLiveDemo ? (
              <a
                href={liveDemoHref ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-deep to-gold px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-gold/25 transition-all duration-300 hover:from-gold hover:to-gold-deep hover:shadow-gold/25"
              >
                View Live Demo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-7 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Interactive AI demo on the main portfolio
              </span>
            )}

            <a
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gray-200 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold-light"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              Source Code
            </a>
          </div>
        </section>

        {/* ── Prev / Next ── */}
        <nav
          aria-label="More projects"
          className="grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${prevProject.id}`}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.04] sm:p-6"
          >
            <span className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 transition-colors group-hover:text-gold">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
              Prev_Project // {String((index - 1 + projectsData.length) % projectsData.length + 1).padStart(2, "0")}
            </span>
            <span className="block font-bold text-gray-300 transition-colors duration-300 group-hover:text-white">
              {prevProject.title}
            </span>
          </Link>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-right transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.04] sm:p-6"
          >
            <span className="mb-3 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 transition-colors group-hover:text-gold-light">
              Next_Project // {String((index + 1) % projectsData.length + 1).padStart(2, "0")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
            </span>
            <span className="block font-bold text-gray-300 transition-colors duration-300 group-hover:text-white">
              {nextProject.title}
            </span>
          </Link>
        </nav>

        {/* ── Contact strip ── */}
        <section className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-gold/[0.09] via-[#141312] to-gold-deep/[0.07] p-8 text-center sm:mt-16 sm:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          />
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-emerald-400/90">
            Open_To_Work
          </p>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Like what you see?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-gray-400 sm:text-base">
            Let&apos;s build something great together — I&apos;m open for opportunities.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-deep to-gold px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-gold/25 transition-all duration-300 hover:from-gold hover:to-gold-deep"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-700">
          © {new Date().getFullYear()} Fatimah Noman — Founder of SFlyra Labs
        </p>
      </footer>
    </div>
  );
};

export default ProjectCaseStudy;
