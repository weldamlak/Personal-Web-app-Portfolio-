"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Maximize2, Sparkles } from "lucide-react";

interface PhotoGalleryProps {
  galleryImages: string[];
  isDarkMode: boolean;
  setSelectedImgIndex: (index: number) => void;
}

/* ------------------------------------------------------------------ */
/*  Layout maths                                                       */
/* ------------------------------------------------------------------ */

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Layout {
  W: number;
  collage: Rect[]; // where each tile sits in the grid ("collage") state
  row: Rect[]; // where each tile sits in the horizontal showcase state
  travel: number; // total horizontal distance of the showcase
}

interface TileState {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  ry: number;
  sc: number;
  op: number;
  ix: number;
  z: number;
}

// Scroll phases (fractions of the pinned runway)
const MORPH_START = 0.06; // grid holds, then tiles start to morph
const MORPH_LEN = 0.2; // each tile's morph duration
const MORPH_STAGGER = 0.012; // wave delay between tiles
const SCROLL_START = 0.4; // horizontal travel begins
const SCROLL_END = 0.94; // horizontal travel ends (then a short hold)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Same span rules as the original grid: feature, wide, tall, trailing banner */
function spanFor(i: number, n: number, cols: number) {
  if (i === n - 1 && n % 2 !== 0 && n >= 5) return { w: cols, h: 2 };
  if (i === 0) return { w: Math.min(2, cols), h: 2 };
  if (i === 3) return { w: Math.min(2, cols), h: 1 };
  if (i === 2 || i === 6) return { w: 1, h: 2 };
  return { w: 1, h: 1 };
}

function computeLayout(W: number, H: number, n: number): Layout {
  const small = W < 640;
  const cols = W < 768 ? 3 : 4;
  const padX = small ? 16 : Math.min(48, W * 0.04);
  const gap = small ? 8 : 14;
  const top = small ? 132 : 150;
  const bottom = 44;

  // dense-pack the collage grid
  const occ: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    for (let dr = 0; dr < h; dr++)
      for (let dc = 0; dc < w; dc++) if (occ[r + dr]?.[c + dc]) return false;
    return true;
  };
  const cells: { c: number; r: number; w: number; h: number }[] = [];
  let rows = 0;
  for (let i = 0; i < n; i++) {
    const s = spanFor(i, n, cols);
    let placed = false;
    for (let r = 0; !placed; r++) {
      for (let c = 0; c + s.w <= cols; c++) {
        if (free(r, c, s.w, s.h)) {
          for (let dr = 0; dr < s.h; dr++) {
            occ[r + dr] = occ[r + dr] || [];
            for (let dc = 0; dc < s.w; dc++) occ[r + dr][c + dc] = true;
          }
          cells.push({ c, r, w: s.w, h: s.h });
          rows = Math.max(rows, r + s.h);
          placed = true;
          break;
        }
      }
    }
  }

  const areaW = Math.min(W - padX * 2, 1120);
  const areaH = H - top - bottom;
  const cellW = (areaW - gap * (cols - 1)) / cols;
  const cellH = Math.min((areaH - gap * (rows - 1)) / rows, cellW * 1.15);
  const gridW = cellW * cols + gap * (cols - 1);
  const gridH = cellH * rows + gap * (rows - 1);
  const ox = (W - gridW) / 2;
  const oy = top + (areaH - gridH) / 2;

  const collage: Rect[] = cells.map((k) => ({
    x: ox + k.c * (cellW + gap),
    y: oy + k.r * (cellH + gap),
    w: k.w * cellW + (k.w - 1) * gap,
    h: k.h * cellH + (k.h - 1) * gap,
  }));

  // horizontal showcase: one big portrait card per image, first one centered
  const rowH = Math.min(areaH * 0.92, 560);
  const rowW = Math.min(rowH * 0.78, W * 0.74);
  const rowGap = small ? 16 : 28;
  const rowY = top + (areaH - rowH) / 2;
  const startX = (W - rowW) / 2;
  const row: Rect[] = Array.from({ length: n }, (_, i) => ({
    x: startX + i * (rowW + rowGap),
    y: rowY,
    w: rowW,
    h: rowH,
  }));

  return { W, collage, row, travel: (n - 1) * (rowW + rowGap) };
}

