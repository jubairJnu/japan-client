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

  // If the user is not authenticated, redirect to login
  if (!token && !user?.email) {
    router.push("/login");
    return null;
  }

  // Redirect logic for authenticated users
  if (user) {
    if (user.role === "Admin") {
      // If the route is not /dashboard, redirect there
      if (!pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
        return null;
      }
    } else {
      // If the route is not /lessons, redirect there
      if (!pathname.startsWith("/lessons")) {
        router.push("/lessons");
        return null;
      }
    }
  }

  // Render children if the route is valid
  return children;
};

export default ProtectedRoutes;
