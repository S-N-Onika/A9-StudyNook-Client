"use client";

import Link from "next/link";
import { MdLocalLibrary } from "react-icons/md";
import { Menu } from "lucide-react";

export default function Navbar() {

    return (
        <nav className="w-full bg-[#FBF8F3] border-b border-[#EADFC9] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded bg-[#5C2E16] flex items-center justify-center">
                            <MdLocalLibrary className="text-[#FBF8F3] text-lg" />
                        </div>
                        <span className="text-2xl font-serif font-black tracking-tight text-[#2E1A0F]">
                            Study<span className="text-[#C29B38] font-normal italic">Nook</span>
                        </span>
                    </div>

                    <div className="hidden sm:flex h-16 space-x-8">
                        <Link href="/" className="">
                            Home
                        </Link>
                        <Link href="/rooms" className="">
                            Rooms
                        
                        </Link>
                        <Link href="/add-room" className="">
                            Add Room
                        </Link>
                        <Link href="/my-listings" className="">
                            My Listings
                        </Link>
                        <Link href="/my-bookings" className="">
                            My Bookings
                        </Link>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                        <Link href="/login">
                            <span className="text-sm uppercase tracking-widest font-bold text-stone-600 hover:text-[#5C2E16] cursor-pointer">
                                Login
                            </span>

                        </Link>
                        <Link href="/register">
                            <span className="text-sm uppercase tracking-widest font-bold text-white bg-[#5C2E16] hover:bg-[#42200F] px-5 py-2.5 rounded shadow-sm cursor-pointer">
                                Register
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button className="p-2 rounded text-stone-500 hover:text-stone-800 hover:bg-[#EADFC9]/30 focus:outline-none">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
