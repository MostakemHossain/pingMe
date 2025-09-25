import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";

import loginAnimation from "../../public/login.json";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Lottie Animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-emerald-600 items-center justify-center">
        <div className="text-center px-8">
          <Lottie animationData={loginAnimation} loop={true} className="w-80 h-80 mx-auto" />
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back to PingMe</h1>
          <p className="text-white/90 text-lg">
            Log in to connect with friends, chat in communities, and stay updated in real-time.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl rounded-3xl border border-gray-100">
            <CardHeader className="pb-0">
              <CardTitle className="text-center text-3xl font-bold text-emerald-700">
                Log In to PingMe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all duration-200"
                >
                  Log In
                </Button>

                {/* Sign up Link */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  Don't have an account?{" "}
                  <a href="/sign-up" className="text-emerald-600 font-medium hover:underline">
                    Sign Up
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

export default Login;
