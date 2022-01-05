//https://eth-ropsten.alchemyapi.io/v2/mdDQT8vEGtlr8E5ZMyWfeqZrg_TwYaL9
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/mdDQT8vEGtlr8E5ZMyWfeqZrg_TwYaL9",
      accounts: ["8419efa6d9d30f79359216ddad1f91e419d9c280a655ea63815768b2b0eb6877"]
    }
  }
}