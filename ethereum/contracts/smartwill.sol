// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Factory {
    //state variables
    address[] public deployedSmartWills;

    //constructor function
    function createSmartWill() public {
        address newSmartWill = address(new SmartWill(msg.sender));
        deployedSmartWills.push(newSmartWill);
    }

    //method return list of deployed contracts
    function getDeployedSmartWills() public view returns(address[] memory) {
        return deployedSmartWills;
    }
}


contract SmartWill {
    //state variables
    address public manager;
    address[] public bankAccounts;
    uint public bankAccountsCount;

    //modifier restricts function calls to manager
    modifier restricted() {
        require(manager == msg.sender);
        _;
    }

    //constructor function
    constructor (address _manager) {
        manager = _manager;
    }

    //method to create a new bank account and store it on the smartwill
    function createBankAccount(
        string memory _accountName,
        string memory _bankName,
        uint _branchNumber,
        uint _accountNumber,
        uint _accountDigit
        ) public restricted {
        address newBankAccount = address(new BankAccount(
            manager,
            _accountName,
            _bankName,
            _branchNumber,
            _accountNumber,
            _accountDigit
        ));
        bankAccounts.push(newBankAccount);
        bankAccountsCount++;
    }

    //method return list of deployed bank accounts
    function getDeployedBankAccounts() public view returns(address[] memory) {
        return bankAccounts;
    }
}


contract BankAccount {
    //bank account structure
    struct AccountDetails {
        string accountName;
        string bankName;
        uint branchNumber;
        uint accountNumber;
        uint accountDigit;
        string password;
        string balance;
        string description;
    }

    //state variables
    address public manager;
    AccountDetails public account;

    //constructor method
    constructor (
        address _manager,
        string memory _accountName,
        string memory _bankName,
        uint _branchNumber,
        uint _accountNumber,
        uint _accountDigit
    ) {
        manager = _manager;
        account = AccountDetails({
            accountName: _accountName,
            bankName: _bankName,
            branchNumber: _branchNumber,
            accountNumber: _accountNumber,
            accountDigit: _accountDigit,
            password: "",
            balance: "",
            description: ""
        });
    }

    //method for setting bank account's optional parameters
    function setParameters(
        string memory _password,
        string memory _balance,
        string memory _description
    ) public {
        require(manager == msg.sender);
        account.password = _password;
        account.balance = _balance;
        account.description = _description;
    }
}