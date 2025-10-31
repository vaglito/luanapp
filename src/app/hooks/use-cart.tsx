import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showToast } from "nextjs-toast-notify";

import { Products } from "../types/products.type";

interface CartStore {
  items: Products[];
  addItem: (data: Products) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Products) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          return showToast.info("El producto ya existe en el carrito.");
        }

        set({
          items: [...get().items, data],
        });
        showToast.success("Producto añadido correctamente.");
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] });
        showToast.success("Producto eliminado correctamente.");
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
