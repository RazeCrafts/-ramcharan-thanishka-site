export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-[#1a0a1e] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3 text-center md:text-left md:flex-row md:justify-between md:items-start">
        <div className="flex items-center gap-2">
          <span className="text-pink-500 font-display text-sm font-bold tracking-tight">PT</span>
          <span className="font-display font-semibold text-sm text-white tracking-tighter">potato-tomato</span>
        </div>
        <div className="text-xs text-paper-200/50">
          Started July 20, 2026 &middot; Shared archive for two.
        </div>
        <div className="flex gap-6 text-xs text-paper-200/50">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/our-story" className="hover:text-white transition">Our Story</a>
          <a href="/memories" className="hover:text-white transition">Gallery</a>
          <a href="/letters" className="hover:text-white transition">Letters</a>
          <a href="/panda-roll" className="hover:text-white transition">Panda Roll</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-purple-500/20 text-center">
        <p className="text-[0.85rem] text-pink-500/70 font-display italic tracking-widest">
          LOVE U SOO MUCH My little tomatoo muahha UR gonna be with me forever its not a choice
        </p>
      </div>
    </footer>
  );
}
