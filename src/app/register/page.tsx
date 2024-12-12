"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { setUser } from "@/redux/features/auth/authSliece";
import { VerifyJwt } from "@/utils/VerifyJwt";
import Swal from "sweetalert2";
import { TError } from "@/type";
import { Button } from "@/components/ui/button";
import { Loader2, SquareUserRound } from "lucide-react";
import {
  useLoginMutation,
  useSignUpMutation,
} from "@/redux/features/auth/authApi";
import Link from "next/link";

import config from "@/config";
import { useState } from "react";

const RegisterPage = () => {
  const [registerUser, { isLoading }] = useSignUpMutation();
  const [login, { isLoading: logging }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true); // Start loading

      if (!config.file_upload_api) {
        throw new Error("file_upload_api is not defined.");
      }

      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgResponse = await fetch(config.file_upload_api, {
        method: "POST",
        body: formData,
      });
      const responseImage = await imgResponse.json();

      const imageUrl = responseImage.data.display_url;
      console.log(imageUrl, "img res");

      const { email, name, password } = data;

      const payload = { email, name, password, photoUrl: imageUrl };

      const loggedData = { email, password };

      const registerRes = await registerUser(payload).unwrap();

      if (registerRes.success) {
        const res = await login(loggedData).unwrap();

        const user = VerifyJwt(res.data.accessToken);

        // Update Redux state
        dispatch(setUser({ user: user, token: res.data.accessToken }));

        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          title: "Register successfully",
          icon: "success",
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (user?.role === "Admin") {
          router.push("/dashboard");
        } else {
          await router.push("/lessons");
        }
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
    } finally {
      setLoading(false); // End loading
    }
  };

  const validatePassword = (value: string) => {
    if (!/[A-Z]/.test(value)) {
      return "Password must include at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must include at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must include at least one number";
    }
    if (!/[@$!%*?&#]/.test(value)) {
      return "Password must include at least one special character (@, $, !, %, *, ?, &)";
    }
    if (value.length < 7) {
      return "Password must be at least 7 characters long";
    }
    return true;
  };

  console.log(config.api_url, "api base");

  return (
    <div className="bg-gray-100  bg-cover bg-center h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-3xl bg-white min-h-60 px-3 md:px-20 pb-10 rounded-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col justify-center items-center mt-10 bg-teal-600 w-20 rounded-md px-14 py-5 text-xl mx-auto ">
            <SquareUserRound size={50} color="#F8F8F9" />
            <p className="text-slate-100 font-semibold">Register</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>
                Name <span className="text-red-500 text-lg"> * </span>{" "}
              </Label>
              <Input
                {...register("name", { required: true })}
                className=" border-gray-500 mt-1"
                type="text"
                placeholder="Type Name"
              />

              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div>
              <Label>
                Email <span className="text-red-500 text-lg"> * </span>{" "}
              </Label>
              <Input
                {...register("email", { required: true })}
                className=" border-gray-500 mt-1"
                type="email"
                placeholder="Email"
              />

              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div>
              <Label>Photo</Label>
              <Input
                {...register("photo", { required: false })}
                className=" border-gray-500 mt-1"
                type="file"
                placeholder="Select Photo"
              />
            </div>

            {/*  */}
            <div>
              <Label>
                Password <span className="text-red-500 text-lg"> * </span>{" "}
              </Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                className=" border-gray-500 mt-1"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors.password.message as string}
                </span>
              )}
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-8 w-full bg-teal-600 hover:bg-teal-900"
          >
            {loading || isLoading || logging ? (
              <Loader2 className="animate-spin">Please Wait</Loader2>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link className="text-teal-800 font-semibold" href="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
