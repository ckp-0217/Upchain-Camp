require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
// require('hardhat-abi-exporter')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1ffffffff,
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/shdu4odG9tIK91rz0J9cXOcJZYM5tg06',
      accounts: ['']
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/YwApBtzyWPkPU4oudtNihJkvhre7v32R',
      accounts: ['']
    }
  },
  etherscan: {
    apiKey: {
      goerli: '7DB3XUDMGCRF9D1W4ZGUE8JZRIURN3RFH6',
      sepolia: '7DB3XUDMGCRF9D1W4ZGUE8JZRIURN3RFH6'
    }
  }
};
