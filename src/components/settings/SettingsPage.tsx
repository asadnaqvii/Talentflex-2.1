'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Bell, Shield, LogOut, ChevronRight, Moon, Sun, Mail, Smartphone } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SettingsPage() {
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // In production, this would call the logout API
    router.push('/signin');
  };

  return (
    <DashboardLayout userRole="candidate">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Settings" showBack />

        <div className="p-4 lg:p-8 max-w-3xl">
          {/* Account Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Account</h2>
            <div className="bg-[#F6F6F6] rounded-2xl overflow-hidden">
              <button
                onClick={() => router.push('/candidate/profile')}
                className="w-full flex items-center justify-between p-4 hover:bg-[#EDEDED] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#3D80F8]" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#1A1A1A]">Edit Profile</p>
                    <p className="text-sm text-[#676767]">Update your personal information</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#ACACAF]" />
              </button>

              <div className="h-px bg-[#EDEDED]" />

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#EDEDED] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#3D80F8]" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#1A1A1A]">Change Password</p>
                    <p className="text-sm text-[#676767]">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#ACACAF]" />
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Notifications</h2>
            <div className="bg-[#F6F6F6] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3D80F8]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Email Notifications</p>
                    <p className="text-sm text-[#676767]">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    emailNotifications ? 'bg-[#3D80F8]' : 'bg-[#ACACAF]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="h-px bg-[#EDEDED]" />

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-[#3D80F8]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Push Notifications</p>
                    <p className="text-sm text-[#676767]">Receive push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    pushNotifications ? 'bg-[#3D80F8]' : 'bg-[#ACACAF]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Appearance</h2>
            <div className="bg-[#F6F6F6] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-[#3D80F8]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#3D80F8]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Dark Mode</p>
                    <p className="text-sm text-[#676767]">Switch between light and dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    darkMode ? 'bg-[#3D80F8]' : 'bg-[#ACACAF]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-4 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-600">Log Out</p>
                <p className="text-sm text-red-400">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Change Password</h2>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-[#676767] block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-[#676767] block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-[#676767] block mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-3 border-2 border-[#EDEDED] rounded-lg font-medium hover:bg-[#F6F6F6] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#3D80F8] text-white rounded-lg font-medium hover:bg-[#2D6DE8] transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Log Out?</h2>
              <p className="text-[#676767] mb-6">Are you sure you want to log out of your account?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 border-2 border-[#EDEDED] rounded-lg font-medium hover:bg-[#F6F6F6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
