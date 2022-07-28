//project module
import web3 from "./web3";
//compiled smart contract
import BankAccount from "./build/BankAccount.json";

//pass address of the 'bankAccount' to web3
//TODO: declare address as ENV variable
const instance = (address) => {
  return new web3.eth.Contract(BankAccount.abi, address);
};

export default instance;