"use client";

import { DASHBOARD_MENU } from "@/config/dashboard-menu";
import { useAuthorization } from "./useAuthorization";

export function useDashboardMenu() {
  const { can } = useAuthorization();

  const filteredMenu = DASHBOARD_MENU
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => can(item.permission)),
    }))
    .filter((section) => section.items.length > 0);

  return filteredMenu;
}
