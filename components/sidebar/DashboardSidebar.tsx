'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const regions = [
    { name: 'Africa', href: '/dashboard/conflicts/africa', flag: '🇿🇦' },
    { name: 'Americas', href: '/dashboard/conflicts/americas', flag: '🇺🇸' },
    { name: 'Asia Pacific', href: '/dashboard/conflicts/asia-pacific', flag: '🌏' },
    { name: 'Australia', href: '/dashboard/conflicts/australia', flag: '🇺🇸' },
    { name: 'Europe', href: '/dashboard/conflicts/europe', flag: '🇪🇺' },
    { name: 'Middle East', href: '/dashboard/conflicts/middle-east', flag: '🌍' },
  ];

  return (
    <aside className="w-64 h-full bg-white shadow-lg py-4">
      <nav className="p-4 flex flex-col h-full">
        {/* Main Navigation */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Navigation
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/dashboard'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/conflicts"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/dashboard/conflicts'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🌍 All Regions
              </Link>
            </li>
          </ul>
        </div>

        {/* Regions Section */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Regions
          </h2>
          <ul className="space-y-2">
            {regions.map((region) => (
              <li key={region.name}>
                <Link
                  href={region.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === region.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{region.flag}</span>
                  {region.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Analytics Link */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Insights
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/analytics"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/dashboard/analytics'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📈 Analytics
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-grow" />
        <div className="pt-4 border-t">
          <ul className="space-y-2">
            <li>
              <Link
                href="/logout"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/login'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🚪 Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
