const express = require('express');
const { Web3 } = require('web3');
const fs = require('fs').promises;

// Replace these values with your actual ones
const nodeUrl = 'http://localhost:7545';  // Ganache default URL

const app = express();
const port = 3000;

async function startApp() {
    const MyContract = JSON.parse(
        await fs.readFile("./build/contracts/DutchAuction.json", "utf-8")
    );

    const web3 = new Web3(nodeUrl);

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];

    const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);

    let currentPrice = await contract.methods.startingPrice().call();
    const reservePrice = await contract.methods.reservePrice().call();
    const biddingInterval = await contract.methods.biddingInterval().call();

    // Display initial price
    console.log(`Initial Price: ${web3.utils.fromWei(currentPrice.toString(), 'ether')} ETH`);

    // Update price periodically every 10 seconds until it reaches the reserve price
    const priceUpdateInterval = setInterval(async () => {
        // Reduce the price (replace with your actual logic to determine the new price)
        const reductionAmount = BigInt('10');  // Reduce by 1 ETH for simplicity
        currentPrice -= reductionAmount;

        // Display the updated price
        console.log(`Current Price: ${web3.utils.fromWei(currentPrice.toString(), 'ether')} ETH`);

        // Check if the reserve price is reached
        if (currentPrice <= reservePrice) {
            console.log('Auction Ended - Reserve Price Reached');
            clearInterval(priceUpdateInterval);
        }
    }, 1000); // Run the interval every 10 seconds (10,000 milliseconds)

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startApp().catch(error => console.error(error));
