// hooks/useCreateProforma.ts
"use client";

import { useState, useMemo } from "react";
import { CreateProformaItem, CreateProformaPayload } from "../types/proforma-create.type";

export function useCreateProforma() {
  const [items, setItems] = useState<CreateProformaItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ... (addItem, updateItem, removeItem, resetProforma se mantienen igual)
  const addItem = (item: CreateProformaItem) => setItems((prev) => [...prev, item]);
  const updateItem = (index: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity, total: quantity * item.unitPrice } : item
      )
    );
  };
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const resetProforma = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.total, 0), [items]);

  // 🚀 Función modificada para usar Fetch al Route Handler
  const createProforma = async (payload: CreateProformaPayload) => {
    setLoading(true);
    try {
      const res = await fetch("/api/proformas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al crear la proforma");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    subtotal,
    resetProforma,
    createProforma,
    loading,
  };
}