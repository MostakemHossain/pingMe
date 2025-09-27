import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import { Loader2 } from "lucide-react";

import signupAnimation from "../../public/login.json";
import { useAuthState } from "../store/useAuthStore";

const SignUp = () => {
  const { signUp, isSigningUp } = useAuthState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signUp(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-emerald-600 items-center justify-center">
        <div className="text-center px-8">
          <Lottie
            animationData={signupAnimation}
            loop={true}
            className="w-80 h-80 mx-auto"
          />
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Welcome to PingMe
          </h1>
          <p className="text-white/90 text-lg">
            Join thousands of users and enjoy real-time conversations, group
            chats, and communities.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl rounded-3xl border border-gray-100">
            <CardHeader className="pb-0">
              <CardTitle className="text-center text-3xl font-bold text-emerald-700">
                Create Your PingMe Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Mostakem Hossain"
                    {...register("fullName", { required: "Name is required" })}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mostakem123@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all duration-200"
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
