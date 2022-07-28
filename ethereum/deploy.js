//npm modules
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//compiled smart contracts
const compiledFactory = require("./build/Factory.json");

//setup rinkeby account
const provider = new HDWalletProvider(
  "prefer output citizen artwork major aunt moment hero spot asthma quick report",
  "https://rinkeby.infura.io/v3/ce4c9d4f09204bf58decc5edbffe4d38"
);
const web3 = new Web3(provider);

//setup deployment of factory
const deployFactory = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "1400000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
  return result.options.address;
};

module.exports = deployFactory;


/*
const compiledSmartWill = require("./build/SmartWill.json");
const compiledBankAccount = require("./build/BankAccount.json");

//setup deployment of smartWill
const deploySmartWill = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy smartWill from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledSmartWill.interface)
  )
    .deploy({ data: compiledSmartWill.bytecode, arguments: [accounts[0]] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("smartWill deployed to", result.options.address);
  provider.engine.stop();
  return result.options.address;
};

//setup deployment of bankAccount
const deployBankAccount = async (
  accountName,
  bankName,
  branchNumber,
  accountNumber,
  accountDigit
) => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy bankAccount from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledBankAccount.interface)
  )
    .deploy({
      data: compiledBankAccount.bytecode,
      arguments: [
        accounts[0],
        accountName,
        bankName,
        branchNumber,
        accountNumber,
        accountDigit,
      ],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
  return result.options.address;
};

module.exports = {
  deploySmartWill,
  deployBankAccount,
};
*/