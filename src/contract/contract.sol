// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";

contract NftMarketplace is ERC1155("NftMarketplace") {
    address public admin;
    uint256 public tokenId;
    
    constructor() {
        admin = msg.sender;
        tokenId = 0;
    }
    
    string[] public tokenNames;
    string[] public tokenTypes;
    uint256[] public tokenIds;
    // @Dev Mapping from token id to balances
    mapping (uint256 => mapping(address => uint256)) public balances;
   
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
        //uint256 id, // token id
        uint256 amount, // could be 1 for NFT, or could be multiple for fungible tokens or fractional NFTS
        string memory data, // long description
        
        string memory tokenName,
        uint256 tokenType,
        uint256 royaltyPercentage,
        string memory imageLink
    ) public {
       // require(tokenType < tokenTypes.length); //what is this for
        tokenNames.push(tokenName);
        tokenIds.push(tokenId);
        //update balances
        balances[tokenId][msg.sender] += amount;
        
        _mint(msg.sender, tokenId, amount, bytes(data));
        emit mintEvent(msg.sender, tokenId, amount, data, tokenName, royaltyPercentage, tokenType, imageLink);
        // tokenId starts at 0, ensures every new token has a unique Id
        tokenId += 1;
    }
    
    function transfer(
        address from, //sender 
        address to,   //recievr
        uint256 [] memory ids, //token ids ERC20 or NFT
        uint256 [] memory amounts, //amount of each
        string memory data //description for transfer ask george about this
        
      ) public {
            require(from == msg.sender); //must use own adress to send
            safeBatchTransferFrom(msg.sender, to, ids, amounts, bytes(data));
            
            //Update balances
            for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = balances[id][from];
            require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
            unchecked {
                   balances[id][from] = fromBalance - amount;
            }
             balances[id][to] += amount;
        }

    }
    
     //count how many tokens with a positive balance an account has
    function _getpositiveCount(address account) internal view returns (uint256) {
        uint256 count = 0;
        for(uint i = 0; i<tokenIds.length; i++){
            if(balances[tokenIds[i]][account] > 0) {
                count++;
            }
        }
        return count;
    }
    
    //list token ids with positive balnces and their balance for an account
    function getpositiveIds(address account) public view returns (uint256[] memory, uint256[] memory) {
        uint256 n = _getpositiveCount(account);
        uint256[] memory positiveTokens = new uint256 [](n);
        uint256 [] memory positiveBalances = new uint256 [](n);
        for(uint i = 0; i<tokenIds.length; i++){
            if(balances[tokenIds[i]][account] > 0) {
                
            positiveTokens[i] = tokenIds[i];
            positiveBalances[i] = balances[positiveTokens[i]][account];
            
            }
        }
        
        return (positiveTokens, positiveBalances);
