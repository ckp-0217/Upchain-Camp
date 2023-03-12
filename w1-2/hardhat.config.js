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
      accounts: ['deec5ebad6569f5eac6c45a23bf11cd86859ede32ac8b4734ce8483a453f0fa4']
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/YwApBtzyWPkPU4oudtNihJkvhre7v32R',
      accounts: ['deec5ebad6569f5eac6c45a23bf11cd86859ede32ac8b4734ce8483a453f0fa4']
    }
  },
  etherscan: {
    apiKey: {
      goerli: '7DB3XUDMGCRF9D1W4ZGUE8JZRIURN3RFH6',
      sepolia: '7DB3XUDMGCRF9D1W4ZGUE8JZRIURN3RFH6'
    }
  }
};
