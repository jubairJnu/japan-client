"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
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
import CustomModal from "@/utils/CustomModal";
import LoadingButton from "@/utils/LoadingButton";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { TUser } from "../dashboard/user-manage/page";

const EditUserModal = ({ item }: { item: TUser }) => {
  const [update, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data: FieldValues) => {
    const { name, number, vocabCount } = data;

    const updatePayload = {
      id: item._id,
      data: { name, number, vocabCount },
    };

    try {
      const res = await update(updatePayload).unwrap();

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
      <CustomModal>
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
          <DialogClose asChild>
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
          </DialogClose>
        </form>
      </CustomModal>
    </div>
  );
};

export default EditUserModal;
