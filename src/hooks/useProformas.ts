"use client";

import { useEffect, useState, useRef } from "react";
import { Proforma } from "@/types/proformas.type";
import {
  searchProformaByCode,
} from "@/services/dashboard/seller/proformas";

export function useProformas(proformas: Proforma[]) {
  const [hproformas, setHproformas] = useState<Proforma[]>(proformas);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // ✅ LOAD INITIAL LIST

  // 🔍 SEARCH
  const search = async () => {
    if (!searchValue.trim()) return;

    try {
      setLoading(true);
      setNotFound(false);
      setIsSearching(true);

      const result = await searchProformaByCode(searchValue.trim());
      if (!mountedRef.current) return;
      setHproformas([result]); // búsqueda exacta
    } catch {
      if (!mountedRef.current) return;
      setHproformas([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 RESET
  const reset = async () => {
    setSearchValue("");
    setIsSearching(false);
    setNotFound(false);
  };

  return {
    hproformas,
    searchValue,
    setSearchValue,
    search,
    reset,
    loading,
    notFound,
    isSearching,
  };
}

