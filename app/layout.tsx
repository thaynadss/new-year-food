import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virada de Ano 2026",
  description:
    "Organize as contribuições de comida, bebida e sobremesa para o Ano Novo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
