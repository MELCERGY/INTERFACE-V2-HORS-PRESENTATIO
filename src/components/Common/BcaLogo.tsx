import React from 'react';

const BcaLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-[#0053A0] flex items-center">
        <span className="text-3xl font-bold">b</span>
        <div className="relative">
          <span className="text-3xl font-bold">c</span>
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#FFB800] rounded-full" />
        </div>
        <span className="text-3xl font-bold">a</span>
      </div>
      <span className="text-[#0053A0] text-sm font-medium mt-[-2px]">expertise</span>
    </div>
  );
};

export default BcaLogo;