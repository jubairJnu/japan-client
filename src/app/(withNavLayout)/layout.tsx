import Providers from "@/lib/Providers";

import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
      <ProtectedRoutes>
        <Navbar />

        <Providers>{children}</Providers>
      </ProtectedRoutes>
    </>
  );
}
