import Link from "next/link";
import Image from "next/image";
import RelationshipCounter from "@/components/counter";

const AREAS = [
  {
    title: "Our Story",
    description: "The milestones that define us — from the day we started dating to the years ahead.",
    href: "/our-story",
    color: "text-a63d4f",
  },
  {
    title: "Memories",
    description: "A gallery of our favorite photographs, each one saved with love.",
    href: "/memories",
    color: "text-8b5cf6",
  },
  {
    title: "Letters",
    description: "Notes and letters written for each other, saved and re-readable.",
    href: "/letters",
    color: "text-fb7185",
  },
  {
    title: "Panda Roll",
    description: "A little endless-runner game starring a rolling panda. Playful, original, ours.",
    href: "/panda-roll",
    color: "text-fce7f3",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#1a0a1e] text-white overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 25%, rgba(114, 33, 47, 0.35), transparent 50%),
            radial-gradient(circle at 80% 75%, rgba(139, 61, 246, 0.25), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.15), transparent 60%)
          `
        }}
      />

      <section className="relative flex flex-col h-screen md:h-screen justify-center items-center px-6 text-center snap-start">
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <div className="w-16 h-16 rounded-full bg-burgundy-500 border-2 border-white/30 flex items-center justify-center text-3xl animate-bounce">
              🍅🥔🐼
            </div>
            <h2 className="font-display text-[2rem] md:text-[3rem] font-bold text-white tracking-tighter mb-2">
              Ramcharan &amp; Thanishka
            </h2>
          </div>

          <h1 className="font-display text-[3rem] md:text-[6rem] font-bold text-white leading-[1.02] tracking-tighter mb-6 text-balance animate-fadeIn">
            One story.<br />
            Two people.<br />
            Countless little moments.
          </h1>

          <div className="mt-8">
            <Image
              src="/assets/IMG_20261030_115125_391.webp"
              alt="Ramcharan & Thanishka"
              width={400}
              height={500}
              className="w-64 md:w-80 h-80 md:h-100 rounded-2xl object-cover border-4 border-burgundy-500 shadow-lg shadow-burgundy-500/30 animate-bounce2"
              priority
              loading="eager"
            />
          </div>

          <RelationshipCounter />

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-ink-900 font-semibold rounded-full hover:bg-a63d4f hover:text-white transition-all"
            >
              Start at the beginning
            </Link>
            <Link
              href="/memories"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Explore the gallery
            </Link>
          </div>

          <div className="mt-12 flex items-end justify-center gap-2 text-xs text-purple-400/70">
            <span className="px-3 py-1 rounded-full border border-purple-400/30 bg-purple-400/10">
              Started July 20, 2026
            </span>
          </div>
        </div>
      </section>

      <section className="relative px-6 pt-20 pb-24 snap-start">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative min-h-[360px] md:min-h-[480px] rounded-[2rem] overflow-hidden glass shadow-soft border border-burgundy-500/30">
              <Image
                src="/assets/IMG_20261030_115125_391.webp"
                alt="Featured memory"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                loading="eager"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur rounded-xl border border-white/10">
                <p className="text-sm font-medium text-white">August 19, 2026</p>
                <p className="text-xs text-gray-400 mt-1">The day everything changed.</p>
              </div>
            </div>
            <div className="text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                A place for everything we keep
              </h2>
              <p className="text-paper-200 text-lg leading-relaxed mb-6">
                This site holds our photographs, our videos, the letters we write,
                the timeline of our milestones, and a small game we built for fun.
                It's a shared archive — anyone with the link can open it.
              </p>
              <ul className="space-y-3">
                {AREAS.map((a) => (
                  <li key={a.href} className="flex items-start gap-3">
                    <span className={`mt-1.5 ${a.color}`}>›</span>
                    <div>
                      <p className="font-semibold text-white">{a.title}</p>
                      <p className="text-sm text-paper-200/70">{a.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
