"use client";

import { useEffect, useState } from "react";
import { Products } from "../types/products.type";
import { axiosAuth } from "../lib/axios";
import { fetchProductSearchList } from "../services/products";

export function useProductSearch(query: string) {
  const [results, setResults] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axiosAuth.get("products/products/search/", {
            params: {search: query},
            signal: controller.signal
        });

        setResults(res.data.results);
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

  return { results, loading };
}
