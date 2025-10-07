import React from "react";

const MessagesLoadingSkeleton = () => {
  return (
    <div className="flex flex-col justify-start h-full bg-[#e5ddd5] px-4 py-6 overflow-y-auto animate-pulse">
      <div className="flex items-start gap-2 mb-6">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 h-4 w-40 rounded-2xl"></div>
          <div className="bg-gray-300 h-4 w-60 rounded-2xl"></div>
        </div>
      </div>

      <div className="flex items-start justify-end gap-2 mb-6">
        <div className="flex flex-col gap-2 items-end">
          <div className="bg-gray-300 h-4 w-48 rounded-2xl"></div>
          <div className="bg-gray-300 h-4 w-32 rounded-2xl"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      <div className="flex items-start gap-2 mb-6">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 h-6 w-56 rounded-2xl"></div>
          <div className="bg-gray-300 h-6 w-44 rounded-2xl"></div>
        </div>
      </div>

      <div className="flex items-start justify-end gap-2 mb-6">
        <div className="flex flex-col gap-2 items-end">
          <div className="bg-gray-300 h-6 w-52 rounded-2xl"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      <div className="flex items-start gap-2 mb-6">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 h-6 w-60 rounded-2xl"></div>
          <div className="bg-gray-300 h-6 w-40 rounded-2xl"></div>
        </div>
      </div>

      <div className="flex items-start justify-end gap-2 mb-6">
        <div className="flex flex-col gap-2 items-end">
          <div className="bg-gray-300 h-6 w-44 rounded-2xl"></div>
          <div className="bg-gray-300 h-6 w-28 rounded-2xl"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default MessagesLoadingSkeleton;
