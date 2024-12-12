"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLessonMutation } from "@/redux/features/lesson.api";
import { TError } from "@/type";
import CommonHeader from "@/utils/CommonHeder";
import LoadingButton from "@/utils/LoadingButton";
import Required from "@/utils/Required";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddLessonPage = () => {
  const [create, { isLoading }] = useCreateLessonMutation();

  const { register, handleSubmit, reset } = useForm();

  const handleUpdate = async (data: FieldValues) => {
    const { name, number, vocabCount } = data;

    const payload = {
      name,
      number,
      vocabCount,
    };

    try {
      const res = await create(payload).unwrap();
      if (res.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          title: "Lesson Created successfully",
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
      <CommonHeader
        manage="Add Lesson"
        list="Lesson List"
        link="/dashboard/lessons-manage"
      />

      <div className="w-full max-w-7xl container px-3 mx-auto">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-4">
            {/* name */}
            <div className="">
              <Label htmlFor="Name">
                Lesson Name <Required />{" "}
              </Label>
              <Input
                placeholder="Greeting"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            {/* phone */}
            <div className="">
              <Label>
                Lesson Number <Required />
              </Label>
              <Input
                placeholder="1"
                {...register("number", { required: true, valueAsNumber: true })}
              />
            </div>
            <div className="">
              <Label>
                Vocabulary Count <Required />
              </Label>
              <Input
                placeholder="10"
                {...register("vocabCount", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                variant="secondary"
                className="w-full bg-green-800 text-slate-100 font-bold"
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

export default AddLessonPage;
