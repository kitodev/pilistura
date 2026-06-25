import type { Metadata } from "next";
import type React from "react";
import "@/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Pilistura",
  description: "Hunyadi Vandorfogado Pilis hiking challenge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
