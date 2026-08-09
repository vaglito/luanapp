import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { getCachedSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCachedSession();
  if (!session) redirect("/login");
  const user = session?.user;

  return (
    <DashboardLayoutWrapper user={user}>
      {children}
    </DashboardLayoutWrapper>
  );
}

