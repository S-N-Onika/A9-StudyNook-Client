"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { LuSearch, LuSlidersHorizontal, LuLoader } from "react-icons/lu";

export default function AllRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);

    const amenitiesOptions = [ "Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning",];
    
    useEffect(() => {
        document.title = "StudyNook - Available Rooms";
    }, []);

    useEffect(() => {
        const fetchFilteredRooms = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (search) queryParams.append("search", search);
                if (selectedAmenities.length > 0) {
                    queryParams.append("amenities", selectedAmenities.join(","));
                }
                if (maxPrice) queryParams.append("maxPrice", maxPrice);

                const response = await axios.get(
                    `http://localhost:5000/api/rooms?${queryParams.toString()}`
                );

                setRooms(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchFilteredRooms, 400);
        return () => clearTimeout(timer);
    }, [search, selectedAmenities, maxPrice]);

    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-black text-[#2E1A0F] mb-2 tracking-tight">
                Library Study Spaces
            </h2>

            <p className="text-sm text-stone-500 mb-8">
                Search, filter, and lock down quiet reservation parameters inside the network library.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <div className="bg-white border border-[#EADFC9] rounded p-6 shadow-sm h-fit space-y-6">
                    <div className="flex items-center gap-2 text-[#5C2E16] font-bold text-xs uppercase tracking-wider border-b pb-3">
                        <LuSlidersHorizontal className="w-4 h-4" />
                        Filter Parameters
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                            Search Space Name
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full text-sm pl-9 pr-4 py-2 border border-[#EADFC9] bg-[#FBF8F3] rounded focus:outline-none"
                            />

                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                                Max Hourly Rate
                            </label>

                            <span className="text-xs font-bold text-[#5C2E16]">
                                ${maxPrice}/hr
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full accent-[#C29B38]"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                            Target Amenities
                        </label>

                        <div className="space-y-2">
                            {amenitiesOptions.map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2.5 text-sm font-medium text-[#2E1A0F] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                        className="w-4 h-4 accent-[#C29B38]"
                                    />
                                    <span>{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="min-h-[40vh] flex flex-col justify-center items-center">
                            <LuLoader className="w-8 h-8 text-[#C29B38] animate-spin" />
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="bg-white border border-[#EADFC9] rounded p-12 text-center">
                            No rooms match your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room) => (
                                <div key={room._id} className="bg-white rounded border border-[#EADFC9] overflow-hidden flex flex-col">
                                    <img className="h-48 w-full object-cover" src={room.image} alt={room.name} />

                                    <div className="p-5 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-serif font-bold text-base text-[#2E1A0F] line-clamp-1">
                                                    {room.name}
                                                </h4>

                                                <span className="text-xs font-black text-[#5C2E16] bg-[#FBF8F3] px-2 py-0.5 rounded border">
                                                    ${room.hourlyRate}/hr
                                                </span>
                                            </div>

                                            <span className="inline-block text-[10px] font-bold bg-stone-100 text-stone-500 uppercase px-2 py-0.5 rounded mb-2">
                                                {room.floor}
                                            </span>

                                            <p className="text-stone-500 text-xs line-clamp-2">
                                                {room.description}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/rooms/${room._id}`}
                                            className="block text-center py-2 bg-[#5C2E16] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest rounded"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}