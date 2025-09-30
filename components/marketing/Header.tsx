'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Dot, Menu, Search } from 'lucide-react';
import LoginForm from '../forms/LoginForm';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="h-[88vh] w-full bg-sky-700 bg-[url('/images/acled-homepage-defualt-banner.jpeg.webp')] bg-cover bg-center bg-no-repeat shadow-md">
      <div className='flex h-[12vh] w-full items-center justify-between bg-sky-900 px-16 shadow-md'>
        <p>
          Important: Our legacy API function is now switched off as of 15
          September. If you haven&apos;t already, please re-register and switch
          to our new API.
        </p>
        <div className='flex justify-between space-x-6'>
          <button
            className='text-md rounded-3xl bg-amber-400 px-6 py-3 font-semibold text-sky-950 hover:bg-amber-300'
            onClick={() => setIsOpen(!isOpen)}
          >
            Re-register
          </button>
          <button
            className='rounded-3xl bg-amber-400 px-4 py-2 text-2xl text-sky-950 hover:bg-amber-300'
            onClick={() => setIsOpen(!isOpen)}
          >
            X
          </button>
        </div>
      </div>

      <div className='container mx-auto flex w-full items-center justify-between pt-12'>
        <h1 className='text-3xl font-semibold text-white'>XCLED</h1>
        <div className='flex items-center justify-between space-x-4 text-lg'>
          <nav className='relative flex space-x-4 text-lg text-white'>
            {/* About */}
            <div className='group relative'>
              <Link
                href='/'
                className='inline-block px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              >
                About
              </Link>
              <ul className='text-md pointer-events-none absolute left-0 mt-1 w-60 rounded-xl bg-white text-sky-700 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
                <li>
                  <Link
                    href='/about/company'
                    className='block px-4 py-1 hover:rounded-xl hover:bg-blue-100'
                  >
                    Our Impact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/team'
                    className='block px-4 py-1 hover:bg-blue-100'
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/careers'
                    className='block px-4 py-1 hover:bg-blue-100'
                  >
                    Local Network
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/careers'
                    className='block px-4 py-1 hover:bg-blue-100'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/careers'
                    className='block px-4 py-1 hover:bg-blue-100'
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/careers'
                    className='block px-4 py-1 hover:bg-blue-100'
                  >
                    Media
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about/careers'
                    className='block px-4 py-1 hover:rounded-xl hover:bg-blue-100'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Global analysis */}
            <div className='group relative'>
              <Link
                href='/'
                className='inline-block px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              >
                Global analysis
              </Link>
              <ul className='pointer-events-none absolute left-0 mt-1 w-60 rounded-xl bg-white text-sky-700 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
                <li>
                  <Link
                    href='/analysis/conflict'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Conflict Reports
                  </Link>
                </li>
                <li>
                  <Link
                    href='/analysis/protest'
                    className='block px-4 py-2 hover:bg-blue-100'
                  >
                    Protest Data
                  </Link>
                </li>
                <li>
                  <Link
                    href='/analysis/trends'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Trends
                  </Link>
                </li>
              </ul>
            </div>

            {/* Regions */}
            <div className='group relative'>
              <Link
                href='/'
                className='inline-block px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              >
                Regions
              </Link>
              <ul className='pointer-events-none absolute left-0 mt-1 w-60 rounded-xl bg-white text-sky-700 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
                <li>
                  <Link
                    href='/regions/africa'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Africa
                  </Link>
                </li>
                <li>
                  <Link
                    href='/regions/asia'
                    className='block px-4 py-2 hover:bg-blue-100'
                  >
                    Asia
                  </Link>
                </li>
                <li>
                  <Link
                    href='/regions/europe'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Europe
                  </Link>
                </li>
              </ul>
            </div>

            {/* Conflict data */}
            <div className='group relative'>
              <Link
                href='/'
                className='inline-block px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              >
                Conflict data
              </Link>
              <ul className='pointer-events-none absolute left-0 mt-1 w-60 rounded-xl bg-white text-sky-700 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
                <li>
                  <Link
                    href='/data/incidents'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Incidents
                  </Link>
                </li>
                <li>
                  <Link
                    href='/data/actors'
                    className='block px-4 py-2 hover:bg-blue-100'
                  >
                    Actors
                  </Link>
                </li>
                <li>
                  <Link
                    href='/data/statistics'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Statistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Spotlight areas */}
            <div className='group relative'>
              <Link
                href='/'
                className='inline-block px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              >
                Spotlight areas
              </Link>
              <ul className='pointer-events-none absolute left-0 mt-1 w-60 rounded-xl bg-white text-sky-700 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'>
                <li>
                  <Link
                    href='/spotlight/syria'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Syria
                  </Link>
                </li>
                <li>
                  <Link
                    href='/spotlight/yemen'
                    className='block px-4 py-2 hover:bg-blue-100'
                  >
                    Yemen
                  </Link>
                </li>
                <li>
                  <Link
                    href='/spotlight/ukraine'
                    className='block px-4 py-2 hover:rounded-xl hover:bg-blue-100'
                  >
                    Ukraine
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div>
            <Dot size={40} color='#172554' />
          </div>
          <div className='flex items-center justify-between space-x-4 text-lg'>
            <button
              className='px-3 py-2 hover:rounded-3xl hover:bg-blue-950 hover:text-amber-200'
              onClick={() => setShowLogin(prev => !prev)}
            >
              Log in
            </button>
            <button
              className='rounded-3xl bg-amber-400 px-6 py-2 font-semibold text-sky-950 hover:bg-blue-950 hover:text-amber-200'
              onClick={() => setShowLogin(prev => !prev)}
            >
              Register
            </button>
            <button
              className='text-md rounded-3xl bg-amber-400 px-3 py-3 font-semibold text-sky-950 hover:bg-blue-950 hover:text-amber-200'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Search />
            </button>
            <button
              className='text-md rounded-3xl bg-amber-400 px-3 py-3 font-semibold text-sky-950 hover:bg-blue-950 hover:text-amber-200'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>
      {/* Login Form (conditionally rendered) */}
      {showLogin && <LoginForm />}
      <div className='container mx-auto grid grid-cols-12 gap-6 border-b border-white pt-52 pb-12 text-white'>
        <p className='col-span-12 text-5xl font-semibold md:col-span-8 md:text-7xl'>
          Clarity in Crisis
        </p>
        <p className='col-span-12 w-80 md:col-span-4'>
          XCLED is an independent, impartial conflict monitor providing
          real-time data and analysis on violent conflict and protest in all
          countries and territories across the world.
        </p>
      </div>
      <div className='container mx-auto flex items-center space-x-3 pt-6'>
        <p className='font-semibold uppercase'>explore data</p>
        <button
          className='rounded-3xl bg-amber-400 px-2 py-2 text-2xl text-sky-950 hover:bg-amber-300'
          onClick={() => setIsOpen(!isOpen)}
        >
          <ArrowRight />
        </button>
      </div>
    </header>
  );
};

export default Header;
