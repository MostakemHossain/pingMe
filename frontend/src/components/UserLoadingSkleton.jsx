import React from "react";

const UserLoadingSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>

          <div className="flex-1 space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLoadingSkeleton;
