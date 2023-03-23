// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Vault {
    mapping(address => mapping(address => uint)) balances;

    function deposite(address _tokenAddress, uint _amount) external {
        IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
        balances[_tokenAddress][msg.sender] += _amount;
    }

    function withdraw(address _tokenAddress,uint _amount) external {
        balances[_tokenAddress][msg.sender] -= _amount;
        IERC20(_tokenAddress).transfer(msg.sender, _amount);
    }
}
