"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";
// import "animate.css";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password, photo } = data;
        setLoading(true);

        await authClient.signUp.email(
            {
                email: email.trim().toLowerCase(),
                password,
                name: name.trim(),
                image: photo?.trim() || undefined,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    toast.success("Account created successfully!");
                    setLoading(false);
                    reset();
                    router.push("/login");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Registration failed");
                    setLoading(false);
                },
            }
        );
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/",
            },
            {
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Google Sign-in failed");
                    setLoading(false);
                },
                onSuccess: () => setLoading(false),
            }
        );
    };

    return (
        <main className="bg-[#FCF9F3] min-h-screen flex items-center justify-center px-4 py-12">
            <Toaster position="top-center" />

            <div className="bg-white w-full max-w-lg p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-100 animate__animated animate__fadeIn">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-green-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join the QurbaniHat community today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            {...register("name", { required: "Full name is required" })}
                            type="text"
                            placeholder="Full Name"
                            className={`input ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                            })}
                            type="email"
                            placeholder="Email"
                            className={`input ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
                    </div>

                    <input {...register("photo")} type="text" placeholder="Photo URL (Optional)" className="input" />

                    <div className="relative">
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`input pr-12 ${errors.password ? "border-red-500" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-900 cursor-pointer"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold hover:bg-orange-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "Creating account..." : "Register Now"}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-2">
                    <div className="flex-1 border-t border-gray-100" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 border-t border-gray-100" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
                >
                    <FcGoogle size={24} />
                    Sign up with Google
                </button>

                <p className="text-center mt-8 text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-900 font-bold hover:underline cursor-pointer">
                        Login
                    </Link>
                </p>
            </div>

            <style jsx>{`
                .input {
                    width: 100%;
                    padding: 14px 20px;
                    background: #f9fafb;
                    border-radius: 14px;
                    outline: none;
                    font-weight: 500;
                    border: 1px solid #f3f4f6;
                    transition: 0.2s;
                }
                .input:focus {
                    border-color: #14532d;
                    background: white;
                }
            `}</style>
        </main>
    );
}
