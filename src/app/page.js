"use client";

import Stats from "@/components/Stats";
import dynamic from 'next/dynamic';


const Banner = dynamic(() => import('@/components/Banner'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Stats />
    </div>

  );
}
