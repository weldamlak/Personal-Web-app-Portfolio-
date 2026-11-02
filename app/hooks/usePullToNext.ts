import { useEffect, useRef } from "react";
import { animate, type MotionValue } from "framer-motion";

const DWELL_MS = 350; // must rest at the bottom this long (ignores scroll momentum)
const COOLDOWN_MS = 1400; // ignore input right after a page change
const WHEEL_RANGE = 650; // wheel distance needed to fill the pull
const TOUCH_RANGE = 170; // finger distance (px) needed to fill the pull

interface Options {
  enabled: boolean;
  pull: MotionValue<number>; // 0 → 1 while the user keeps scrolling past the bottom
  onAdvance: () => void;
  resetKey: string; // changes with every page
  effort?: number; // 1 = normal pull, higher = a longer pull is needed
}

/**
 * When the user is at the very bottom of a page and keeps scrolling,
 * `pull` fills from 0 to 1. At 1 we call `onAdvance` (go to the next page).
 */
export function usePullToNext({ enabled, pull, onAdvance, resetKey, effort = 1 }: Options) {
  const advanceRef = useRef(onAdvance);
  const lastAdvance = useRef(0);

  useEffect(() => {
    advanceRef.current = onAdvance;
  });

  useEffect(() => {
    if (!enabled) return;

    let bottomSince = 0;
    let decay: number | undefined;
    let origin: number | null = null;
    let controls: ReturnType<typeof animate> | undefined;

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const cooling = () => performance.now() - lastAdvance.current < COOLDOWN_MS;

    const settle = () => {
      controls?.stop();
      controls = animate(pull, 0, { type: "spring", stiffness: 220, damping: 28 });
    };

    const fire = () => {
      lastAdvance.current = performance.now();
      window.clearTimeout(decay);
      controls?.stop();
      controls = animate(pull, 1, { duration: 0.18 });
      advanceRef.current();
    };

    /** returns true when the pull completed */
    const bump = (next: number) => {
      controls?.stop();
      const n = Math.min(1, Math.max(0, next));
      pull.set(n);
      if (n >= 1) {
        fire();
        return true;
      }
      return false;
    };

    const track = () => {
      if (atBottom()) {
        if (!bottomSince) bottomSince = performance.now();
      } else {
        bottomSince = 0;
        if (pull.get() > 0 && !cooling()) settle();
      }
    };

    /* ---------- mouse wheel / trackpad ---------- */
    const onWheel = (e: WheelEvent) => {
      if (cooling()) return;
      if (e.deltaY < 0) {
        if (pull.get() > 0) settle();
        return;
      }
      if (!atBottom() || !bottomSince) return;
      if (performance.now() - bottomSince < DWELL_MS) return;

      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      if (bump(pull.get() + dy / (WHEEL_RANGE * effort))) return;

      window.clearTimeout(decay);
      decay = window.setTimeout(settle, 260);
    };

    /* ---------- touch ---------- */
    const onTouchStart = () => {
      origin = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (cooling()) return;
      const y = e.touches[0].clientY;
      if (!atBottom()) {
        origin = null;
        return;
      }
      if (origin === null) {
        origin = y; // the pull starts where the finger was when the bottom was reached
        return;
      }
      const dy = origin - y;
      if (dy <= 0) {
        if (pull.get() > 0) pull.set(0);
        return;
      }
      bump(dy / (TOUCH_RANGE * effort));
    };
    const onTouchEnd = () => {
      origin = null;
      if (!cooling() && pull.get() < 1) settle();
    };

    track();
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.clearTimeout(decay);
      controls?.stop();
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [enabled, pull, resetKey, effort]);
}