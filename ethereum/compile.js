//core module
const path = require("path");
//npm modules
const solc = require("solc");
const fs = require("fs-extra");

//delete entire 'build' folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

//read 'smartwill.sol' from the 'contracts' folder
const smartWillPath = path.resolve(__dirname, "contracts", "smartwill.sol");
const source = fs.readFileSync(smartWillPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "smartwill.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

//compile contracts therein with solidity compiler
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "smartwill.sol"
];

//write output to the 'build' directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
