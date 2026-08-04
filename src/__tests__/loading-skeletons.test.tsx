import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MarcasLoading from "@/app/(site)/marcas/loading";
import ProductosLoading from "@/app/(site)/productos/loading";

describe("Loading skeletons", () => {
  it("Marcas loading renders skeleton content", () => {
    render(<MarcasLoading />);
    // BrandListSkeleton renders 12 items with Grid2 layout.
    // The generic role="status" is not on individual Skeleton elements,
    // but we can verify the container renders by checking for Skeleton presence
    // via document queries.
    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("Productos loading renders skeleton content", () => {
    render(<ProductosLoading />);
    // ProductListSkeleton + FiltersSkeleton produce multiple MUI Skeletons
    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
