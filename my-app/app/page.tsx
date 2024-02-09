// pages/Page.js
import React from 'react';
import AuthComponent from './AuthComponent';
import Navbar from './Navbar';
import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <h1>Your Page Title</h1>
      <Navbar />
      <AuthComponent />
      {/* <Link href="/example">Go to Test</Link> */}
    </div>
  );
};

export default Page;
