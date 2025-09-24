"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="h-full w-64 bg-white py-4 shadow-lg">
      <nav className="flex h-full flex-col p-4">
        {/* Main Navigation */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Main Navigation
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/conflicts"
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/dashboard/conflicts"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                🌍 All Regions
              </Link>
            </li>
          </ul>
        </div>

        {/* Regions Section */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Regions
          </h2>
          <ul className="space-y-2">
            {regions.map((region) => (
              <li key={region.name}>
                <Link
                  href={region.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === region.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
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
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Insights
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/analytics"
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/dashboard/analytics"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                📈 Analytics
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-grow" />
        <div className="border-t pt-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/logout"
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
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
