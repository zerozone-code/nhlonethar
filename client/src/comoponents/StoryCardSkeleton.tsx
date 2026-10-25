import React from "react";

const StoryCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="aspect-[4/3] bg-rose-soft"></div>
      <div className="space-y-3 p-6">
        <div className="h-5 w-16 rounded-full bg-rose-soft"></div>
        <div className="h-5 w-3/4 bg-rose-soft"></div>
        <div className="h-4 w-full rounded bg-rose-soft/70"></div>

        <div className="h-4 w-2/3 rounded bg-rose-soft/70"></div>
      </div>
    </div>
  );
};

export default StoryCardSkeleton;
