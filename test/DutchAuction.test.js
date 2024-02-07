const DutchAuction = artifacts.require('DutchAuction');

contract('DutchAuction', (accounts) => {
  let dutchAuction;

  const seller = accounts[0];
  const bidder = accounts[1];
  const startingPrice = web3.utils.toWei('1', 'ether');
  const reservePrice = web3.utils.toWei('0.5', 'ether');
  const biddingInterval = 3600; // 1 hour
  const auctionDuration = 3600; // 1 hour

  beforeEach(async () => {
    dutchAuction = await DutchAuction.new(startingPrice, reservePrice, biddingInterval, auctionDuration, {
      from: seller,
    });
  });

  it('should initialize correctly', async () => {
    assert.equal(await dutchAuction.seller(), seller);
    assert.equal(await dutchAuction.startingPrice(), startingPrice);
    assert.equal(await dutchAuction.reservePrice(), reservePrice);
    assert.equal(await dutchAuction.currentPrice(), startingPrice);
    assert.equal(await dutchAuction.biddingInterval(), biddingInterval);
    assert.equal(await dutchAuction.auctionEndTime(), (await web3.eth.getBlock('latest')).timestamp + auctionDuration);
    assert.equal(await dutchAuction.auctionEnded(), false);
  });

  it('should allow a bid to be placed', async () => {
    const bidAmount = web3.utils.toWei('1.5', 'ether');

    await dutchAuction.placeBid({ from: bidder, value: bidAmount });

    assert.equal(await dutchAuction.highestBidder(), bidder);
    assert.equal(await dutchAuction.currentPrice(), bidAmount);
  });

  it('should not allow a bid below current price', async () => {
    const bidAmount = web3.utils.toWei('0.5', 'ether');

    try {
      await dutchAuction.placeBid({ from: bidder, value: bidAmount });
      assert.fail('Bid should have failed');
    } catch (error) {
      assert.include(error.message, 'Bid amount is too low');
    }
  });

//   it('should end auction successfully', async () => {
//     const bidAmount = web3.utils.toWei('1.5', 'ether');

//     await dutchAuction.placeBid({ from: bidder, value: bidAmount });
//     await dutchAuction.endAuction({ from: seller });

//     assert.equal(await dutchAuction.auctionEnded(), true);
//     assert.equal(await web3.eth.getBalance(seller), startingPrice); // Seller receives the bid amount
//   });

//   it('should end auction unsuccessfully if no bids are received', async () => {
//     await dutchAuction.endAuction({ from: seller });

//     assert.equal(await dutchAuction.auctionEnded(), true);
//     assert.equal(await web3.eth.getBalance(seller), startingPrice); // Seller retains the item
//   });
});
