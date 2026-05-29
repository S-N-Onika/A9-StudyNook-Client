"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {LuCirclePlus, LuLayers, LuUsers, LuDollarSign, LuHeading, LuImage, LuTextQuote,} from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const AVAILABLE_AMENITIES = [ "Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning", ];
 
export default function AddRoom() {
    const router = useRouter();

    useEffect(() => {
        document.title = "StudyNook - Add Study Rooms";
    }, []);

        const onSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const rooms = { ...Object.fromEntries(formData.entries()),
                amenities: formData.getAll("amenities") };
            const clearToastId = toast.loading(
                "Publishing study room properties..."
            );

            const res = await fetch("http://localhost:5000/api/all-rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rooms),
            });

            const data = await res.json();

        const payload = {
            name: data.name,
            description: data.description,
            image: data.image,
            floor: data.floor,
            capacity: parseInt(data.capacity),
            hourlyRate: parseFloat(data.hourlyRate),
            amenities: data.amenities || [],
            ownerName: user?.displayName || "Scholar Resident",
        };

        try {
            await axios.post(
                "http://localhost:5000/api/all-rooms",
                payload,
                {
                    withCredentials: true,
                }
            );

            toast.success("Study room listed successfully!", {
                id: clearToastId,
            });

            router.push("/all-rooms");
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Failed to list study Room.",
                {
                    id: clearToastId,
                }
            );
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
            <div className="bg-white rounded border border-[#EADFC9] max-w-3xl w-full p-6 sm:p-10 lg:p-12 shadow-sm">

                <div className="mb-8 text-center md:text-left border-b border-[#EADFC9] pb-5">
                    <h2 className="text-3xl font-serif font-black text-[#2E1A0F] tracking-tight mb-1">
                        List Study Room
                    </h2>

                    <p className="text-sm text-stone-500 font-medium">
                        Deploy custom operational study sanctuaries across
                        library sectors.
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                    autoComplete="on"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                Room Title
                            </label>

                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />

                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="e.g. Oakwood Vault Room"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                Picture Reference URL Link
                            </label>

                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuImage className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />

                                <input
                                    type="url"
                                    name="image"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="https://unsplash.com..."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Library Floor Plan Location
                        </label>

                        <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                            <LuLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />

                            <input
                                type="text"
                                name="floor"
                                required
                                className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                placeholder="e.g. Floor 3, West Wing B"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                Seat Capacity Limit
                            </label>

                            <div className="relative">
                                <LuUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />

                                <input
                                    type="number"
                                    name="capacity"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3] text-sm text-[#2E1A0F] focus:bg-white focus:outline-none transition-colors"
                                    placeholder="e.g. 4"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                Hourly Fee (USD $)
                            </label>

                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />

                                <input
                                    type="number"
                                    step="0.01"
                                    name="hourlyRate"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="e.g. 15.00"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Detailed Room Description
                        </label>

                        <div className="relative">
                            <LuTextQuote className="absolute left-3 top-3 text-stone-400 w-4 h-4" />

                            <textarea
                                rows={4}
                                name="description"
                                required
                                className="w-full pl-9 pr-4 py-2.5 rounded border border-[#EADFC9] bg-[#FBF8F3] text-sm text-[#2E1A0F] focus:bg-white focus:outline-none transition-colors resize-none"
                                placeholder="Elaborate on ambient acoustic parameters, general rules..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                            Available Shared Infrastructure Amenities
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {AVAILABLE_AMENITIES.map((amenity, idx) => (
                                <label
                                    key={idx}
                                    className="flex items-center gap-2 p-3 rounded border border-stone-200 bg-[#FBF8F3]/30 hover:bg-[#FBF8F3] transition-colors cursor-pointer text-[10px] font-bold uppercase text-stone-700 select-none group"
                                >
                                    <input
                                        type="checkbox"
                                        value={amenity}
                                        name="amenities"
                                        className="w-4 h-4 text-[#C29B38] accent-[#C29B38] border-stone-300 focus:ring-0 rounded cursor-pointer checked:bg-[#C29B38] checked:border-[#C29B38]"
                                    />

                                    <span className="group-hover:text-[#5C2E16] transition-colors">
                                        {amenity}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] text-xs font-bold uppercase tracking-widest rounded shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <LuCirclePlus className="w-4 h-4" />

                            <span>Publish Room</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
