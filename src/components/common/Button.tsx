"use client"
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export function ButtonNotFound({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <Button variant="contained" onClick={() => router.back()}>{children}</Button>;
}
