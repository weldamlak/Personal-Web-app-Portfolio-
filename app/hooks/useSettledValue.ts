import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Returns `value`, but frozen while the user is mid-pull (pull > 0).
 * It updates once the pull has settled back to 0. This keeps the footer colour
 * and the indicator label from jumping to the *next* page's values while the
 * old page is still animating out.
 */
export function useSettledValue<T>(value: T, pull: MotionValue<number>): T {
  const [settled, setSettled] = useState(value);
  const latest = useRef(value);
  latest.current = value;

  useEffect(() => {
    if (pull.get() < 0.01) setSettled(value);
  }, [value, pull]);

  useMotionValueEvent(pull, "change", (v) => {
    if (v < 0.01) setSettled(latest.current);
  });

  return settled;
}