// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockStablecoin is ERC20 {
    address owner;
    mapping(address => mapping(address => uint256)) private collateralBalance;
    // asset => balance
    mapping(address => uint256) private collateralTotalSupply;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        owner = msg.sender;
    }

    function mint(address collateral_, uint256 amount) external {
        IERC20(collateral_).transferFrom(msg.sender, address(this), amount);
        collateralBalance[msg.sender][collateral_] += amount;
        collateralTotalSupply[collateral_] += amount;

        _mint(msg.sender, amount);
    }

    function getCollateralBalance(address user, address collateral) external view returns(uint256) {
        return collateralBalance[user][collateral];
    }

    function getCollateralTotalSupply(address collateral) external view returns(uint256) {
        return collateralTotalSupply[collateral];
    }
}