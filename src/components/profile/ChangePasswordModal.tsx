'use client';

import { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change submitted');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[520px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-[-2%]">Change Password</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="w-6 h-6 text-[#676767]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {/* Current Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1A1A1A] tracking-[-2%]">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="******"
                  className="w-full bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-[10px] px-4 py-2 text-base text-[#05060F] tracking-[-2%] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg className="w-6 h-6 text-[#676767]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showCurrentPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1A1A1A] tracking-[-2%]">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="******"
                className="w-full bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-[10px] px-4 py-2 text-base text-[#05060F] tracking-[-2%]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3D80F8] text-white font-bold py-4 rounded-lg text-base tracking-[-2%] hover:bg-blue-600 transition-colors"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
