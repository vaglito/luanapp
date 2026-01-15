import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Empresa peruana especializada en equipos de cómputo y tecnología.",
};

export default function LayoutAbout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
