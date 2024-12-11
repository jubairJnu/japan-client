import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: "Learn Japan",
  description: "Learn new language wth fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
