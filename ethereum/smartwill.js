//project module
import web3 from "./web3";
//compiled smart contract
import SmartWill from "./build/SmartWill.json";

//pass address of the 'SmartWill' to web3
const instance = (address) => {
  return new web3.eth.Contract(SmartWill.abi, address);
};

export default instance;
