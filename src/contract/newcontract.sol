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
    
    // mint
    struct token {
        string name;
        string data;
        string image;
        
        uint256 amount;
        uint256 tokenType;
    }
    
    token[] public tokens;
    
    function mint(
        uint256 amount, // could be 1 for NFT, or could be multiple for fungible tokens or fractional NFTS
        string memory data, // long description
        
        string memory name,
        uint256 tokenType,
        string memory image
    ) public {
        require(tokenType < tokenTypes.length); // makes sure that tokenType exists
        _mint(msg.sender, tokens.length, amount, bytes(data));
        tokens.push(token(name, data, image, amount, tokenType));
    }
    
    function transfer(
       address from
       address to
       uint256 id //token id
       uint256 amount
       ) public { 
           // Do something 
    
       }
       
    function Send_Royalties(
        address creator
        address marketplace
        uint256 Royalty_percent1
        uint256 Royalty_percent2
        uint256 amount //total amount on transaction
        uint256 id // token ID of token used in transaction
        ) public returns(uint256 token_amount) {
            require(msg.sender == admin, "Only Admin can set royalties");
            //  set royalty percentages 
            //returns amount of tokens for each address that has a royalty
        }
            
}
