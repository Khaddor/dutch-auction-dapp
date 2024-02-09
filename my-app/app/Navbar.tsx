// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/auctions">Auctions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
