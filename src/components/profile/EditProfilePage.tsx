'use client';

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import ChangePasswordModal from './ChangePasswordModal';

interface EditProfilePageProps {
  onClose: () => void;
}

export default function EditProfilePage({ onClose }: EditProfilePageProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Carl',
    role: 'Graphic Designer',
    email: 'johncarl@email.com',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    country: 'Singapore',
    phone: '(201) 555-0124'
  });


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data:', formData);
    onClose();
  };

  return (
    <div className="flex-1 bg-white rounded-tl-3xl overflow-hidden min-h-screen">
      <TopBar title="Setting" showBack={true} onBackClick={onClose} />

      {/* Content - Responsive */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-4 lg:p-8">
        {/* Left Column - Profile Settings - Full width on mobile */}
        <div className="flex-1 space-y-6 lg:space-y-8">
          {/* Profile Section */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-2">Settings Your Account</h2>
              <p className="text-sm lg:text-base text-[#676767]">
                Update your personal details, preferences, and job interests. Keep your profile up to date to get the best job recommendations
              </p>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=165&h=165&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-white border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                />
              </div>

              {/* Email and Password - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••"
                      readOnly
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none cursor-not-allowed"
                    />
                    <button
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#3D80F8] hover:text-blue-700 text-xs lg:text-sm font-bold"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                />
              </div>

              {/* Country and Phone - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-[#F3F3F3] border-2 border-[#D3D3D3] rounded-lg text-sm lg:text-base text-[#05060F] focus:outline-none focus:border-[#3D80F8]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button - Mobile only */}
            <button
              onClick={handleSave}
              className="lg:hidden w-full bg-[#3D80F8] text-white font-bold text-sm py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save and Update Changes
            </button>
          </div>
        </div>

        {/* Right Column - Payment & Transaction History - Full width on mobile */}
        <div className="flex-1 space-y-6 lg:space-y-8">
          {/* Payment Section */}
          <div className="space-y-4 lg:space-y-6">
            {/* Credit Card - Responsive */}
            <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] bg-gradient-to-br from-[#1C3F80] to-[#020C1D] rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white overflow-hidden">
              <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 lg:mb-2">Mastercard</h3>
              </div>
              
              <div className="absolute top-4 sm:top-5 lg:top-6 right-4 sm:right-6 lg:right-8">
                <div className="flex space-x-1">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#FF5A00] rounded-full opacity-90"></div>
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#EB001B] rounded-full opacity-90 -ml-2 lg:-ml-3"></div>
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#F79E1B] rounded-full opacity-90 -ml-2 lg:-ml-3"></div>
                </div>
              </div>

              <div className="absolute bottom-14 sm:bottom-16 lg:bottom-20 left-4 sm:left-6 lg:left-8">
                <p className="text-lg sm:text-2xl lg:text-3xl font-medium tracking-wider">1234 5678 9123 XXX</p>
              </div>

              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 flex gap-6 lg:gap-10">
                <div>
                  <p className="text-[10px] lg:text-xs text-[#C5DAFF] mb-0.5 lg:mb-1">VALID THRU</p>
                  <p className="text-sm lg:text-xl font-medium">05/25</p>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-[#C5DAFF] mb-0.5 lg:mb-1">CVV</p>
                  <p className="text-sm lg:text-xl font-medium">09X</p>
                </div>
              </div>
            </div>

            {/* Card Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="w-10 h-10 lg:w-12 lg:h-12 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2 lg:gap-3">
                <button className="bg-[#3D80F8] text-white px-3 lg:px-6 py-2 lg:py-3 rounded-lg font-bold text-xs lg:text-sm flex items-center gap-1 lg:gap-2 hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden sm:inline">Add Card</span>
                  <span className="sm:hidden">Add</span>
                </button>
                <button className="border border-[#D3D3D3] text-[#676767] px-3 lg:px-6 py-2 lg:py-3 rounded-lg font-bold text-xs lg:text-sm flex items-center gap-1 lg:gap-2 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Remove</span>
                  <span className="sm:hidden">Del</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#EDEDED]" />

            {/* Transaction History - Simplified for mobile */}
            <div className="space-y-4">
              <h3 className="text-base lg:text-lg font-bold text-[#1A1A1A]">Transaction History</h3>
              
              <div className="space-y-3">
                {/* Transaction 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#E8FBEB] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#229A1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm lg:text-base font-medium text-[#1A1A1A]">Premium Plan</p>
                      <p className="text-xs lg:text-sm text-[#676767]">Jan 20, 2024</p>
                    </div>
                  </div>
                  <p className="text-sm lg:text-base font-bold text-[#1A1A1A]">-$99</p>
                </div>

                {/* Transaction 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#FEF6F5] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF5A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm lg:text-base font-medium text-[#1A1A1A]">Course Purchase</p>
                      <p className="text-xs lg:text-sm text-[#676767]">Jan 15, 2024</p>
                    </div>
                  </div>
                  <p className="text-sm lg:text-base font-bold text-[#1A1A1A]">-$49</p>
                </div>
              </div>
            </div>

            {/* Save Button - Desktop only */}
            <button
              onClick={handleSave}
              className="hidden lg:block w-full bg-[#3D80F8] text-white font-bold text-base py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save and Update Changes
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <ChangePasswordModal 
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}