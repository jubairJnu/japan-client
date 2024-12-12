import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FieldValues, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { TLesson } from "../dashboard/lessons-manage/page";
import { useUpdateLessonMutation } from "@/redux/features/lesson.api";
import LoadingButton from "@/utils/LoadingButton";
import Swal from "sweetalert2";
import { TError } from "@/type";

const EditLessonModal = ({ item }: { item: TLesson }) => {
  const [update, { isLoading }] = useUpdateLessonMutation();

  const { register, handleSubmit } = useForm();

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
          title: "Lesson Updated successfully",
          icon: "success",
        });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border border-slate-500 text-green-500"
          variant="outline"
        >
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[360px] lg:w-[1080px]">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-4">
            {/* name */}
            <div className="">
              <Label htmlFor="Name">Lesson Name</Label>
              <Input
                defaultValue={item?.name}
                placeholder="Greeting"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            {/* phone */}
            <div className="">
              <Label>Lesson Number</Label>
              <Input
                {...register("number", { required: true })}
                defaultValue={item?.number}
              />
            </div>
            <div className="">
              <Label>Vocabulary Count</Label>
              <Input
                {...register("vocabCount", { required: true })}
                defaultValue={item?.vocabCount}
              />
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
      </DialogContent>
    </Dialog>
  );
};

export default EditLessonModal;
