import { ReactNode } from "react";

export interface DashboardMenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
  permission: string;
}

export interface DashboardMenuSection {
  section: string;
  items: DashboardMenuItem[];
}