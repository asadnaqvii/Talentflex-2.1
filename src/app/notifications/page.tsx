import { Suspense } from 'react';
import NotificationsPage from "@/components/notifications/NotificationsPage";

function NotificationsFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Notifications() {
  return (
    <Suspense fallback={<NotificationsFallback />}>
      <NotificationsPage />
    </Suspense>
  );
}
