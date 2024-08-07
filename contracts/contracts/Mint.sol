// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "./libraries/ERC1155.sol";
import "./interfaces/IRenderer.sol";
import "./interfaces/IToken.sol";

/// @description To mint is a human right.
contract Mint is ERC1155, Ownable2Step {
    event Withdrawal(uint amount);

    mapping(uint => Token) public tokens;

    string public name;
    string public symbol;
    string public description;
    string public image;

    address[] public renderers;
    uint public latestTokenId;
    uint public totalSupply;

    error MintPriceNotMet();

    constructor(
        string memory name_,
        string memory symbol_,
        string memory description_,
        string memory image_,
        address initialOwner
    ) Ownable(initialOwner) {
        name = name_;
        symbol = symbol_;
        description = description_;
        image = _image;
    }

    function create(
        string calldata name,
        string calldata description,
        string calldata artifact,
        uint16 renderer,
        bool   interactive
    ) public onlyOwner {
        latestTokenId ++;

        Token storage token = tokens[latestTokenId];

        token.name        = name;
        token.description = description;
        token.artifact    = artifact;
        token.blockNumber = uint64(block.number);
        token.renderer    = renderer;
        token.interactive = interactive;

        _mint(msg.sender, latestTokenId, 1, "");
    }

    function mint(uint tokenId, uint amount) public {
        uint256 price = block.basefee * 60_000;
        if (price > msg.value) revert MintPriceNotMet();

        totalSupply += amount;

        _mint(msg.sender, tokenId, amount, "");
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);

        emit Withdrawal(address(this).balance);
    }

    function uri(uint tokenId) public override view returns (string memory) {
        Token memory token = tokens[tokenId];

        return IRenderer(renderers[token.renderer]).uri(tokenId, token);
    }

    // Move to lib?
    function burn(address account, uint256 id, uint256 amount) public {
        if (account != _msgSender() && !isApprovedForAll(account, _msgSender())) {
            revert ERC1155MissingApprovalForAll(_msgSender(), account);
        }

        totalSupply -= amount;

        _burn(account, id, amount);
    }
}
