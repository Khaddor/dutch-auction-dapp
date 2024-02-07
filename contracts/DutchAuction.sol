// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DutchAuction {
    address public seller;
    address public highestBidder;
    uint256 public startingPrice;
    uint256 public reservePrice;
    uint256 public currentPrice;
    uint256 public biddingInterval;
    uint256 public auctionEndTime;

    bool public auctionEnded;

    event BidPlaced(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    modifier onlyBeforeEnd() {
        require(block.timestamp < auctionEndTime, "Auction has already ended");
        _;
    }

    modifier onlyAfterEnd() {
        require(block.timestamp >= auctionEndTime, "Auction is still ongoing");
        _;
    }

    constructor(
        uint256 _startingPrice,
        uint256 _reservePrice,
        uint256 _biddingInterval,
        uint256 _auctionDuration
    ) {
        seller = msg.sender;
        startingPrice = _startingPrice;
        reservePrice = _reservePrice;
        currentPrice = _startingPrice;
        biddingInterval = _biddingInterval;
        auctionEndTime = block.timestamp + _auctionDuration;
    }

    function placeBid() external payable onlyBeforeEnd {
        require(msg.value >= currentPrice, "Bid amount is too low");

        if (msg.value > currentPrice) {
            currentPrice = msg.value;
            highestBidder = msg.sender;
            emit BidPlaced(msg.sender, msg.value);
        }
    }

    function endAuction() external onlySeller onlyAfterEnd {
        require(!auctionEnded, "Auction already ended");
        
        if (highestBidder == address(0)) {
            // No bids received, auction unsuccessful
            auctionEnded = true;
        } else {
            // Transfer the item to the highest bidder
            payable(seller).transfer(currentPrice);
            emit AuctionEnded(highestBidder, currentPrice);
            auctionEnded = true;
        }
    }
}
