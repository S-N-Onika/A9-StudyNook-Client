"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { LuLogIn, LuShieldAlert, LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        document.title = "StudyNook - Login";
    }, []);

    const onSubmit = async (data = any) => {
        setValidationError("");
        const { email, password } = data;

        await authClient.signIn.email({
            email,
            password,
            fetchOptions: {
                onRequest: () => {
                    toast.loading("Authenticating credentials...", { id: "login-toast" });
                },
                onSuccess: () => {
                    toast.success("Welcome back to StudyNook!", { id: "login-toast" });
                    router.push("/");
                    router.refresh();
                },
                onError: (ctx) => {
                    setValidationError(ctx.error.message || "Invalid email or password credentials.");
                    toast.error(ctx.error.message || "Authentication failed.", { id: "login-toast" });
                },
            },
        });
    };

    const handleGoogleLogin = async () => {
        setValidationError("");
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="w-full min-h-full flex items-center justify-center bg-[#FBF8F3] p-4 sm:p-6 lg:p-12 pt-10">
            <div className="bg-white rounded border border-[#EADFC9] max-w-3xl w-full min-h-[580px] md:h-[75vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-sm">

                <div className="p-5 sm:p-10 md:p-12 flex flex-col justify-center order-1 w-full h-full overflow-y-auto space-y-4">
                    <div className="mb-4 sm:mb-6 text-center md:text-left  space-y-4">
                        <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight mb-0.5 sm:mb-2">Scholar Access</h2>
                        <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-[#C29B38]">Log in to your study sanctuary</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                placeholder="student@university.edu"
                            />
                            {errors.email && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Valid email is required.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Password</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true })}
                                    className="w-full px-3 py-2 pr-10 sm:px-4 sm:py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#5C2E16] focus:outline-none cursor-pointer"
                                >
                                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Password is required.</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                            <LuLogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                    </form>

                    <div className="relative my-4 sm:my-5 flex items-center justify-center">
                        <div className="absolute w-full border-t border-stone-200"></div>
                        <span className="relative bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Or</span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-2.5 sm:py-3 border border-[#EADFC9] text-stone-700 bg-[#FBF8F3]/30 hover:bg-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5 shadow-inner cursor-pointer"
                    >
                        <FcGoogle className="text-amber-700 text-xs sm:text-sm" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-md font-semibold text-stone-500 mt-4 sm:mt-6">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-[#5C2E16] font-bold hover:underline tracking-wide">
                            Register
                        </Link>
                    </p>
                </div>

                <div className="hidden md:block relative bg-[#2C1A11] h-full w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
                        style={{ backgroundImage: `url('assets/books1.webp')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A11] via-transparent to-transparent z-10" />
                    <div className="absolute bottom-12 left-10 right-10 z-20 text-white space-y-2">
                        <p className="font-serif italic text-2xl lg:text-3xl text-[#C29B38] leading-relaxed">"Silence is the element in which great things fashion themselves together."</p>
                        <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-stone-400">— Thomas Carlyle</p>
                    </div>
                </div>

            </div>
        </div>
    );
}