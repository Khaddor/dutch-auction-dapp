// utils/auctionContract.js
import web3 from './web3';
import abi from '/home/mehdi/Documents/workspace/blockchain/dutch-auction-dapp/build/contracts/DutchAuction.json';
// import abi from 'build/contracts/DutchAuction.';


// Replace with your DutchAuction contract address and ABI
const contractAddress = '0x20509621722766ce70d121Cf4f99EBf7d8dEB31d';
const contractABI = abi;

const auctionContract = new web3.eth.Contract(contractABI, contractAddress);

export default auctionContract;


