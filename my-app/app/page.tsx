// pages/Page.js
import React from 'react';
import AuthComponent from './AuthComponent';
import Navbar from './Navbar';
import Link from 'next/link';


const Page = () => {
  return (
      // <div
      //   className=""
      //   style={{
      //     backgroundColor: '#E2DFD2',
      //     padding: '5px',
      //     minHeight: '100vh',
      //     display: 'flex',
      //     flexDirection: 'column',
      //   }}
      // >
      <div>
      <Navbar />
      <AuthComponent />
      {/* <Link href="/example">Go to Test</Link> */}
    </div>
  );
};

export default Page;
