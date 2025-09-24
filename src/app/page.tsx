import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
      >
        {/* Multiple sources to improve compatibility. You may replace these with your own asset in public/earth.mp4 for full control. */}
        <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/1080p.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/720p.mp4" type="video/mp4" />
      </video>

      {/* Three.js animated background over the image but behind content */}
      <AnimatedBackground />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">Kaalnetra Flora Atlas</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg">
          Explore real-time flowering and plant phenology across the globe. Discover what blooms where, when, and why —
          powered by interactive maps and rich environmental context.
        </p>
        <div className="flex gap-4">
          <Link
            href="/map"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
