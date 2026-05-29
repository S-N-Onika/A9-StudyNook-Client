"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuCompass, LuBookOpen } from "react-icons/lu";

export default function NotFound() {

    return (
        <div className="w-full flex flex-col items-center justify-center content-center p-4 sm:p-6 relative select-none py-20">

            <div className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-luminosity pointer-events-none" />

            <div className="max-w-xl w-full text-center space-y-8 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-3.5 max-w-lg"
                >
                    <h1 className="text-3xl sm:text-7xl font-serif font-black text-[#2E1A0F] tracking-tight leading-tight">
                        404
                    </h1>
                    <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight leading-tight">
                        Not Found: The page doesn't exist.
                    </h1>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-medium max-w-md mx-auto">
                        The shelf partition or room index entry you are consulting appears to be missing or cataloged under a different archive division.
                    </p>
                </motion.div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center w-full max-w-md">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex-1"
                    >
                        <LuBookOpen className="w-4 h-4" />
                        <span>Library Entrance</span>
                    </Link>

                    <Link
                        href="/all-rooms"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white hover:border-[#C29B38] text-stone-600 hover:text-[#5C2E16] font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex-1"
                    >
                        <LuCompass className="w-4 h-4" />
                        <span>All Rooms</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
