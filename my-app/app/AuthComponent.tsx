'use client' 
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const AuthComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const newWeb3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(newWeb3);
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    } else {
      console.error('No Ethereum provider detected. Install MetaMask!');
    }
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        setAccount(currentAccount);

        const weiBalance = await web3.eth.getBalance(currentAccount);
        const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
        setBalance(ethBalance);
      }
    };

    fetchAccountData();
  }, [web3]);

  return (
    <div className="text-center mt-8">
      {web3 && account ? (
        <div className="bg-green-200 p-4 rounded-md">
          <p className="text-lg font-semibold">Connected Account: {account}</p>
          <p className="text-lg">Wallet Balance: {balance} ETH</p>
        </div>
      ) : (
        <button
          onClick={() => connectWallet()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Connect with MetaMask
        </button>
      )}
    </div>
  );
};

export default AuthComponent;
