"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { LuUserPlus, LuShieldAlert } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        document.title = "StudyNook - Register";
    }, []);

    const onSubmit = async (data = any) => {
        setValidationError("");
        const { name, email, photoURL, password } = data;

        if (password.length < 6) {
            setValidationError("Criteria failed: Password must consist of at least 6 characters.");
            toast.error("Password too short.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setValidationError("Criteria failed: Password must include at least one uppercase letter.");
            toast.error("Uppercase letter required.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setValidationError("Criteria failed: Password must include at least one lowercase letter.");
            toast.error("Lowercase letter required.");
            return;
        }

        await authClient.signUp.email({
            email,
            password,
            name,
            image: photoURL, 
            fetchOptions: {
                onRequest: () => {
                    setValidationError("");
                },
                onSuccess: () => {
                    toast.success("Registration successful! Redirecting...");
                    router.push("/login");
                },
                onError: (ctx) => {
                    setValidationError(ctx.error.message || "Registration process encountered an error.");
                    toast.error("Registration failed.");
                },
            },
        });
    };

    const handleGoogleRegister = async () => {
        setValidationError("");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", 
            });
        } catch (err) {
            toast.error("Google authentication encountered an error.");
        }
    };

    return (
        <div className="w-full min-h-full flex items-center justify-center bg-[#FBF8F3] p-4 sm:p-6 lg:p-12 pt-10">

            <div className="bg-white rounded border border-[#EADFC9] max-w-3xl w-full min-h-[580px] md:h-[75vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-sm">

                <div className="hidden md:block relative bg-[#2C1A11] h-full w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
                        style={{ backgroundImage: "url('/assets/books.avif')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A11] via-transparent to-transparent z-10" />
                    <div className="absolute bottom-12 left-10 right-10 z-20 text-white space-y-2">
                        <p className="font-serif italic text-2xl lg:text-3xl text-[#C29B38] leading-relaxed">
                            "A room without books is like a body without a soul."
                        </p>
                        <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-stone-400">
                            — Marcus Tullius Cicero
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center w-full h-full overflow-y-auto">

                    <div className="mb-5 text-left">
                        <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight mb-0.5 sm:mb-1">
                            Create Account
                        </h2>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C29B38]">
                            Join the library study network
                        </p>
                    </div>

                    {validationError && (
                        <div className="flex items-center gap-2 p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs font-semibold animate-fadeIn w-full">
                            <LuShieldAlert className="w-4 h-4 shrink-0" />
                            <span className="text-left leading-tight">{validationError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Full Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full px-4 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F] outline-none"
                                placeholder="Scholar Resident"
                            />
                            {errors.name && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Full name is required.</span>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F] outline-none"
                                placeholder="student@university.edu"
                            />
                            {errors.email && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Email context is required.</span>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Profile Photo URL String</label>
                            <input
                                type="url"
                                {...register("photoURL", { required: true })}
                                className="w-full px-4 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F] outline-none"
                                placeholder="https://photo..."
                            />
                            {errors.photoURL && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Image resource link is required.</span>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                                Password
                            </label>

                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true })}
                                    className="w-full px-4 pr-12 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F] outline-none"
                                    placeholder="••••••••"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 p-1 text-stone-400 hover:text-[#5C2E16] focus:outline-none transition-colors cursor-pointer"
                                    aria-label={showPassword ? "Hide Password" : "Show Password"}
                                >
                                    {showPassword ? (
                                        <LuEyeOff className="w-4 h-4" />
                                    ) : (
                                        <LuEye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">
                                    Password is required.
                                </span>
                            )}
                        </div>


                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                            >
                                <LuUserPlus className="w-4 h-4" />
                                <span>Register</span>
                            </button>
                        </div>
                    </form>

                    <div className="relative my-3 sm:my-4 flex items-center justify-center">
                        <div className="absolute w-full border-t border-stone-200"></div>
                        <span className="relative bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Or</span>
                    </div>

                    <button
                        onClick={handleGoogleRegister}
                        className="w-full py-2.5 border border-[#EADFC9] text-stone-700 bg-[#FBF8F3]/30 hover:bg-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5 shadow-inner cursor-pointer"
                    >
                        <FcGoogle className="text-amber-700 text-xs sm:text-sm" />
                        <span>Sign Up with Google</span>
                    </button>

                    <p className="text-center text-sm font-semibold text-stone-500 mt-5 sm:mt-5">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#5C2E16] font-bold hover:underline tracking-wide">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
