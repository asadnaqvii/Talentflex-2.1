'use client';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatar: string;
  email: string;
  address: string;
  country: string;
  phone: string;
  paymentMethod: string;
  onEditClick: () => void;
}

export default function ProfileHeader({ 
  name, 
  role, 
  avatar, 
  email, 
  address, 
  country, 
  phone, 
  paymentMethod, 
  onEditClick 
}: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-[#EDEDED] rounded-3xl p-4 lg:p-6">
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        {/* Profile Picture and Info */}
        <div className="flex flex-col items-center gap-3 lg:gap-4">
          <div className="w-[120px] h-[120px] lg:w-[165px] lg:h-[165px] rounded-full overflow-hidden">
            <img 
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">{name}</h2>
            <p className="text-sm text-[#676767]">{role}</p>
          </div>
        </div>

        {/* Edit Button */}
        <button 
          onClick={onEditClick}
          className="px-6 py-3 border border-[#D3D3D3] rounded-lg text-sm font-bold text-[#1A1A1A] hover:bg-gray-50"
        >
          Edit
        </button>

        {/* Divider */}
        <div className="w-full h-px bg-[#EDEDED]" />

        {/* Contact Information */}
        <div className="w-full space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#969699]">Email</p>
            <p className="text-base text-[#1A1A1A]">{email}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#969699]">Address</p>
            <p className="text-base text-[#1A1A1A]">{address}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#969699]">Country</p>
            <p className="text-base text-[#1A1A1A]">{country}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#969699]">Phone Number</p>
            <p className="text-base text-[#1A1A1A]">{phone}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#969699]">Payment</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="12" r="5" fill="#EB001B"/>
                  <circle cx="15" cy="12" r="5" fill="#F79E1B"/>
                  <path d="M12 8.5v7" stroke="#FF5A00" strokeWidth="1"/>
                </svg>
              </div>
              <p className="text-base text-[#1A1A1A]">{paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
