// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    // add minter variable
    address public minter;

    // add minter change event
    event MinterChanged(address indexed caller, address reciever);

    constructor () public payable ERC20("MINI Token", "MIT") {

        // asign initial minter
        minter = msg.sender;
    } 

    // add pass minter role function 
    function passMinterRole(address miniBank) public returns(bool) {
        require(msg.sender == minter, "only owner can change minter role");
        minter = miniBank;

        emit MinterChanged(msg.sender,miniBank);
        return true;
    }

    function mint(address account, uint256 amount) public {
        // check if msg. sender have minter role
        require (msg.sender == minter, "msg.sender does not have minter role");
        _mint(account, amount);
    }
}