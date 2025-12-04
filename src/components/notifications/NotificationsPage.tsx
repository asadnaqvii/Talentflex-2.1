"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, CheckCircle, Calendar, Heart, AlertCircle, Bell, Users, Building2 } from "lucide-react";
import { UserRole } from "@/types";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'application' | 'analysis' | 'interview' | 'interest' | 'reminder' | 'system' | 'candidate_submitted' | 'employer_action';
  read: boolean;
  link?: string;
}

// Candidate notifications
const candidateNotifications: Notification[] = [
  {
    id: '1',
    title: 'Employer Interested',
    message: 'TechCorp Inc. has expressed interest in your application for Senior Product Manager',
    time: '2 hours ago',
    type: 'interest',
    read: false,
    link: '/candidate/applications'
  },
  {
    id: '2',
    title: 'Analysis Complete',
    message: 'Your AI analysis for the UX Designer position is ready to review',
    time: '3 hours ago',
    type: 'analysis',
    read: false,
    link: '/application/abc123?demo=analyzed'
  },
  {
    id: '3',
    title: 'Interview Scheduled',
    message: 'Your interview with DesignHub is scheduled for Dec 5 at 2:00 PM',
    time: '1 day ago',
    type: 'interview',
    read: true,
    link: '/candidate/applications'
  },
  {
    id: '4',
    title: 'Application Submitted',
    message: 'Your application for Full Stack Developer at StartupXYZ has been submitted successfully',
    time: '2 days ago',
    type: 'application',
    read: true,
    link: '/candidate/applications'
  },
  {
    id: '5',
    title: 'Complete Your Application',
    message: 'Reminder: Your Data Analyst application at Analytics Pro is still in draft',
    time: '3 days ago',
    type: 'reminder',
    read: true,
    link: '/application/xyz789?demo=candidate'
  }
];

// Employer notifications
const employerNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Application Submitted',
    message: 'Sarah Johnson submitted her application for Senior Product Manager',
    time: '1 hour ago',
    type: 'candidate_submitted',
    read: false,
    link: '/application/abc123?demo=employer'
  },
  {
    id: '2',
    title: 'Interview Reminder',
    message: 'You have an interview with Mike Chen tomorrow at 2:00 PM',
    time: '5 hours ago',
    type: 'interview',
    read: false,
    link: '/employer/saved-candidates'
  },
  {
    id: '3',
    title: 'New Application Submitted',
    message: 'Emily Davis submitted her application for UX Designer',
    time: '1 day ago',
    type: 'candidate_submitted',
    read: true,
    link: '/application/def456?demo=employer'
  },
  {
    id: '4',
    title: 'Profile Update Reminder',
    message: 'Complete your company profile to attract more candidates',
    time: '2 days ago',
    type: 'reminder',
    read: true,
    link: '/employer/profile'
  }
];

// Admin notifications
const adminNotifications: Notification[] = [
  {
    id: '1',
    title: 'Application Link Created',
    message: 'New application link generated for Senior Product Manager at TechCorp',
    time: '30 minutes ago',
    type: 'system',
    read: false,
    link: '/admin/pipeline'
  },
  {
    id: '2',
    title: 'Application Submitted',
    message: 'Sarah Johnson completed her application for Senior Product Manager',
    time: '2 hours ago',
    type: 'candidate_submitted',
    read: false,
    link: '/admin/pipeline'
  },
  {
    id: '3',
    title: 'Employer Action',
    message: 'TechCorp Inc. expressed interest in Sarah Johnson',
    time: '4 hours ago',
    type: 'employer_action',
    read: true,
    link: '/admin/pipeline'
  },
  {
    id: '4',
    title: 'Analysis Failed',
    message: 'AI analysis failed for application #12345. Manual review required.',
    time: '1 day ago',
    type: 'system',
    read: true,
    link: '/admin/pipeline'
  }
];

interface NotificationsPageProps {
  userRole?: UserRole;
}

export default function NotificationsPage({ userRole = 'candidate' }: NotificationsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get role from URL param for demo purposes, default to prop or 'candidate'
  const demoRole = searchParams.get('role') as UserRole | null;
  const effectiveRole = demoRole || userRole;

  // Get notifications based on role
  const getInitialNotifications = () => {
    switch (effectiveRole) {
      case 'employer':
        return employerNotifications;
      case 'internal':
        return adminNotifications;
      default:
        return candidateNotifications;
    }
  };

  const [notificationList, setNotificationList] = useState(getInitialNotifications());

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'interest': return 'bg-[#FFE2EF]';
      case 'analysis': return 'bg-[#E2ECFF]';
      case 'interview': return 'bg-[#E1FFDE]';
      case 'application': return 'bg-[#E8F5E9]';
      case 'reminder': return 'bg-[#FFF8E1]';
      case 'candidate_submitted': return 'bg-[#E3F2FD]';
      case 'employer_action': return 'bg-[#FCE4EC]';
      case 'system': return 'bg-[#F6F6F6]';
      default: return 'bg-[#F6F6F6]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'interest': return <Heart className="w-5 h-5 text-[#E91E63]" />;
      case 'analysis': return <CheckCircle className="w-5 h-5 text-[#3D80F8]" />;
      case 'interview': return <Calendar className="w-5 h-5 text-[#4CAF50]" />;
      case 'application': return <FileText className="w-5 h-5 text-[#2E7D32]" />;
      case 'reminder': return <AlertCircle className="w-5 h-5 text-[#FF9800]" />;
      case 'candidate_submitted': return <Users className="w-5 h-5 text-[#1565C0]" />;
      case 'employer_action': return <Building2 className="w-5 h-5 text-[#D81B60]" />;
      case 'system': return <Bell className="w-5 h-5 text-[#676767]" />;
      default: return <Bell className="w-5 h-5 text-[#676767]" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <DashboardLayout userRole={effectiveRole}>
      <div className="flex-1 bg-white rounded-tl-3xl min-h-screen">
        <TopBar title="Notifications" showBack />

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-[#1A1A1A]">All Notifications</h2>
              {notificationList.filter(n => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {notificationList.filter(n => !n.read).length}
                </span>
              )}
            </div>
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#3D80F8] hover:text-[#2A5CC5] font-medium"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notificationList.map(notification => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`bg-white border border-[#EDEDED] rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${
                  !notification.read ? 'border-l-4 border-l-[#3D80F8]' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`text-sm text-[#1A1A1A] ${!notification.read ? 'font-bold' : 'font-medium'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-[#676767] mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#3D80F8] rounded-full mt-1"></div>
                      )}
                    </div>
                    <span className="text-xs text-[#969699] mt-2 inline-block">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {notificationList.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#F6F6F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-12 h-12 text-[#ACACAF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No notifications</h3>
              <p className="text-sm text-[#676767]">You&apos;re all caught up!</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}
