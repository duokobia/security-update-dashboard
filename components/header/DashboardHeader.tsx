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
    <header className='border-b bg-white shadow-sm'>
      <div className='max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              href='/dashboard'
              className='text-lg font-semibold text-gray-900'
            >
              Security Dashboard
            </Link>
          </div>

          {/* Dashboard Navigation */}
          <nav className='flex items-center space-x-1'>
            {dashboardNav.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className='mr-2'>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className='flex items-center space-x-8'>
            <span className='text-sm text-gray-700'>Welcome, User</span>
            <Link
              href='/login'
              className='text-md rounded-lg px-4 py-1 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
