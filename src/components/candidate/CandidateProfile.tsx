'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Edit2, Mail, Phone, MapPin, Briefcase, GraduationCap, Link as LinkIcon, Save, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';

interface CandidateProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  bio: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  linkedIn: string;
  portfolio: string;
}

// Mock data
const mockProfile: CandidateProfileData = {
  name: 'Sarah Johnson',
  title: 'Senior Product Manager',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  avatar: '/avatars/sarah.jpg',
  bio: 'Experienced product manager with 8+ years in SaaS and enterprise software. Passionate about building user-centric products that solve real problems.',
  skills: ['Product Strategy', 'Agile/Scrum', 'Data Analysis', 'User Research', 'Roadmapping', 'Cross-functional Leadership'],
  experience: [
    {
      title: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      duration: '2021 - Present',
      description: 'Leading product strategy for enterprise SaaS platform serving 500+ clients.',
    },
    {
      title: 'Product Manager',
      company: 'StartupXYZ',
      duration: '2018 - 2021',
      description: 'Launched mobile app from 0 to 100k users in 18 months.',
    },
  ],
  education: [
    {
      degree: 'MBA, Technology Management',
      institution: 'Stanford Graduate School of Business',
      year: '2018',
    },
    {
      degree: 'BS, Computer Science',
      institution: 'UC Berkeley',
      year: '2014',
    },
  ],
  linkedIn: 'linkedin.com/in/sarahjohnson',
  portfolio: 'sarahjohnson.com',
};

export default function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CandidateProfileData>(mockProfile);
  const [editedProfile, setEditedProfile] = useState<CandidateProfileData>(mockProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof CandidateProfileData, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    setEditedProfile((prev) => ({ ...prev, skills: value.split(',').map(s => s.trim()) }));
  };

  return (
    <DashboardLayout userRole="candidate">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="My Profile" />

        <div className="p-4 lg:p-8 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[#D96570] to-[#4A83F0] flex items-center justify-center text-white text-3xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
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
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-2xl font-bold text-[#1A1A1A] bg-white px-3 py-2 rounded-lg border-2 border-[#EDEDED] focus:border-[#3D80F8] outline-none w-full"
                    />
                    <input
                      type="text"
                      value={editedProfile.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Professional Title"
                      className="text-[#676767] bg-white px-3 py-2 rounded-lg border-2 border-[#EDEDED] focus:border-[#3D80F8] outline-none w-full"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">{profile.name}</h1>
                    <p className="text-[#676767]">{profile.title}</p>
                  </>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#676767]">
                    <Mail className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white px-2 py-1 rounded border border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                      />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#676767]">
                    <Phone className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white px-2 py-1 rounded border border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                      />
                    ) : (
                      <span>{profile.phone}</span>
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

          {/* Bio */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none resize-none"
              />
            ) : (
              <p className="text-[#676767] leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Skills</h2>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.skills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="Enter skills separated by commas"
                className="w-full px-4 py-3 bg-white border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#EFF5FF] text-[#3D80F8] rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-[#3D80F8]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">Experience</h2>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-[#1A1A1A]">{exp.title}</h3>
                      <p className="text-sm text-[#676767]">{exp.company}</p>
                    </div>
                    <span className="text-sm text-[#ACACAF]">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-[#676767]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-[#3D80F8]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">Education</h2>
            </div>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-[#1A1A1A]">{edu.degree}</h3>
                      <p className="text-sm text-[#676767]">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-[#ACACAF]">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <LinkIcon className="w-5 h-5 text-[#3D80F8]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">Links</h2>
            </div>
            <div className="space-y-3">
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
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <svg className="w-5 h-5 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    className="flex-1 bg-transparent border-b border-[#EDEDED] focus:border-[#3D80F8] outline-none"
                  />
                ) : (
                  <span className="text-[#3D80F8]">{profile.portfolio}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
