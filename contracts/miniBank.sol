// // SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

import "./Token.sol";

contract miniBank{
    // assign Token contract to variable
    Token private token;

    // add mapping
    mapping(address => uint) public etherBalanceOf;
    mapping(address => uint) public depositStart;
    mapping(address => bool) public isDeposited;



    // add   events
    event Deposit(address indexed user, uint ethAmount, uint timestamp);
    event Withdraw(address indexed user, uint ethAmount, uint depositTime, uint interest);
    // pass as constructor argument deployed Token contract

    constructor(Token _token) public {
        // assign token deployed contract to variable
        token = _token;
    }


    function deposit() public payable  {
        // check if msg.sender didnt already deposited funds
        require(isDeposited[msg.sender] == false, "already deposited");
        // check if msg.value is >= than 0.01 ETH
        require(msg.value>=1e16, "deposit must be >= 0.01 ETH");


        // increase msg.sender ether deposit funds 
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;

        // start msg.sender hodling time
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        // set msg.sender deposit status to true 
        isDeposited[msg.sender]==true;

        // emit Deposit event
        emit Deposit(msg.sender, msg.value,block.timestamp);

    }

    function withdraw() public {
        // check if msg.sender deposit status is true
        require(isDeposited[msg.sender] == true, "You have no deposit"); 

        // assign msg.sender ether deposit bal to variable for event
        uint userBalance = etherBalanceOf[msg.sender]; 

        //  check users hold time
        uint depositTime = block.timestamp - depositStart[msg.sender];

        // calc interest per sec 
        uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender]/1e16);
        // calc accrued interest
        uint interest = interestPerSecond * depositTime;

        // send eth to user
        (payable(msg.sender)).transfer(userBalance);

        // send interest in tokens to user
        token.mint(msg.sender, interest);  
 
        // reset depositor data
        depositStart[msg.sender] =0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        // emit Withdrawal event event
        emit Withdraw(msg.sender, userBalance, depositTime, interest);

    }
}