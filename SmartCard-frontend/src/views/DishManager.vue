<template>
    <section class="page">
      <h1>DishManager</h1>
      <p>Get in touch with us.</p>
    </section>
  </template>
  
  <script>
  export default {
    name: 'DishManager',
  }
  </script>
  
  <style scoped>
  .page {
    padding: 1rem;
  }
  </style>
  
  
  


  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;

    // 存钱函数
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // 存在重入漏洞的提现函数
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // ⚠️ 问题在于：先转账，再更新余额
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");

        // ⚠️ 余额更新在转账之后，导致攻击者可重入
        balances[msg.sender] -= _amount;
    }

    // 查询合约余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}






