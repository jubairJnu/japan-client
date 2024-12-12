"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllLessonQuery } from "@/redux/features/lesson.api";
import { useCreateVocabMutation } from "@/redux/features/vocab.api";
import { TError } from "@/type";
import CommonHeader from "@/utils/CommonHeder";
import LoadingButton from "@/utils/LoadingButton";
import Required from "@/utils/Required";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddVocabsPage = () => {
  const { data: lessons, isLoading: lessonLoading } = useGetAllLessonQuery({});

  const [createItem, { isLoading }] = useCreateVocabMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCreate = async (data: FieldValues) => {
    const { word, meaning, pronunciation, whenToSay, lessonNo } = data;

    const payload = {
      word,
      meaning,
      pronunciation,
      whenToSay,
      lessonNo: Number(lessonNo),
    };

    try {
      const res = await createItem(payload).unwrap();

      if (res.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          title: "Vocabulary Created successfully",
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
    <div>
      <CommonHeader
        manage="Add Vocabulary"
        link="/dashboard/vocab-manage"
        list="Vocabulary List"
      />

      <div className="w-full max-w-7xl px-3 container mx-auto">
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-4 ">
            {/* name */}
            <div className="">
              <Label htmlFor="Name">
                Word <Required />
              </Label>
              <Input type="text" {...register("word", { required: true })} />
              {errors.word && (
                <span className="text-red-500">Word is required</span>
              )}
            </div>
            {/* phone */}
            <div className="">
              <Label>
                Meaning <Required />
              </Label>
              <Input {...register("meaning", { required: true })} />
              {errors.meaning && (
                <span className="text-red-500">Meaning is required</span>
              )}
            </div>

            <div className="">
              <Label>Pronounciation</Label>
              <Input {...register("pronunciation", { required: true })} />
              {errors.pronunciation && (
                <span className="text-red-500">Pronounciation is required</span>
              )}
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
            <div className="grid col-span-2 mt-3">
              <Label>
                When To Say <Required />{" "}
              </Label>
              <Input {...register("whenToSay", { required: true })} />
              {errors.whenToSay && (
                <span className="text-red-500">When To Say is required</span>
              )}
            </div>
          </div>
          <div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                variant="secondary"
                className="w-full bg-green-800 hover:bg-green-400 text-slate-100 font-bold"
                type="submit"
                size="lg"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVocabsPage;