function tileState(i: number, p: number, L: Layout): TileState {
  const start = MORPH_START + i * MORPH_STAGGER;
  const m = ease(clamp01((p - start) / MORPH_LEN));
  const tp = clamp01((p - SCROLL_START) / (SCROLL_END - SCROLL_START));
  const c = L.collage[i];
  const r = L.row[i];

  const w = lerp(c.w, r.w, m);
  const h = lerp(c.h, r.h, m);
  const x = lerp(c.x, r.x, m) - tp * L.travel;
  const y = lerp(c.y, r.y, m);

  // distance of this tile from the screen centre: -1 (left) … +1 (right)
  const d = Math.max(-1, Math.min(1, (x + w / 2 - L.W / 2) / (L.W / 2)));
  const pop = Math.sin(m * Math.PI);

  return {
    x,
    y,
    w,
    h,
    rot: pop * (i % 2 ? 7 : -7),
    ry: -d * 24 * m, // side tiles turn to face the centre
    sc: (1 + pop * 0.05) * (1 - Math.abs(d) * 0.12 * m),
    op: 1 - Math.abs(d) * 0.45 * m,
    ix: -d * 40 * m, // image parallax inside the frame
    z: Math.round((1 - Math.abs(d)) * 10),
  };
}

/* ------------------------------------------------------------------ */
/*  A single tile                                                      */
/* ------------------------------------------------------------------ */

interface TileProps {
  i: number;
  src: string;
  progress: MotionValue<number>;
  layoutMV: MotionValue<Layout | null>;
  isDarkMode: boolean;
  onOpen: () => void;
}

