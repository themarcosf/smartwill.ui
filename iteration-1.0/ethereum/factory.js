//npm module
import web3 from "./web3";
//compiled smart contract
import Factory from "./build/Factory.json";

//pass address of the 'factory' to web3
//TODO: declare address as ENV variable
const instance = new web3.eth.Contract(
  Factory.abi,
  "0x9C4aCE52f0Aa4053F67f7Ad11A0Def5A7E3Eb0FE"
);

export default instance;





