"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Box } from "@mui/material";

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function FadeInOnScroll({
  children,
  delay = 0,
  direction = "up",
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!visible) {
      if (direction === "up") return "translateY(30px)";
      if (direction === "left") return "translateX(-30px)";
      if (direction === "right") return "translateX(30px)";
    }
    return "none";
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}
