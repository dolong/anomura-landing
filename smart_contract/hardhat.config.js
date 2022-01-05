//https://eth-ropsten.alchemyapi.io/v2/mdDQT8vEGtlr8E5ZMyWfeqZrg_TwYaL9
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/mdDQT8vEGtlr8E5ZMyWfeqZrg_TwYaL9",
      accounts: ["nonono"]
    }
  }
}