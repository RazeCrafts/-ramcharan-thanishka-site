import { storage } from "@/lib/storage";

const MILESTONES: { date: string; title: string; description: string }[] = [
  {
    date: "2026-07-20",
    title: "The day we started dating",
    description: "July 20, 2026 — where our story began.",
  },
  {
    date: "2026-08-04",
    title: "Our first kiss",
    description: "August 4, 2026 — a moment we'll never forget.",
  },
  {
    date: "2026-10-20",
    title: "Three months together",
    description: "October 20, 2026 — a quarter of a year.",
  },
  {
    date: "2027-01-20",
    title: "Six months together",
    description: "January 20, 2027 — half a year.",
  },
  {
    date: "2027-07-20",
    title: "One year together",
    description: "July 20, 2027 — a full year together.",
  },
];

export default async function OurStory() {
  const milestones = await storage.listMilestones();

  return (
    <div className="min-h-[90vh] bg-ink-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Our story</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 tracking-tight leading-tight">
            A timeline of us
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            The dates that matter, preserved in order. Past milestones are marked complete;
            what's still ahead waits gently in the future.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-white/10" />

          {milestones.map((m, idx) => {
            const isPast = m.order <= 3;
            const isFirst = idx === 0;
            const isLast = idx === milestones.length - 1;

            const markerCls = isPast
              ? "w-3 h-3 rounded-full border-2 border-white bg-burgundy-500 group-hover:scale-110 transition"
              : "w-3 h-3 rounded-full border-2 border-white/30 bg-white/10 group-hover:scale-110 transition";
            const statusCls = isPast
              ? "inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wider border bg-burgundy-500/10 border-burgundy-500/30 text-burgundy-400"
              : "inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wider border bg-white/5 border-white/10 text-gray-500";
            const textCls = isPast ? "text-burgundy-400" : "text-gray-500";

            return (
              <div key={m.id} className="relative mb-24 group flex items-start">
                <div className="ml-1">
                  {!isFirst && (
                    <div className="w-px h-[calc(100%-4rem)] bg-white/10" />
                  )}
                  <div className={markerCls} />
                  {!isLast && (
                    <div className="w-px h-[calc(100%-4rem)] bg-white/10" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <time className={`block text-xs font-mono font-bold mb-1.5 tracking-wider uppercase ${textCls}`}>
                    {new Date(m.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                  </time>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                  <span className={statusCls}>
                    {isPast ? "Remembered" : "Upcoming"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Original milestone dates are protected and cannot be changed.
          </p>
          <p className="text-sm text-gray-400">Custom milestones can be added by either of us.</p>
        </div>
      </div>
    </div>
  );
}
