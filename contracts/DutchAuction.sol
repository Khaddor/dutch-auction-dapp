// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DutchAuction {
    address public seller;

    // Array to store auction details
    struct Auction {
        uint256 id;
        address highestBidder;
        uint256 currentPrice;
        bool ended;
    }

    Auction[] public auctions; // Array to store all auctions

    uint256 public startingPrice;
    uint256 public reservePrice;
    uint256 public biddingInterval;
    uint256 public auctionEndTime;

    bool public auctionEnded;

    event BidPlaced(address indexed bidder, uint256 amount, uint256 auctionId);
    event AuctionEnded(address indexed winner, uint256 amount, uint256 auctionId);

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
        biddingInterval = _biddingInterval;
        auctionEndTime = block.timestamp + _auctionDuration;

        // Create an initial auction
        createAuction();
    }

    function createAuction() internal {
        uint256 auctionId = auctions.length;
        auctions.push(Auction(auctionId, address(0), startingPrice, false));
    }

    function getAllAuctions() external view returns (Auction[] memory) {
        return auctions;
    }

    function placeBid(uint256 auctionId) external payable onlyBeforeEnd {
    require(auctionId < auctions.length, "Invalid auction ID");
    Auction storage currentAuction = auctions[auctionId];
    
    require(!currentAuction.ended, "Auction has already ended");
    require(msg.value >= currentAuction.currentPrice, "Bid amount is too low");

    if (msg.value > currentAuction.currentPrice) {
        currentAuction.currentPrice = msg.value;
        currentAuction.highestBidder = msg.sender;
        emit BidPlaced(msg.sender, msg.value, auctionId);
    }
}


    function endAuction(uint256 auctionId) external onlySeller onlyAfterEnd {
        require(auctionId < auctions.length, "Invalid auction ID");
        Auction storage currentAuction = auctions[auctionId];

        require(!currentAuction.ended, "Auction already ended");

        if (currentAuction.highestBidder == address(0)) {
            // No bids received, auction unsuccessful
            currentAuction.ended = true;
        } else {
            // Transfer the item to the highest bidder
            payable(seller).transfer(currentAuction.currentPrice);
            emit AuctionEnded(currentAuction.highestBidder, currentAuction.currentPrice, auctionId);
            currentAuction.ended = true;

            // Create a new auction after ending the current one
            createAuction();
        }
    }
}
