import {ethers} from 'ethers';
import DutchAuctionABI from '/home/mehdi/Documents/workspace/blockchain/dutch-auction-dapp/build/contracts/DutchAuction.json';

const getAuctions = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
  // const provider = new ethers.BrowserProvider(window.ethereum);

  const contractAddress = '0x20509621722766ce70d121Cf4f99EBf7d8dEB31d';
  const contractABI = DutchAuctionABI.abi;

  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const auctions = await contract.getAllAuctions();

  return auctions;
};

export { getAuctions };
