"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { setUser } from "@/redux/features/auth/authSliece";
import { VerifyJwt } from "@/utils/VerifyJwt";
import Swal from "sweetalert2";
import { TError } from "@/type";
import { Button } from "@/components/ui/button";
import { Loader2, SquareUserRound } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        const user = VerifyJwt(res.data.accessToken);

        // in redux state

        dispatch(setUser({ user: user, token: res.data.accessToken }));

        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          title: "Login successfully",
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
        title: `${error?.data?.message || "someting went wrong"}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gray-100 bg-opacity-75 bg-cover bg-center h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white  min-h-60 px-3 md:px-20 pb-10 rounded-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col justify-center items-center mt-10 bg-green-600 w-20 rounded-md px-10 py-2 text-xl mx-auto ">
            <SquareUserRound size={50} color="#F8F8F9" />
            <p className="text-slate-100 font-semibold">Login</p>
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
            <Label>
              Password <span className="text-red-500 text-lg"> * </span>{" "}
            </Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Passord minimum 6 digit" },
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

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-8 w-full bg-green-600 hover:bg-green-900"
          >
            {isLoading ? (
              <Loader2 className="animate-spin">Please Wait</Loader2>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <p className="mt-4">
          Don&apos;t have account !{" "}
          <Link className="text-teal-600 font-semibold" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
