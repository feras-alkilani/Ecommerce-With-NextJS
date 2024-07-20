import React from "react";

export default function SkeletonProductInfo() {
  return (
    <div className="flex flex-col gap-5">
      <dir className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></dir>
      <dir className="h-[20px] w-[70px] bg-slate-200 animate-pulse"></dir>
      <dir className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></dir>
      <dir className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></dir>
      <dir className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></dir>
      <dir className="h-[20px] w-[100px] bg-slate-200 animate-pulse"></dir>
    </div>
  );
}