const Tile = memo(function Tile({ i, src, progress, layoutMV, isDarkMode, onOpen }: TileProps) {
  const st = useTransform<any, TileState | null>( // eslint-disable-line @typescript-eslint/no-explicit-any
    [progress, layoutMV] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ([p, L]: any[]) => (L ? tileState(i, p, L) : null) // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  const x = useTransform(st, (s) => s?.x ?? 0);
  const y = useTransform(st, (s) => s?.y ?? 0);
  const width = useTransform(st, (s) => s?.w ?? 0);
  const height = useTransform(st, (s) => s?.h ?? 0);
  const rotate = useTransform(st, (s) => s?.rot ?? 0);
  const rotateY = useTransform(st, (s) => s?.ry ?? 0);
  const scale = useTransform(st, (s) => s?.sc ?? 1);
  const opacity = useTransform(st, (s) => s?.op ?? 0);
  const zIndex = useTransform(st, (s) => s?.z ?? 0);
  const ix = useTransform(st, (s) => s?.ix ?? 0);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`View photo ${i + 1}`}
      style={{ x, y, width, height, rotate, rotateY, scale, opacity, zIndex }}
      className={`group absolute left-0 top-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border text-left outline-none focus-visible:ring-2 focus-visible:ring-[#41a100] shadow-2xl transition-[border-color,box-shadow] duration-300 ${
        isDarkMode
          ? "border-zinc-800/80 bg-zinc-900/60 hover:border-[#41a100]/60 hover:shadow-[0_0_20px_-5px_rgba(65,161,0,0.3)]"
          : "border-slate-200 bg-slate-100 hover:border-[#41a100]/80 shadow-slate-400/40 hover:shadow-lg hover:shadow-[#41a100]/10"
      }`}
    >
      <motion.div style={{ x: ix, scale: 1.18 }} className="absolute inset-0">
        <Image
          src={src}
          alt={`Highlight photo ${i + 1}`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 75vw, 40vw"
          loading="lazy"
        />
      </motion.div>

      {/* Hover/Focus Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-4">
        <div className="flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400 backdrop-blur-md bg-black/50 px-2 py-0.5 sm:py-1 rounded-md border border-emerald-500/30 font-medium">
            #{String(i + 1).padStart(2, "0")}
          </span>
          <div className="p-1.5 sm:p-2 rounded-full bg-[#41a100] text-white shadow-md shadow-[#41a100]/40">
            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>
      </div>
    </motion.button>
  );
});

/* ------------------------------------------------------------------ */
/*  Shared header                                                      */
/* ------------------------------------------------------------------ */

function GalleryHeader({ total, isDarkMode }: { total: number; isDarkMode: boolean }) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#41a100] animate-pulse" />
        <h2
          className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
            isDarkMode ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          Highlights & Activity
        </h2>
      </div>
      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#41a100]/10 text-[#41a100] border border-[#41a100]/20 font-semibold">
        {total} {total === 1 ? "Shot" : "Shots"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pinned scroll showcase: grid → horizontal gallery                  */
/* ------------------------------------------------------------------ */

function GalleryShowcase({ galleryImages, isDarkMode, setSelectedImgIndex }: PhotoGalleryProps) {
  const total = galleryImages.length;
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [runwayH, setRunwayH] = useState<number | null>(null);
  const layoutMV = useMotionValue<Layout | null>(null);

  // progress through the pinned runway, smoothed with a spring for silky movement
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const L = computeLayout(W, H, total);
      layoutMV.set(L);
      const span = Math.max((L.travel * 0.8) / (SCROLL_END - SCROLL_START), H * 2.2);
      setRunwayH(H + span);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [total, layoutMV]);

  return (
    <section
      className={`pt-8 sm:pt-10 border-t transition-colors duration-300 ${
        isDarkMode ? "border-zinc-800/80" : "border-slate-200"
      }`}
    >
      {/* Full-bleed scroll runway: its height is what you scroll through */}
      <div
        ref={runwayRef}
        style={{ height: runwayH ?? "400vh" }}
        className="relative w-screen ml-[calc(50%-50vw)]"
      >
        {/* Pinned stage */}
        <div
          ref={stageRef}
          style={{ perspective: 1400 }}
          className="sticky top-0 h-[100svh] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 pt-24 sm:pt-28 px-4 sm:px-6 z-20 pointer-events-none">
            <div className="max-w-5xl mx-auto">
              <GalleryHeader total={total} isDarkMode={isDarkMode} />
            </div>
          </div>

          {galleryImages.map((imgPath, index) => (
            <Tile
              key={`${imgPath}-${index}`}
              i={index}
              src={imgPath}
              progress={progress}
              layoutMV={layoutMV}
              isDarkMode={isDarkMode}
              onOpen={() => setSelectedImgIndex(index)}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion fallback: the original static grid                  */
/* ------------------------------------------------------------------ */

function StaticGrid({ galleryImages, isDarkMode, setSelectedImgIndex }: PhotoGalleryProps) {
  const total = galleryImages.length;
  return (
    <section
      className={`pt-8 sm:pt-10 border-t transition-colors duration-300 ${
        isDarkMode ? "border-zinc-800/80" : "border-slate-200"
      }`}
    >
      <GalleryHeader total={total} isDarkMode={isDarkMode} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-dense gap-2.5 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]">
        {galleryImages.map((imgPath, index) => {
          const isLast = index === total - 1;
          let spanClasses = "col-span-1 row-span-1";
          if (isLast && total % 2 !== 0 && total >= 5) {
            spanClasses = "col-span-2 sm:col-span-3 md:col-span-4 row-span-1 sm:row-span-2";
          } else if (index === 0) {
            spanClasses = "col-span-2 row-span-2";
          } else if (index === 3) {
            spanClasses = "col-span-2 row-span-1";
          } else if (index === 2 || index === 6) {
            spanClasses = "col-span-1 sm:row-span-2";
          }
          return (
            <button
              key={`${imgPath}-${index}`}
              type="button"
              onClick={() => setSelectedImgIndex(index)}
              aria-label={`View photo ${index + 1}`}
              className={`group relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border text-left outline-none focus-visible:ring-2 focus-visible:ring-[#41a100] ${spanClasses} ${
                isDarkMode ? "border-zinc-800/80 bg-zinc-900/60" : "border-slate-200 bg-slate-100"
              }`}
            >
              <Image
                src={imgPath}
                alt={`Highlight photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  galleryImages = [],
  isDarkMode,
  setSelectedImgIndex,
}) => {
  const reduceMotion = useReducedMotion();
  if (!galleryImages.length) return null;

  const props = { galleryImages, isDarkMode, setSelectedImgIndex };
  return reduceMotion ? <StaticGrid {...props} /> : <GalleryShowcase {...props} />;
};

export default memo(PhotoGallery);