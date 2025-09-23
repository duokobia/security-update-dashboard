// components/DashboardHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
  const pathname = usePathname();

  const dashboardNav = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'All Conflicts', href: '/dashboard/conflicts', icon: '🌍' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
              Security Dashboard
            </Link>
          </div>

          {/* Dashboard Navigation */}
          <nav className="flex items-center space-x-1">
            {dashboardNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-8">
            <span className="text-sm text-gray-700">Welcome, User</span>
            <Link
              href="/login"
              className="px-4 py-1 text-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}