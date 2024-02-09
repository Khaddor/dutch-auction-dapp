import Web3 from 'web3';
import DutchAuctionABI from '../../build/contracts/DutchAuction.json';

const getAuctions = async () => {
  const web3 = new Web3('http://127.0.0.1:7545');

  const contractAddress = '0x20509621722766ce70d121Cf4f99EBf7d8dEB31d';
  const contractABI = DutchAuctionABI.abi;

  try {
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const auctions = await contract.methods.getAllAuctions().call({ from: accounts[0] });
    console.log('Auctions:', auctions);

    return auctions;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error; // rethrow the error for handling in the calling code
  }
};

export default getAuctions;
