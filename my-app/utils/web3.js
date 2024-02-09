// utils/web3.js
import Web3 from 'web3';
import DutchAuctionABI from '../../build/contracts/DutchAuction.json';

const web3 = new Web3('http://127.0.0.1:7545');

const getAuctions = async () => {
  // const contractAddress = '0x20509621722766ce70d121Cf4f99EBf7d8dEB31d';
  const contractAddress = '0x7350789a441D5b0bd21817745B86E2e080C41CF8';

  
  const contractABI = DutchAuctionABI.abi;

  try {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const auctions = await contract.methods.getAllAuctions().call({ from: accounts[0] });
    console.log('Auctions:', auctions);
    return auctions;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error; 
  }
};

const createAuction = async (startingPrice, reservePrice, biddingInterval, auctionDuration) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractABI = DutchAuctionABI.abi;

    const deployObject = {
      data: DutchAuctionABI.bytecode,
      arguments: [
        web3.utils.toWei(startingPrice.toString(), 'ether'),
        web3.utils.toWei(reservePrice.toString(), 'ether'),
        biddingInterval,
        auctionDuration
      ]
    };

    const transaction = await new web3.eth.Contract(contractABI)
      .deploy(deployObject)
      .send({ from: accounts[0], gas: 2000000 }); // Adjust gas value as needed

    console.log('Contract deployed at:', transaction.options.address);
  } catch (error) {
    console.error('Error creating auction:', error);
    throw error;
  }
};

export { getAuctions, createAuction };
