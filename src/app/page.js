"use client";

import Events from "@/components/Events";
import Stats from "@/components/Stats";
import dynamic from 'next/dynamic';
import LatestRooms from "@/components/LatestRooms";


const Banner = dynamic(() => import('@/components/Banner'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <LatestRooms />
      <Stats />
      <Events />
    </div>

  );
}
