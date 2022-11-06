//built-in module
const assert = require("assert");
//npm modules
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
//compiled smart contracts
const compiledFactory = require("../ethereum/build/Factory.json");
const compiledSmartWill = require("../ethereum/build/SmartWill.json");
const compiledBankAccount = require("../ethereum/build/BankAccount.json");

//reusable variables
let accounts;
let factory;
let smartwill;
let smartwillAdress;
let bankAccount;
let bankAccountAddress;

//test setup
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createSmartWill()
    .send({ from: accounts[0], gas: "1000000" });

  [smartwillAdress] = await factory.methods.getDeployedSmartWills().call();
  smartwill = await new web3.eth.Contract(
    JSON.parse(compiledSmartWill.interface),
    smartwillAdress
  );

  await smartwill.methods
    .createBankAccount("Conta Principal", "Banco XPTO", 1234, 56789, 0)
    .send({ from: accounts[0], gas: "1000000" });

  [bankAccountAddress] = await smartwill.methods
    .getDeployedBankAccounts()
    .call();
  bankAccount = await new web3.eth.Contract(
    JSON.parse(compiledBankAccount.interface),
    bankAccountAddress
  );
});

//test factory functionalities
describe("factory tests", async () => {
  it("deploys factory contract", () => {
    assert.ok(factory.options.address);
  });

  it("returns list of deployed smartwills", async () => {
    assert(await factory.methods.getDeployedSmartWills().call());
  });
});

//test smartWill functionalities
describe("smartWill tests", () => {
  it("deploys smartWill contract", () => {
    assert.ok(smartwill.options.address);
  });
  it("identifies manager properly", async () => {
    const manager = await smartwill.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
});

//test bankAccount functionalities
describe("bankAccount tests", () => {
  it("deploys bankAccount contract", () => {
    assert.ok(bankAccount.options.address);
  });
  it("identifies manager properly", async () => {
    const manager = await bankAccount.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it("allow optional parameters", async () => {
    await bankAccount.methods
      .setParameters("abcde123", "R$ 40000", "Saldo pertence a Fulano")
      .send({ from: accounts[0], gas: "1000000" });
    const testAccount = await bankAccount.methods.account().call();
    assert.equal("abcde123", testAccount.password);
    assert.equal("R$ 40000", testAccount.balance);
    assert.equal("Saldo pertence a Fulano", testAccount.description);
  });
});
