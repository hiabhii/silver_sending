// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Lock {
    struct memo {
        string name;
        string message;
        uint timestramp;
        address from;
    }

    memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buysilver(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (memo[] memory) {
        return memos;
    }
}