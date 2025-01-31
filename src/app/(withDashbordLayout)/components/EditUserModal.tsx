"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserMutation } from "@/redux/features/user.api";
import { TError } from "@/type";

import LoadingButton from "@/utils/LoadingButton";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { TUser } from "../dashboard/user-manage/page";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EditUserModal = ({ item }: { item: TUser }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [update, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data: FieldValues) => {
    const { name, email, role } = data;

    const payload = { id: item._id, data: { name, email, role } };

    try {
      const res = await update(payload).unwrap();

      if (res.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          title: "User Updated successfully",
          icon: "success",
        });
        reset();
        setIsDialogOpen(false);
      }
    } catch (err) {
      const error = err as TError;
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: `${error?.data?.message || "Something went wrong"}`,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="border border-slate-500 text-green-500"
            variant="outline"
          >
            <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:w-[360px] lg:w-[1080px]">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-4">
              {/* name */}
              <div className="">
                <Label htmlFor="Name">User Name</Label>
                <Input
                  defaultValue={item?.name}
                  placeholder="Name"
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>
              {/* phone */}
              <div className="">
                <Label>Email</Label>
                <Input
                  {...register("email", { required: true })}
                  defaultValue={item?.email}
                />
              </div>
              <div className="">
                <Label>Role</Label>
                <Select
                  defaultValue={item.role}
                  {...register("role", { required: true })}
                  onValueChange={(value) => setValue("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                  </SelectContent>
                  {errors.role && (
                    <span className="text-red-500">Role is required</span>
                  )}
                </Select>
              </div>
            </div>
            <div>
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  variant="secondary"
                  className="w-full bg-green-800"
                  type="submit"
                  size="lg"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </DialogContent>{" "}
      </Dialog>
    </div>
  );
};

export default EditUserModal;
