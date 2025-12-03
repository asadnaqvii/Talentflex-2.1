'use client';

import React, { useState } from 'react';
import { Copy, Check, Link as LinkIcon, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';

interface FormData {
  jobTitle: string;
  companyName: string;
  location: string;
  jobDescription: string;
  requirements: string;
  caseStudyInstructions: string;
  requiresVideo: boolean;
  requiresResume: boolean;
  requiresCaseStudy: boolean;
  requiresCoverLetter: boolean;
}

const initialFormData: FormData = {
  jobTitle: '',
  companyName: '',
  location: '',
  jobDescription: '',
  requirements: '',
  caseStudyInstructions: '',
  requiresVideo: true,
  requiresResume: true,
  requiresCaseStudy: false,
  requiresCoverLetter: false,
};

export default function CreateApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock token
    const token = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/application/${token}`;
    setGeneratedLink(link);
    setIsSubmitting(false);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateAnother = () => {
    setFormData(initialFormData);
    setGeneratedLink(null);
  };

  return (
    <DashboardLayout userRole="internal">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Create Application Link" showBack />

        <div className="p-4 lg:p-8 max-w-3xl">
          {generatedLink ? (
            // Success State
            <div className="bg-[#E8F5E9] rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">
                    Application Link Created!
                  </h2>
                  <p className="text-[#676767]">
                    Share this link with the candidate
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-6">
                <label className="text-sm font-bold text-[#676767] block mb-2">
                  Application Link
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 p-3 bg-[#F6F6F6] rounded-lg overflow-hidden">
                    <LinkIcon className="w-4 h-4 text-[#3D80F8] flex-shrink-0" />
                    <span className="text-sm text-[#1A1A1A] truncate">
                      {generatedLink}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      copied
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#3D80F8] hover:bg-[#2D6DE8] text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-6">
                <h3 className="font-bold text-[#1A1A1A] mb-3">Application Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-[#676767]">Job Title:</span>{' '}
                    <span className="font-medium">{formData.jobTitle}</span>
                  </p>
                  <p>
                    <span className="text-[#676767]">Company:</span>{' '}
                    <span className="font-medium">{formData.companyName}</span>
                  </p>
                  <p>
                    <span className="text-[#676767]">Requirements:</span>{' '}
                    {formData.requiresVideo && (
                      <span className="px-2 py-0.5 bg-[#EFF5FF] text-[#3D80F8] rounded mr-1">
                        Video
                      </span>
                    )}
                    {formData.requiresResume && (
                      <span className="px-2 py-0.5 bg-[#EFF5FF] text-[#3D80F8] rounded mr-1">
                        Resume
                      </span>
                    )}
                    {formData.requiresCaseStudy && (
                      <span className="px-2 py-0.5 bg-[#EFF5FF] text-[#3D80F8] rounded mr-1">
                        Case Study
                      </span>
                    )}
                    {formData.requiresCoverLetter && (
                      <span className="px-2 py-0.5 bg-[#EFF5FF] text-[#3D80F8] rounded">
                        Cover Letter
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCreateAnother}
                className="w-full py-3 border-2 border-[#3D80F8] text-[#3D80F8] font-bold rounded-lg hover:bg-[#EFF5FF] transition-colors"
              >
                Create Another Application
              </button>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
                  Job Details
                </h2>

                <div className="space-y-4">
                  {/* Job Title */}
                  <div>
                    <label className="text-sm font-bold text-[#676767] block mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Product Manager"
                      required
                      className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="text-sm font-bold text-[#676767] block mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g., TechCorp Inc."
                      required
                      className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-bold text-[#676767] block mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA (Remote OK)"
                      className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
                    />
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="text-sm font-bold text-[#676767] block mb-2">
                      Job Description
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Describe the role, responsibilities, and what success looks like..."
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="text-sm font-bold text-[#676767] block mb-2">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="List the required skills, experience, and qualifications..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Application Requirements */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
                  Required Submissions
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      name="requiresVideo"
                      checked={formData.requiresVideo}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-[#EDEDED] text-[#3D80F8] focus:ring-[#3D80F8]"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Video Introduction</p>
                      <p className="text-sm text-[#676767]">5-10 minute video (max 500MB)</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      name="requiresResume"
                      checked={formData.requiresResume}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-[#EDEDED] text-[#3D80F8] focus:ring-[#3D80F8]"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Resume / CV</p>
                      <p className="text-sm text-[#676767]">PDF format (max 5MB)</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      name="requiresCaseStudy"
                      checked={formData.requiresCaseStudy}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-[#EDEDED] text-[#3D80F8] focus:ring-[#3D80F8]"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Case Study</p>
                      <p className="text-sm text-[#676767]">PDF format (max 10MB)</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                    <input
                      type="checkbox"
                      name="requiresCoverLetter"
                      checked={formData.requiresCoverLetter}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-[#EDEDED] text-[#3D80F8] focus:ring-[#3D80F8]"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Cover Letter</p>
                      <p className="text-sm text-[#676767]">PDF format (max 5MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Case Study Instructions */}
              {formData.requiresCaseStudy && (
                <div className="bg-[#FFF8F0] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
                    Case Study Instructions
                  </h2>
                  <textarea
                    name="caseStudyInstructions"
                    value={formData.caseStudyInstructions}
                    onChange={handleInputChange}
                    placeholder="Provide detailed instructions for the case study assignment..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors resize-none bg-white"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.jobTitle || !formData.companyName}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-colors ${
                  isSubmitting || !formData.jobTitle || !formData.companyName
                    ? 'bg-[#ACACAF] cursor-not-allowed'
                    : 'bg-[#3D80F8] hover:bg-[#2D6DE8]'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Link...
                  </>
                ) : (
                  'Create Application Link'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
