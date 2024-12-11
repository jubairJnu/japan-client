import Providers from "@/lib/Providers";

import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Learn Japan",
  description: "Learn new language wth fun",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <Providers>{children}</Providers>
    </>
  );
}
