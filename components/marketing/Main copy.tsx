import React from 'react';

const Main = () => {
  return (
    <main className='container mx-auto px-4 py-16 text-center'>
      <h2 className='mb-4 text-4xl font-bold'>Welcome to Our Marketing Page</h2>
      <p className='mb-6 text-lg text-gray-600'>
        We offer top-notch services to help your business grow online.
      </p>
      <button className='rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700'>
        Get Started
      </button>
    </main>
  );
};

export default Main;
