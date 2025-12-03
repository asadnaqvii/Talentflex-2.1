'use client';

import React, { useState } from 'react';
import { Camera, Edit2, Mail, Phone, MapPin, Globe, Users, Building2, Save, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';

interface CompanyProfileData {
  companyName: string;
  industry: string;
  size: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  logo: string;
  description: string;
  culture: string;
  benefits: string[];
  linkedIn: string;
}

// Mock data
const mockProfile: CompanyProfileData = {
  companyName: 'TechCorp Inc.',
  industry: 'Technology / SaaS',
  size: '201-500 employees',
  website: 'www.techcorp.com',
  email: 'careers@techcorp.com',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  logo: '/company/techcorp.png',
  description: 'TechCorp is a leading enterprise SaaS company providing innovative solutions for businesses worldwide. We are dedicated to building products that transform how teams collaborate and achieve their goals.',
  culture: 'We believe in fostering an inclusive, innovative, and collaborative environment where every team member can thrive. Our culture emphasizes continuous learning, work-life balance, and celebrating diverse perspectives.',
  benefits: ['Remote-first', 'Unlimited PTO', 'Health & Dental', 'Stock Options', '401(k) Match', 'Learning Budget'],
  linkedIn: 'linkedin.com/company/techcorp',
};

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfileData>(mockProfile);
  const [editedProfile, setEditedProfile] = useState<CompanyProfileData>(mockProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof CompanyProfileData, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleBenefitsChange = (value: string) => {
    setEditedProfile((prev) => ({ ...prev, benefits: value.split(',').map(b => b.trim()) }));
  };

  return (
    <DashboardLayout userRole="employer">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Company Profile" />

        <div className="p-4 lg:p-8 max-w-4xl">
          {/* Company Header */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Logo */}
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-[#3D80F8] to-[#6B9FFA] flex items-center justify-center text-white text-3xl font-bold">
                  {profile.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3D80F8] rounded-full flex items-center justify-center text-white">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedProfile.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="text-2xl font-bold text-[#1A1A1A] bg-white px-3 py-2 rounded-lg border-2 border-[#EDEDED] focus:border-[#3D80F8] outline-none w-full"
                    />
                    <input
                      type="text"
                      value={editedProfile.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      placeholder="Industry"
                      className="text-[#676767] bg-white px-3 py-2 rounded-lg border-2 border-[#EDEDED] focus:border-[#3D80F8] outline-none w-full"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">{profile.companyName}</h1>
                    <p className="text-[#676767]">{profile.industry}</p>
                  </>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#676767]">
                    <Users className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="bg-white px-2 py-1 rounded border border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                      />
                    ) : (
                      <span>{profile.size}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#676767]">
                    <MapPin className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="bg-white px-2 py-1 rounded border border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#676767]">
                    <Globe className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="bg-white px-2 py-1 rounded border border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                      />
                    ) : (
                      <span className="text-[#3D80F8]">{profile.website}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-[#EDEDED] rounded-lg hover:bg-[#F6F6F6] transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-[#3D80F8] text-white rounded-lg hover:bg-[#2D6DE8] transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3D80F8] text-white rounded-lg hover:bg-[#2D6DE8] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <Mail className="w-5 h-5 text-[#3D80F8]" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 bg-transparent border-b border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                  />
                ) : (
                  <span className="text-[#676767]">{profile.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <Phone className="w-5 h-5 text-[#3D80F8]" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 bg-transparent border-b border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                  />
                ) : (
                  <span className="text-[#676767]">{profile.phone}</span>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-[#3D80F8]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">About the Company</h2>
            </div>
            {isEditing ? (
              <textarea
                value={editedProfile.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none resize-none"
              />
            ) : (
              <p className="text-[#676767] leading-relaxed">{profile.description}</p>
            )}
          </div>

          {/* Culture */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Company Culture</h2>
            {isEditing ? (
              <textarea
                value={editedProfile.culture}
                onChange={(e) => handleInputChange('culture', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none resize-none"
              />
            ) : (
              <p className="text-[#676767] leading-relaxed">{profile.culture}</p>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Benefits & Perks</h2>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.benefits.join(', ')}
                onChange={(e) => handleBenefitsChange(e.target.value)}
                placeholder="Enter benefits separated by commas"
                className="w-full px-4 py-3 bg-white border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#EFF5FF] text-[#3D80F8] rounded-full text-sm font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Social Media</h2>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.linkedIn}
                  onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                  className="flex-1 bg-transparent border-b border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                />
              ) : (
                <span className="text-[#3D80F8]">{profile.linkedIn}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
