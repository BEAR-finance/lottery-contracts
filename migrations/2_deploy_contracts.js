const Lottery = artifacts.require("Lottery");
// const MockBEP20 = artifacts.require("MockBEP20");
const LotteryNFT = artifacts.require("LotteryNFT");
// const LotteryUpgradeProxy = artifacts.require("LotteryUpgradeProxy");

// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')); // testnet - https://data-seed-prebsc-1-s1.binance.org:8545

module.exports = async function (deployer) {
    await deployer.deploy(LotteryNFT);
    // const pbear = await MockBEP20.at('0xB3B10Fa2668a940Ee98fA79c312B430d86768C71'); // the actual token for the lottery
    await deployer.deploy(Lottery);
    myAddress = '0x8570E3942d7F14BB3Dd51E2fB0A813Ce93d8e4C9';
    bearAddress = '0x0e43ded49fdfdbe58c182a20a67d61958541015e';
   // proxyAdmin = '0x8570E3942d7F14BB3Dd51E2fB0A813Ce93d8e4C9';
    lotteryOwner = myAddress;
    lotteryAdmin = myAddress;

    // const abiEncodeData = web3.eth.abi.encodeFunctionCall({
    //     "inputs": [
    //         {
    //             "internalType": "contract IERC20",
    //             "name": "_pbear",
    //             "type": "address"
    //         },
    //         {
    //             "internalType": "contract LotteryNFT",
    //             "name": "_lottery",
    //             "type": "address"
    //         },
    //         {
    //             "internalType": "uint8",
    //             "name": "_maxNumber",
    //             "type": "uint8"
    //         },
    //         {
    //             "internalType": "address",
    //             "name": "_owner",
    //             "type": "address"
    //         },
    //         {
    //             "internalType": "address",
    //             "name": "_adminAddress",
    //             "type": "address"
    //         }
    //     ],
    //     "name": "initialize",
    //     "outputs": [],
    //     "stateMutability": "nonpayable",
    //     "type": "function"
    // }, [pbear.address, LotteryNFT.address, '5', lotteryOwner, lotteryAdmin]);

    // await deployer.deploy(LotteryUpgradeProxy, Lottery.address, proxyAdmin, abiEncodeData);
    const lottery = await Lottery.deployed();
    await lottery.initialize(bearAddress, LotteryNFT.address, '1', '5', lotteryOwner, lotteryAdmin);
    // const lotteryNft = await LotteryNFT.deployed();
    // await lotteryNft.transferOwnership(myAddress);
};



