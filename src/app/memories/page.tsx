"use client";

import { useState } from "react";
import Image from "next/image";

const DEFAULT_IMAGES: {
  id: string;
  src: string;
  caption: string;
  date: string;
  type: "photo" | "video";
}[] = [
  { id: "img-20260118-a", src: "/assets/20260118_171232.jpg", caption: "A quiet start to the year.", date: "January 18, 2026", type: "photo" },
  { id: "img-20260118-b", src: "/assets/20260118_171232(0).jpg", caption: "January 18, 2026 — another angle.", date: "January 18, 2026", type: "photo" },
  { id: "img-20260118-c", src: "/assets/20260118_175223.jpg", caption: "January 18, 2026.", date: "January 18, 2026", type: "photo" },
  { id: "img-20260226", src: "/assets/IMG_20260226_223416_276.jpg", caption: "Late February evening.", date: "February 26, 2026", type: "photo" },
  { id: "img-n", src: "/assets/N.jpg", caption: "N.", date: "Undated", type: "photo" },
  { id: "img-20260819-wa", src: "/assets/IMG-20260819-WA0005.jpg", caption: "August 19, 2026.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-evening", src: "/assets/20260819_174906.jpg", caption: "August 19, 2026 — evening.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-a", src: "/assets/20260819_191050.jpg", caption: "The day everything changed.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-b", src: "/assets/20260819_192806.jpg", caption: "August 19, 2026.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-c", src: "/assets/20260819_192821.jpg", caption: "Still August 19.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-d", src: "/assets/20260819_195004.jpg", caption: "The same day, later on.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260819-e", src: "/assets/20260819_195021.jpg", caption: "Late into August 19.", date: "August 19, 2026", type: "photo" },
  { id: "img-20260825", src: "/assets/20260825_155359.jpg", caption: "August 25, 2026.", date: "August 25, 2026", type: "photo" },
  { id: "img-20260902", src: "/assets/20260902_170240.jpg", caption: "September 2, 2026.", date: "September 2, 2026", type: "photo" },
  { id: "img-20260904-a", src: "/assets/20260904_145746.jpg", caption: "September 4, 2026.", date: "September 4, 2026", type: "photo" },
  { id: "img-20260904-b", src: "/assets/20260904_145756.jpg", caption: "Minutes later, September 4.", date: "September 4, 2026", type: "photo" },
  { id: "img-20260904-wa-a", src: "/assets/IMG-20260904-WA0024.jpg", caption: "September 4, 2026.", date: "September 4, 2026", type: "photo" },
  { id: "img-20260904-wa-b", src: "/assets/IMG-20260904-WA0034.jpg", caption: "Still September 4.", date: "September 4, 2026", type: "photo" },
  { id: "img-20260908-a", src: "/assets/20260908_163419.jpg", caption: "September 8, 2026.", date: "September 8, 2026", type: "photo" },
  { id: "img-20260908-b", src: "/assets/20260908_163446.jpg", caption: "September 8, 2026.", date: "September 8, 2026", type: "photo" },
  { id: "img-20260908-c", src: "/assets/20260908_163728.jpg", caption: "Minutes later, September 8.", date: "September 8, 2026", type: "photo" },
  { id: "img-20260912", src: "/assets/20260912_140053.jpg", caption: "September 12, 2026.", date: "September 12, 2026", type: "photo" },
  { id: "img-20260923", src: "/assets/20260923_133733.jpg", caption: "September 23, 2026.", date: "September 23, 2026", type: "photo" },
  { id: "img-20261026", src: "/assets/20261026_141302.jpg", caption: "October 26, 2026.", date: "October 26, 2026", type: "photo" },
  { id: "img-poster-1", src: "/assets/poster1.jpg", caption: "Poster one.", date: "Undated", type: "photo" },
  { id: "img-poster-2", src: "/assets/poster2.jpg", caption: "Poster two.", date: "Undated", type: "photo" },
  { id: "img-oct30-1", src: "/assets/IMG_20261030_114305_606.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-2", src: "/assets/IMG_20261030_114507_334.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-3", src: "/assets/IMG_20261030_114745_011.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-4", src: "/assets/IMG_20261030_115001_597.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-5", src: "/assets/IMG_20261030_115031_147.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-6", src: "/assets/IMG_20261030_115047_362.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-7", src: "/assets/IMG_20261030_115125_391.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-8", src: "/assets/IMG_20261030_115329_170.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-9", src: "/assets/IMG_20261030_115451_669.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
  { id: "img-oct30-10", src: "/assets/IMG_20261030_115501_717.webp", caption: "October 30, 2026.", date: "October 30, 2026", type: "photo" },
];

interface Frame {
  src: string;
  caption: string;
  date: string;
  type: "photo" | "video";
}

export default function Memories() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Frame | null>(null);

  return (
    <div className="min-h-[90vh] bg-ink-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
              Memories
            </h1>
            <p className="text-gray-400 text-sm">
              A fixed set of our photographs and videos. New pictures are added
              by editing code, not through an upload form — ask me to add more
              and I'll drop them into the default set.
            </p>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DEFAULT_IMAGES.map((image) => (
            <div
              key={image.id}
              className={`
                relative rounded-xl overflow-hidden border border-white/5 bg-white/5 cursor-pointer
                ${image.type === "video" ? "h-72 md:h-96" : "h-60 md:h-72"}
              `}
              onClick={() => {
                setCurrent(image);
                setOpen(true);
              }}
            >
              {image.type === "video" ? (
                <video
                  src={image.src}
                  poster={image.src}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                  preload="metadata"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-cover object-center hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={image.id === DEFAULT_IMAGES[0]?.id}
                  loading={image.id === DEFAULT_IMAGES[0]?.id ? "eager" : "lazy"}
                />
              )}
              <div className="absolute bottom-3 left-3 right-3 p-3">
                <p className="text-xs font-mono font-bold text-white/90 truncate">
                  {image.date}
                </p>
                <p className="text-xs text-gray-400 truncate mt-1">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => {
            setOpen(false);
            setCurrent(null);
          }}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setOpen(false);
                setCurrent(null);
              }}
              className="absolute top-4 right-4 z-10 text-white text-xl hover:text-gray-300"
            >
              ✕
            </button>
            {current.type === "video" ? (
              <video
                src={current.src}
                controls
                autoPlay
                className="w-full max-h-[70vh] rounded-xl border border-white/10 object-contain"
              />
            ) : (
              <Image
                src={current.src}
                alt={current.caption}
                className="w-full max-h-[70vh] rounded-xl border border-white/10 object-contain"
                sizes="90vw"
              />
            )}
            <div className="mt-6 text-center">
              <p className="text-xs font-mono text-gray-400 mb-1">{current.date}</p>
              <p className="text-white text-sm font-medium">{current.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
