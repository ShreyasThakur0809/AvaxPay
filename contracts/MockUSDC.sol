// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title MockUSDC
 * @dev Mock USDC token for testing on Fuji testnet
 * @notice This is ONLY for testing - not real USDC!
 */
contract MockUSDC {
    string public name = "Mock USD Coin";
    string public symbol = "USDC";
    uint8 public decimals = 6;  // Real USDC uses 6 decimals
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 initialSupply) {
        // Mint initial supply to deployer
        totalSupply = initialSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid recipient");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "Invalid spender");
        
        allowance[msg.sender][spender] = amount;
        
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        require(to != address(0), "Invalid recipient");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
    
    // Mint function for testing (anyone can mint in testnet)
    function mint(address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient");
        
        uint256 actualAmount = amount * 10**decimals;
        balanceOf[to] += actualAmount;
        totalSupply += actualAmount;
        
        emit Transfer(address(0), to, actualAmount);
    }
}
