// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";

contract Msft is ERC1155("NftMarketplace") {
    // state
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    // token types
    string[] public tokenTypes;
    
    function createTokenType(string memory tokenName) public {
        require(msg.sender == admin, "Only Admin can create token types");
        tokenTypes.push(tokenName);
    }
    
    function getTokenTypes() public view returns (string[] memory) {
        return tokenTypes;
    }

    mapping(uint => Royalty[]) public royaltyTable;
    
    function getRoyaltys(uint256 i) public view returns (Royalty[] memory) {
        return royaltyTable[i];
    }
    
    struct Royalty {
        address payable royal;
        uint256 percent; // must be 1 - 100
    }
    
    // mint
    struct Token {
        string name;
        string data;
        string image;
        
        uint256 amount;
        uint256 tokenType;
        
        address creator;
        uint256 totalRoy;
    }
    
    Token[] public tokens;

    function getTokens() public view returns (Token[] memory) {
        return tokens;
    }
    
    function mint(
        string memory name,
        string memory data, // long description
        string memory image,
        uint256 amount, // could be 1 for NFT, or could be multiple for fungible tokens or fractional NFTS
        uint256 tokenType
    ) public {
        require(tokenType < tokenTypes.length); // makes sure that tokenType exists
        _mint(msg.sender, tokens.length, amount, bytes(data));

        tokens.push(Token(name, data, image, amount, tokenType, msg.sender, 0));
    }
    
    function createRoyalty(
        uint256 tokenId,
        address payable royal,
        uint256 amount // [1, 99]
    ) public {
        require(
            msg.sender == tokens[tokenId].creator &&
            amount < 99 &&
            tokens[tokenId].totalRoy + amount <= 100
        );
        tokens[tokenId].totalRoy += amount;

        Royalty memory r = Royalty(royal, amount);
        royaltyTable[tokenId].push(r);
    }
    
    // type fractional
    // represented by another coin with the name FRAC "original name"
    // if sold, change original token's royalty array
    // called by buyer
    function changeRoyalty(
        uint256 tokenId,
        address payable royal
    ) public payable returns (bool success) {
        Royalty[] memory royaltys = royaltyTable[tokenId];
        for (uint256 i = 0; i < royaltys.length; i++) {
            Royalty memory r = royaltys[i];
            if (r.royal == royal) {
                address buyer = msg.sender;
                royaltyTable[tokenId][i].royal = payable(buyer);
                royal.transfer(msg.value);
                return true;
            }
        }
        return false;
    }
    
    function buyToken(
        uint256 tokenId,
        address payable owner
    ) public payable {
        Royalty[] memory royaltys = royaltyTable[tokenId];
        uint256 total = 0;
        for (uint256 i = 0; i < royaltys.length; i++) {
            Royalty memory r = royaltys[i];
            uint256 part = msg.value * r.percent / 100;
            r.royal.transfer(part);
            total += r.percent;
        }
        
        owner.transfer(msg.value * (100 - total) / 100);
    }
    
    // when trading just items, also add txn fee that goes to msft and also pays creator/royalties
}