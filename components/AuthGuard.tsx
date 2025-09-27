// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     const token = localStorage.getItem('token');

//     if (!isAuthenticated || !token) {
//       router.push('/login');
//     }
//   }, [router]);

//   return <>{children}</>;
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication only on client side
    const checkAuth = () => {
      try {
        const isAuthenticated =
          localStorage.getItem('isAuthenticated') === 'true';
        const token = localStorage.getItem('token');

        const authValid = !!(isAuthenticated && token);
        setIsAuthenticated(authValid);

        if (!authValid) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  // Only render children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
