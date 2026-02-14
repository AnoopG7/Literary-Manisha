'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main
        className={
          isLoginPage
            ? 'min-h-screen'
            : 'min-h-screen pt-16 md:ml-64'
        }
      >
        <div className={isLoginPage ? '' : 'p-4 sm:p-6 md:p-8'}>
          {children}
        </div>
      </main>
    </div>
  );
}
