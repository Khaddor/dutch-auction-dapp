// AuthComponent.tsx
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
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(newWeb3);
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      // Legacy dApp browsers
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

        // Fetch balance
        const weiBalance = await web3.eth.getBalance(currentAccount);
        const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
        setBalance(ethBalance);
      }
    };

    fetchAccountData();
  }, [web3]);

  return (
    <div>
      {web3 && account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Wallet Balance: {balance} ETH</p>
        </div>
      ) : (
        <button onClick={() => connectWallet()}>Connect with MetaMask</button>
      )}
    </div>
  );
};

export default AuthComponent;
