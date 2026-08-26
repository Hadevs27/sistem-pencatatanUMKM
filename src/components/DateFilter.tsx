"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function DateFilterInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [start, setStart] = useState(searchParams.get("start") || "");
  const [end, setEnd] = useState(searchParams.get("end") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (start) {
      params.set("start", start);
    } else {
      params.delete("start");
    }
    if (end) {
      params.set("end", end);
    } else {
      params.delete("end");
    }
    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    setStart("");
    setEnd("");
    router.push("/");
  };

  return (
    <div className="flex flex-wrap items-end gap-3 mb-2">
      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Dari Tanggal</label>
        <input 
          type="date" 
          value={start} 
          onChange={(e) => setStart(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-[38px]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Sampai Tanggal</label>
        <input 
          type="date" 
          value={end} 
          onChange={(e) => setEnd(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-[38px]"
        />
      </div>
      <button 
        onClick={handleFilter}
        className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-hover transition-colors h-[38px] font-medium"
      >
        Filter
      </button>
      {(start || end) && (
        <button 
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors h-[38px] font-medium"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default function DateFilter() {
  return (
    <Suspense fallback={<div className="h-[58px] bg-gray-100 animate-pulse rounded-md" />}>
      <DateFilterInner />
    </Suspense>
  )
}
