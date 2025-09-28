import React from "react";

const BorderAnimatedContainer = ({ children }) => {
  return (
    <div className="relative flex w-full h-full rounded-none border-t border-emerald-500 bg-white text-gray-800 shadow-lg">
      {children}
    </div>
  );
};

export default BorderAnimatedContainer;
