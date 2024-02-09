// Example usage in a component
import React, { useEffect, useState } from 'react';
import createAuctionContract from '../utils/auctionContract';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionContract = createAuctionContract();
        const auctionsCount = await auctionContract.methods.getAllAuctions().call();
        const auctionsData = [];

        for (let i = 0; i < auctionsCount; i++) {
          const auction = await auctionContract.methods.auctions(i).call();
          auctionsData.push(auction);
        }

        setAuctions(auctionsData);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h1>Available Auctions</h1>
      <ul>
        {auctions.map((auction, index) => (
          <li key={index}>
            <h3>Auction ID: {auction.id.toString()}</h3>
            <p>Highest Bidder: {auction.highestBidder}</p>
            <p>Current Price: {auction.currentPrice.toString()}</p>
            <p>Starting Price: {auction.startingPrice.toString()}</p>
            <p>Ended: {auction.ended ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auctions;
