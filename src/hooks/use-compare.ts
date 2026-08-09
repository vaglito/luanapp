import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types/products.type";

interface CompareStore {
  items: Products[];
  addItem: (product: Products) => void;
  removeItem: (id: number) => void;
  isCompared: (id: number) => boolean;
  toggleItem: (product: Products) => void;
  clearAll: () => void;
}

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.length >= 4 || state.items.some((i) => i.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      isCompared: (id) => get().items.some((i) => i.id === id),
      toggleItem: (product) => {
        const { isCompared, addItem, removeItem } = get();
        if (isCompared(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
      clearAll: () => set({ items: [] }),
    }),
    {
      name: "compare-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
