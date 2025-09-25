import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";

import signupAnimation from "../../public/login.json"; // You can rename file to signup.json if needed

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("SignUp Data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Lottie Animation + Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-emerald-600 items-center justify-center">
        <div className="text-center px-8">
          <Lottie animationData={signupAnimation} loop={true} className="w-80 h-80 mx-auto" />
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome to PingMe</h1>
          <p className="text-white/90 text-lg">
            Join thousands of users and enjoy real-time conversations, group chats, and communities.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Mostakem Hossain"
                    className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="font-semibold text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mostakem123@example.com"
                    className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="font-semibold text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="font-semibold text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    {...register("confirmPassword", { required: "Please confirm your password" })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all duration-200"
                >
                  Sign Up
                </Button>

                {/* Sign in Link */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  Already have an account?{" "}
                  <a href="/login" className="text-emerald-600 font-medium hover:underline">
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
