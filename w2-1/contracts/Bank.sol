// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title 银行合约
 * @dev 该合约实现了使用以太坊的简单银行系统。
 */
contract bank {
    mapping(address => uint256) public balances;

    // 以下事件用于记录存款和取款操作。
    event Withdraw(address indexed from, address indexed to, uint256 amount);
    event Deposit(address indexed from, address indexed to, uint256 amount);

    /**
     * @dev 该函数允许用户从余额中提取资金。
     * @param to 要转移资金的地址。
     * @param amount 要提取的资金数量。
     */
    function withdraw(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Your balance is insufficient");
        balances[msg.sender] -= amount;
        payable(to).transfer(amount);
        emit Withdraw(msg.sender, to, amount);
    }

    /**
     * @dev 该函数允许用户将资金存入余额中。
     * @param from 资金发送方的地址。
     */
    function deposit(address from) external payable {
        balances[from] += msg.value;
        emit Deposit(msg.sender, from, msg.value);
    }

    /**
     * @dev 该函数用于接收发送到合约的以太币。
     */
    receive() external payable {
        if (msg.value > 0) {
            balances[msg.sender] += msg.value;
            emit Deposit(msg.sender, msg.sender, msg.value);
        }
    }
}
