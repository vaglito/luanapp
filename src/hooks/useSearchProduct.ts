"use client";

import { useEffect, useState } from "react";
import { Products } from "../types/products.type";

export function useProductSearch(query: string) {
  const [results, setResults] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        if ((err as any).name !== "CanceledError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  // Derived instead of eagerly cleared via setState-in-effect: a too-short
  // query always means "no results", regardless of stale fetched state.
  const effectiveResults = !query || query.length < 2 ? [] : results;

  return { results: effectiveResults, loading };
}
