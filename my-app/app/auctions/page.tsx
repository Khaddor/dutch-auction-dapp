'use client' 
import React, { useEffect, useState } from 'react';
import { getAuctions } from '../../utils/web3';
import Navbar from '../Navbar';

const AuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionsData = await getAuctions();
        setAuctions(auctionsData);
      } catch (error) {
        console.error('Error fetching auctions:', error.message);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Auctions</h1>
      <ul className="list-disc pl-6">
        {auctions.map((auction) => (
          <li key={auction.id} className="mb-4">
            <p className="text-lg font-semibold">Auction ID: {auction.id}</p>
            <p>Highest Bidder: {auction.highestBidder}</p>
            <p>Current Price: {auction.currentPrice.toString()}</p>
            <p>Ended: {auction.ended ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionsPage;
