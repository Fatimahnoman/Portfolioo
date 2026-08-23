import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsData, getProjectById, isTerminalPreview } from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) return {};

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

const ProjectCaseStudy = async ({ params }: PageProps) => {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) notFound();

  const index = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = projectsData[(index - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(index + 1) % projectsData.length];
  const hasLiveDemo = !isTerminalPreview(project.previewUrl);

  return (
    <div className="min-h-screen bg-[#070512] text-white">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-50 bg-[#0b0817]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold tracking-tight hover:text-violet-300 transition-colors">
            Fatimah<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Noman</span>
          </Link>
          <Link
            href="/#project"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-gray-300 text-xs font-mono uppercase tracking-wider hover:border-violet-500/40 hover:text-white transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Projects
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        {/* ── Header ── */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-400">
              {project.tag.join(" / ")}
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-violet-500/50 to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.06] tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* ── Preview ── */}
        <div className="relative group rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0919] shadow-2xl shadow-violet-500/5 mb-12 sm:mb-16">
          <div className="relative aspect-[16/9] flex items-center justify-center p-6 sm:p-10">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
        </div>

        {/* ── Tech Stack ── */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">01 /</span>
            <h2 className="text-xl sm:text-2xl font-bold">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.techStack.map((tech, i) => (
              <div
                key={i}
                className={`px-4 py-3.5 rounded-xl border text-sm font-medium ${
                  i % 2 === 0
                    ? "bg-violet-500/[0.07] text-violet-200 border-violet-500/15"
                    : "bg-fuchsia-500/[0.07] text-fuchsia-200 border-fuchsia-500/15"
                }`}
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ── Explore ── */}
        <section className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">02 /</span>
            <h2 className="text-xl sm:text-2xl font-bold">Explore Project</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {hasLiveDemo ? (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-fuchsia-500 hover:to-violet-600 hover:scale-[1.02] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                View Live Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Interactive terminal demo available on the main portfolio
              </span>
            )}

            <a
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-200 text-sm font-semibold hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.693.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              Source Code
            </a>
          </div>
        </section>

        {/* ── Prev / Next ── */}
        <nav aria-label="More projects" className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.06] pt-10">
          <Link
            href={`/projects/${prevProject.id}`}
            className="group p-5 rounded-2xl bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-2">
              <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Previous
            </span>
            <span className="block font-bold text-gray-300 group-hover:text-violet-300 transition-colors">
              {prevProject.title}
            </span>
          </Link>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group p-5 rounded-2xl bg-[#120e20] border border-white/[0.06] hover:border-fuchsia-500/30 transition-all duration-300 sm:text-right"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-2">
              Next
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <span className="block font-bold text-gray-300 group-hover:text-fuchsia-300 transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </nav>

        {/* ── Contact strip ── */}
        <section className="mt-14 sm:mt-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-violet-500/[0.08] via-[#120e20] to-fuchsia-500/[0.08] border border-white/[0.06] text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Like what you see?
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
            Let&apos;s build something great together — I&apos;m open for opportunities.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-fuchsia-500 hover:to-violet-600 hover:scale-[1.02] transition-all duration-300"
          >
            Get In Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-gray-600 text-xs font-mono">
          © {new Date().getFullYear()} Fatimah Noman — Built with Next.js &amp; Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default ProjectCaseStudy;
