"use client";

import { useEffect, useState } from "react";

function getScrollY() {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.scrollY;
}

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(() => getScrollY());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY;
}
