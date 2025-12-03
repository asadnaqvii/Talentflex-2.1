"use client";

import Image from "next/image";

export default function UserProfile() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {/* Profile Image */}
      <div className="w-[165px] h-[165px] rounded-full overflow-hidden">
        <Image
          src="/images/profile-john.png"
          alt="John Carl"
          width={165}
          height={165}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* User Info */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-[20px] font-bold leading-[28px] tracking-[-0.02em] text-[#1A1A1A]">
          John Carl
        </h3>
        <p className="text-[14px] font-normal leading-[20px] tracking-[-0.02em] text-[#676767]">
          Graphic Designer
        </p>
      </div>
    </div>
  );
}
