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

import LoadingButton from "@/utils/LoadingButton";
import Swal from "sweetalert2";
import { TError } from "@/type";
import { useUpdateVocabMutation } from "@/redux/features/vocab.api";
import { TVocabs } from "../dashboard/vocab-manage/page";
import Required from "@/utils/Required";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllLessonQuery } from "@/redux/features/lesson.api";

const EditVocabsModal = ({ item }: { item: TVocabs }) => {
  const { data: lessons, isLoading: lessonLoading } = useGetAllLessonQuery({});

  const [update, { isLoading }] = useUpdateVocabMutation();

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
          title: "Lesson Updated successfully",
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
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-4">
            {/* name */}
            <div className="">
              <Label htmlFor="Name">Word</Label>
              <Input
                defaultValue={item?.word}
                type="text"
                {...register("word", { required: true })}
              />
            </div>
            {/* phone */}
            <div className="">
              <Label>Meaning</Label>
              <Input
                {...register("meaning", { required: true })}
                defaultValue={item?.meaning}
              />
            </div>

            <div className="">
              <Label>Pronounciation</Label>
              <Input
                {...register("pronunciation", { required: true })}
                defaultValue={item?.pronunciation}
              />
            </div>
            <div>
              <Label>
                Lesson No <Required />
              </Label>
              <Select
                {...register("lessonNo", { required: true })}
                onValueChange={(value) => setValue("lessonNo", value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={lessonLoading ? "Loading..." : "Select Lesson"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {lessons?.data?.map(
                    (item: { _id: string; name: string; number: string }) => (
                      <SelectItem key={item._id} value={item.number}>
                        {item.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
                {errors.lessonNo && (
                  <span className="text-red-500">Lesson No is required</span>
                )}
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>When To Say</Label>
              <Input
                {...register("whenToSay", { required: true })}
                defaultValue={item?.whenToSay}
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

export default EditVocabsModal;
