import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
          Error 404 / Signal Lost
        </p>

        <h1 className="text-7xl sm:text-8xl font-display font-extrabold tracking-tight mb-6">
          <span className="text-gold-gradient">
            404
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The route you requested doesn&apos;t exist in this network. All agents are online — but this page went offline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-gold text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/#project"
            className="btn-ghost text-sm"
          >
            Explore My Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
