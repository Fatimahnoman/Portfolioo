import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#070512] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-400 mb-6">
          Error 404 / Signal Lost
        </p>

        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400">
            404
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The route you requested doesn&apos;t exist in this network. All agents are online — but this page went offline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-fuchsia-500 hover:to-violet-600 hover:scale-[1.02] transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/#project"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm font-semibold hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-300"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
