// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Navigation items
  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Features", href: "/features", current: pathname === "/features" },
    {
      name: "Dashboard",
      href: "/dashboard",
      current: pathname.startsWith("/dashboard"),
    },
  ];

  return (
    <header className="border-b bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              SecurityDashboard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  item.current
                    ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
