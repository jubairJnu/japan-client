"use client";

import Image from "next/image";
import logo from "@/asset/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { CurrentToken, logout } from "@/redux/features/auth/authSliece";

import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"; // Import ShadCN components

const DashNavbar = () => {
  const token = useAppSelector(CurrentToken);

  const dispatch = useAppDispatch();

  // Handle logout
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full shadow-[5px_1px_10px_1px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between px-5 w-full max-w-7xl mx-auto container">
        {/* Logo */}
        <div>
          <Image src={logo} alt="logo" width={60} height={60} />
        </div>

        {/* Navigation Links for Medium and Larger Screens */}
        <div className="hidden md:flex space-x-4 font-semibold text-gray-600 text-[16px]">
          <Link
            className="hover:text-red-500 transition-all"
            href="/dashboard/lessons-manage"
          >
            Lessons Management
          </Link>
          <Link
            className="hover:text-red-500 transition-all"
            href="/dashboard/vocab-manage"
          >
            Vocabulary Management
          </Link>
          <Link
            className="hover:text-red-500 transition-all"
            href="/dashboard/user-manage"
          >
            User Management
          </Link>
        </div>

        {/* Authentication Button */}
        <div className="hidden md:block ">
          {token ? (
            <Button
              className="font-bold"
              onClick={handleLogOut}
              variant="destructive"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="font-bold">Login</Button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost">
                <FaBars className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  <Image src={logo} alt="logo" width={60} height={60} />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-5 font-semibold text-gray-600 text-[16px] mt-4">
                <SheetClose asChild>
                  <Link
                    className="hover:text-red-500 transition-all"
                    href="/dashboard/lessons-manage"
                  >
                    Lessons Management
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="hover:text-red-500 transition-all"
                    href="/dashboard/vocab-manage"
                  >
                    Vocabulary Management
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="hover:text-red-500 transition-all"
                    href="/dashboard/user-manage"
                  >
                    User Management
                  </Link>
                </SheetClose>
                {token ? (
                  <Button
                    onClick={handleLogOut}
                    variant="destructive"
                    className="mt-4 font-bold"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" className="mt-4 font-bold">
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
