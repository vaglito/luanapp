"use client";

import { useState, useMemo } from "react";
import { CreateProformaItem } from "../types/proforma-create.type";
import { axiosAuth } from "../lib/axios";
import { CreateProformaPayload } from "../types/proforma-create.type";

export function useCreateProforma() {
  const [items, setItems] = useState<CreateProformaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = (item: CreateProformaItem) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (index: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity,
              total: quantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.total, 0),
    [items]
  );

  const createProforma = async (payload: CreateProformaPayload) => {
    setLoading(true);

    try {
      const res = await axiosAuth.post("proformas/proforma/", payload);
      return res.data;
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
    createProforma,
    loading,
  };
}
