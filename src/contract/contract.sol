// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";

contract NftMarketplace is ERC1155("NftMarketplace") {
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    string[] public tokenNames;
    string[] public tokenTypes;
    
    function createTokenType(string memory tokenName) public {
        require(msg.sender == admin, "Only Admin can create token types");
        tokenTypes.push(tokenName);
    }
    
    function getTokenTypes() public view returns (string[] memory) {
        return tokenTypes;
    }
    
    function getTokenNames() public view returns (string[] memory) {
        return tokenNames;
    }
    
    // id means tokenId
    // data is nft description
    event mintEvent(
        address to,
        uint256 indexed id,
        uint256 amount,
        string data,
        
        string indexed tokenName,
        uint256 royaltyPercentage,
        uint256 tokenType,
        string imageLink
    );
    
    function mint(
        uint256 id, // token id
        uint256 amount, // could be 1 for NFT, or could be multiple for fungible tokens or fractional NFTS
        string memory data, // long description
        
        string memory tokenName,
        uint256 tokenType,
        uint256 royaltyPercentage,
        string memory imageLink
    ) public {
        require(tokenType < tokenTypes.length);
        tokenNames.push(tokenName);
        
        _mint(msg.sender, id, amount, bytes(data));
        emit mintEvent(msg.sender, id, amount, data, tokenName, royaltyPercentage, tokenType, imageLink);
    }
}