require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/",
    },
    sepolia:{
      url:`https://sepolia.infura.io/v3/${process.env.API_KEY}`,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};