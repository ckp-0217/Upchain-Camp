// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract counter {
    uint256 public x;
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function count() external returns (uint256) {
        require(msg.sender == owner, "No owner permission");
        return x++;
    }
}
