'use client'
import React, { useState } from 'react';
import { createAuction } from '../../utils/web3'; 
import Navbar from '../Navbar';


const CreateAuctionComponent = () => {
    const [startingPrice, setStartingPrice] = useState('');
    const [reservePrice, setReservePrice] = useState('');
    const [biddingInterval, setBiddingInterval] = useState('');
    const [auctionDuration, setAuctionDuration] = useState('');

    const handleCreateAuction = async (event) => {
        event.preventDefault();

        try {
            await createAuction(startingPrice, reservePrice, biddingInterval, auctionDuration); // Call the createAuction function with parameters
            alert('Auction created successfully!');
            // Optionally, you can redirect the user or perform other actions after creating the auction
        } catch (error) {
            console.error('Error creating auction:', error);
            alert('Failed to create auction. Please try again.');
        }
    };

    return (
    <div>
        <Navbar/>   
                <div className="text-center mt-6">
                    <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">New Auction</h3>
                    <div className="mt-6">
                        <form onSubmit={handleCreateAuction}>
                            <label>
                                Starting Price (ETH):
                                <input type="text" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} required/>
                            </label>
                            <br/>
                            <div className="mt-3">
                                <label>
                                    Reserve Price (ETH):
                                    <input type="text" value={reservePrice} onChange={(e) => setReservePrice(e.target.value)} required/>
                                </label>
                            </div>
                            <br/>
                            <div >
                                <label>
                                    Bidding Interval:
                                    <input type="number" value={biddingInterval} onChange={(e) => setBiddingInterval(e.target.value)} required/>
                                </label>
                            </div>
                            <br/>
                            <div >
                                <label>
                                    Auction Duration (seconds):
                                    <input type="number" value={auctionDuration} onChange={(e) => setAuctionDuration(e.target.value)} required/>
                                </label>
                            </div>
                            <br/>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Create Auction</button>
                        </form>
                    </div>
                </div>
 </div>

    );
};

export default CreateAuctionComponent;
