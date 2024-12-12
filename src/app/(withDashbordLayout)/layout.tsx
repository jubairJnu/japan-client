import Providers from "@/lib/Providers";
import ProtectedRoutes from "../(withNavLayout)/components/ProtectedRoutes";
import DashNavbar from "./components/DashNavbar";
import "../../app/globals.css";

export default async function DahsboardLaylout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoutes>
        <DashNavbar />

        <Providers>{children}</Providers>
      </ProtectedRoutes>
    </>
  );
}
