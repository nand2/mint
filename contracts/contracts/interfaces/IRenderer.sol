// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IToken.sol";

interface IRenderer {
    function uri (uint tokenId, Token calldata token) external pure returns (string memory);
}
