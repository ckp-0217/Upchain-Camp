// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract counter {
    uint256 public x;

    function add() external returns (uint256) {
        return x++;
    }
}