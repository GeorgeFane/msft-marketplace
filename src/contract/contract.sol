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
    }
    
    Token[] public tokens;
    
    function mint(
        string memory name,
        string memory data, // long description
        string memory image,
        uint256 amount, // could be 1 for NFT, or could be multiple for fungible tokens or fractional NFTS
        uint256 tokenType
    ) public {
        require(tokenType < tokenTypes.length); // makes sure that tokenType exists
        _mint(msg.sender, tokens.length, amount, bytes(data));

        tokens.push(Token(name, data, image, amount, tokenType, msg.sender));
    }
    
    function createRoyalty(
        address payable royal,
        uint256 tokenId,
        uint256 amount // 1 - 100
    ) public {
        require(msg.sender == tokens[tokenId].creator && amount < 99);
        // check total < 100
        Royalty memory r = Royalty(royal, amount);
        royaltyTable[tokenId].push(r);
    }
    
    function buyToken(
        address payable owner,
        uint256 tokenId
    ) public payable {
        safeTransferFrom(owner, msg.sender, tokenId, 1, bytes(''));
        
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