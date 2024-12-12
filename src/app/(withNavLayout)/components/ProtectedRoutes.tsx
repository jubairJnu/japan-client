/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CurrentToken, CurrentUser } from "@/redux/features/auth/authSliece";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoutes = ({ children }: { children: any }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const user = useAppSelector(CurrentUser);
  const token = useAppSelector(CurrentToken);

  if (!token && !user?.email) {
    router.push("/login");
    return null;
  }

  

    if (user && user.role === "Admin") {
   
      if (!pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
        return null;
      }
    } else {
    
      if (pathname === "/") {
        
        router.push("/lessons");
      } else if (!pathname.startsWith("/lessons")) {
        
        router.push(pathname);
      }
    }
  


  return children;
};

export default ProtectedRoutes;
