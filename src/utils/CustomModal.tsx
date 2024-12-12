"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { FaRegEdit } from "react-icons/fa";

const CustomModal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="border border-slate-500 text-green-500"
          variant="outline"
        >
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[360px] lg:w-[1080px]">
        {children}
      </DialogContent>{" "}
    </Dialog>
  );
};

export default CustomModal;
