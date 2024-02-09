import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4 flex items-center justify-center">
        <a className="text-blue-500 hover:text-blue-700 mr-5"href="/">Home</a>
      <ul className="flex items-center space-x-4">
        <li>
            <a className="text-blue-500 hover:text-blue-700" href="/auctions">Auctions</a>
        </li>
        <li>
            <a className="text-blue-500 hover:text-blue-700" href="/newAuction">New Auction</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
