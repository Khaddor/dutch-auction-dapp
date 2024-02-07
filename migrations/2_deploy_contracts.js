const DutchAuction = artifacts.require("DutchAuction");

module.exports = function (deployer) {
  deployer.deploy(
    DutchAuction,
    100,  // startingPrice
    50,   // reservePrice
    10,   // biddingInterval
    300   // auctionDuration
  );
};
