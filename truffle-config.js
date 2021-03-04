const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

if(process.env.NODE_ENV === 'production') {
  require('dotenv').config({path: path.join(__dirname, '.env')});
} else {
  require('dotenv').config({path: path.join(__dirname, '.env.dev')});
}

module.exports = {
  contracts_build_directory: path.join(__dirname, "./compiled"),
  migrations_directory: path.join(__dirname, "./migrations"),
  contracts_directory: "./contracts",
  mocha: {
    reporter: 'eth-gas-reporter',
  },
  networks: {
    mainnet: {
      provider: () => new HDWalletProvider(process.env.KEY, `https://bsc-dataseed.binance.org/`),
      network_id: 56,
      confirmations: 2,      // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 10000,  // # of blocks before a deployment times out  (minimum/default: 50)
      gasPrice: 20000000000,
      gas:9721975,
      skipDryRun: true       // Skip dry run before migrations? (default: false for public nets )
    },
    testnet: {
      provider: () => new HDWalletProvider(process.env.KEY, `https://data-seed-prebsc-1-s1.binance.org:8545/`),
      network_id: 97,
      confirmations: 5,       // # of confs to wait between deployments. (default: 0)
      gasPrice: 20000000000,
      gas:9721975,
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true       // Skip dry run before migrations? (default: false for public nets )
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
       optimizer: {
         enabled: true,
         runs: 999999
       },
       evmVersion: "istanbul", 
       outputSelection: {
        "*": {
          "": [
            "ast"
          ],
          "*": [
            "evm.bytecode.object",
            "evm.deployedBytecode.object",
            "abi",
            "evm.bytecode.sourceMap",
            "evm.deployedBytecode.sourceMap",
            "metadata"
            ]
          },
        }
      }
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};

