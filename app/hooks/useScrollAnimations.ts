import { useEffect, type RefObject } from "react";

/**
 * Adds scroll-driven animation to every card / heading inside `rootRef`
 * WITHOUT touching their markup:
 *  - Scroll-linked 3D scrub (fly in / lean away) via CSS view() timelines
 *  - One-shot IntersectionObserver reveal as a fallback for older browsers
 *  - Desktop: 3D mouse tilt, lift and a moving shadow
 *  - Phones: press-and-hold tilt with a springy rebound
 *  - Re-scans automatically when tabs / filters render new cards
 */

const VARIANTS = ["left", "right", "up", "zoom", "flip", "up"];

// Mirror of the entry @keyframes in globals.css (used by the fallback)
const FROM: Record<string, Keyframe> = {
  up: { opacity: 0, transform: "perspective(900px) translate3d(0,80px,0) rotateX(14deg)" },
  left: { opacity: 0, transform: "perspective(900px) translate3d(-110px,0,0) rotateY(-16deg)" },
  right: { opacity: 0, transform: "perspective(900px) translate3d(110px,0,0) rotateY(16deg)" },
  zoom: { opacity: 0, transform: "perspective(900px) translateZ(-140px) scale(0.86)" },
  flip: { opacity: 0, transform: "perspective(900px) translate3d(0,50px,0) rotateX(-55deg)" },
  heading: { opacity: 0, transform: "translate3d(-60px,0,0)" },
};

export function useScrollAnimations(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const supportsScrub =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    let counter = 0;

    /* ---------- fallback reveal ---------- */
    const io = supportsScrub
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              io?.unobserve(el);
              el.removeAttribute("data-sr-pending");
              el.animate([FROM[el.dataset.sr || "up"]], {
                duration: 900,
                delay: Number(el.dataset.srDelay || 0),
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "backwards",
              });
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        );

    const mark = (el: HTMLElement, variant: string, card: boolean) => {
      el.dataset.sr = variant;
      if (card) el.dataset.srCard = "";
      if (io) {
        el.dataset.srDelay = String((counter % 3) * 70);
        el.dataset.srPending = "";
        io.observe(el);
      }
    };

    /* ---------- scan for cards & headings ---------- */
    const scan = () => {
      root
        .querySelectorAll<HTMLElement>("h2, div.border, article.border, form.border")
        .forEach((el) => {
          if (el.dataset.sr) return;

          if (el.tagName === "H2") {
            if (el.closest("[data-sr-card]")) return;
            mark(el, "heading", false);
            return;
          }

          const c = el.classList;
          const isCard =
            c.contains("rounded-lg") || c.contains("rounded-xl") || c.contains("rounded-2xl");
          if (!isCard || el.offsetHeight < 56) return;
          if (el.parentElement?.closest("[data-sr-card]")) return; // no nested cards

          mark(el, VARIANTS[counter++ % VARIANTS.length], true);
        });
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };
    scan();
    const mo = new MutationObserver(schedule);
    mo.observe(root, { childList: true, subtree: true });

    /* ---------- 3D tilt + shadow (mouse) / press-tilt (touch) ---------- */
    const timers = new Map<HTMLElement, number>();
    let active: HTMLElement | null = null;

    const tilt = (card: HTMLElement, px: number, py: number, touch: boolean) => {
      const r = card.getBoundingClientRect();
      if (r.width > 700 || r.height > 600) return;
      if (getComputedStyle(card).position === "sticky") return;
      if (!card.dataset.srTilting && card.style.transform) return; // owned by framer-motion

      const max = touch ? 16 : 12;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      const lift = touch ? 0 : 8;
      const scale = touch ? 0.98 : 1.025;

      window.clearTimeout(timers.get(card));
      card.dataset.srTilting = "1";
      card.style.transition = "transform 140ms ease-out, box-shadow 140ms ease-out";
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0,${-lift}px,0) scale(${scale})`;
      card.style.boxShadow = `${(0.5 - px) * 40}px ${28 + (0.5 - py) * -24}px 52px -16px rgba(0,0,0,0.55), 0 0 0 1px var(--accent-glow)`;
    };

    const release = (card: HTMLElement | null) => {
      if (!card || !card.dataset.srTilting) return;
      delete card.dataset.srTilting;
      card.style.transition =
        "transform 650ms cubic-bezier(0.2, 0.9, 0.25, 1.25), box-shadow 650ms ease";
      card.style.transform = "";
      card.style.boxShadow = "";
      timers.set(
        card,
        window.setTimeout(() => {
          card.style.transition = "";
        }, 680)
      );
    };

    const point = (card: HTMLElement, e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] as const;
    };

    const cardOf = (e: Event) =>
      (e.target as HTMLElement).closest<HTMLElement>("[data-sr-card]");

    const onMove = (e: PointerEvent) => {
      const card = cardOf(e);
      if (e.pointerType === "mouse") {
        if (active && active !== card) release(active);
        active = card;
        if (card) tilt(card, ...point(card, e), false);
      } else if (active && e.pointerType === "touch") {
        tilt(active, ...point(active, e), true);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const card = cardOf(e);
      if (!card) return;
      active = card;
      tilt(card, ...point(card, e), true);
    };

    const onUp = () => {
      release(active);
      active = null;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerleave", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      mo.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onUp);
    };
  }, [rootRef]);
}

