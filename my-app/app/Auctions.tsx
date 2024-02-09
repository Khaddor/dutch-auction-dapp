// pages/auctions/index.js
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import auctionContract from '../utils/auctionContract';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      const auctionsCount = await auctionContract.methods.getAllAuctions().call();
      const auctionsData = [];

      for (let i = 0; i < auctionsCount; i++) {
        const auction = await auctionContract.methods.auctions(i).call();
        auctionsData.push(auction);
      }

      setAuctions(auctionsData);
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h1>Available Auctions</h1>
      <ul>
        {auctions.map((auction, index) => (
          <li key={index}>
            <Link href={`/auctions/${auction.id}`}>
              <a>{auction.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auctions;
