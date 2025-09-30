'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/types';

type FormMode = 'login' | 'register';

export default function AuthForm() {
  const [mode, setMode] = useState<FormMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleModeSwitch = (newMode: FormMode) => {
    setMode(newMode);
    resetForm();
  };

  const validateForm = (): boolean => {
    if (mode === 'register') {
      if (!name.trim()) {
        setError('Name is required');
        return false;
      }
    }

    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === 'login' ? '/auth/users/login' : '/auth/users/register';
      const payload =
        mode === 'login' ? { email, password } : { name, email, password };

      const response = await axiosInstance.post(endpoint, payload);

      const { user, token } = response.data;

      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${token}`;

      // Redirect based on mode
      const redirectPath = mode === 'login' ? '/dashboard' : '/login';
      router.replace(redirectPath);
    } catch (err: unknown) {
      console.error(`${mode} error:`, err);

      // Error handling
      if (typeof err === 'object' && err !== null) {
        // Axios error with response
        if (
          'response' in err &&
          err.response &&
          typeof err.response === 'object'
        ) {
          const axiosError = err as AxiosError<ApiErrorResponse>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            `${mode === 'login' ? 'Login' : 'Registration'} failed. Please try again.`;
          setError(errorMessage);
        }
        // Axios error without response (network error)
        else if ('request' in err) {
          setError('Network error. Please check your connection.');
        }
        // Standard Error object
        else if ('message' in err && typeof err.message === 'string') {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError(`An unexpected error occurred. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center bg-transparent px-4 pt-8 pb-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white/70 p-8 shadow-xl backdrop-blur-md'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {mode === 'login'
              ? 'Log in to your account'
              : 'Create a new account'}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Security Update Dashboard
          </p>
        </div>

        {/* Mode Toggle */}
        <div className='text-center'>
          <span className='text-sm text-gray-600'>
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type='button'
              onClick={() =>
                handleModeSwitch(mode === 'login' ? 'register' : 'login')
              }
              className='font-medium text-blue-600 hover:text-blue-500 focus:outline-none'
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </span>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div className='rounded-md border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700'>
              {error}
            </div>
          )}

          <div className='-space-y-px rounded-md shadow-sm'>
            {mode === 'register' && (
              <div>
                <label htmlFor='name' className='sr-only'>
                  Full Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  required
                  className='bg-opacity-90 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm'
                  placeholder='Full Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className={`bg-opacity-90 relative block w-full appearance-none border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm ${
                  mode === 'register'
                    ? 'rounded-none'
                    : 'rounded-none rounded-t-md'
                }`}
                placeholder='Email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete={
                  mode === 'login' ? 'current-password' : 'new-password'
                }
                required
                className={`bg-opacity-90 relative block w-full appearance-none border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm ${
                  mode === 'register' && confirmPassword
                    ? 'rounded-none'
                    : mode === 'login'
                      ? 'rounded-none rounded-b-md'
                      : 'rounded-none rounded-b-md'
                }`}
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {mode === 'register' && (
              <div>
                <label htmlFor='confirmPassword' className='sr-only'>
                  Confirm Password
                </label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  required
                  className='bg-opacity-90 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-sky-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              {loading ? (
                <span className='flex items-center'>
                  <svg
                    className='mr-3 -ml-1 h-5 w-5 animate-spin text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  {mode === 'login' ? 'Loging in...' : 'Creating account...'}
                </span>
              ) : mode === 'login' ? (
                'Log in'
              ) : (
                'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
