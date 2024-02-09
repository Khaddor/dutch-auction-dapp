const DutchAuction = artifacts.require("DutchAuction");

module.exports = function(deployer) {
    deployer.deploy(DutchAuction, 1000, 800, 10, 3600); 
    deployer.deploy(DutchAuction, 2000, 1500, 15, 7200); 

};
