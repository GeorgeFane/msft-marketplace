pragma solidity ^0.8.0;

contract Royalty {
    address public admin; //admin adress, maybe implement Ownable from openzepplin 
    uint256 mktRoyalty;//royalties for market place 
    uint256 devRoyalty; //royalties for Game Dev
    uint256 creatorRoyalty; //royalties for Creator/artist
    
    constructor () public{
        admin = msg.sender;
    }
    //@Dev set royalty percentages
     function setMktRoyalty(
        uint256 royaltyPercent
        ) public{
            require(msg.sender == admin, "Only Admin can create token types");
            mktRoyalty = royaltyPercent;
        }   
         function setDevRoyalty(
         uint256 royaltyPercent
         ) public{
             require(msg.sender == admin, "Only Admin can create token types");
             devRoyalty = royaltyPercent;
         } 
         
    function setCreatorRoyalty(
        uint256 royaltyPercent
        ) public{
            require(msg.sender == admin, "Only Admin can create token types");
            creatorRoyalty = royaltyPercent;
        }
        //sendRoyalties for Ether transactions 
        function sendRoyalties(
        address seller,
        address buyer,
        address mktplace, 
        address gamedev,
        address creator,
        uint256 amount //total amount of transction in ether internal
        ) internal{
            uint256 remainingPercent = 100-(mktRoyalty+devRoyalty+creatorRoyalty);
            uint256 remainder = amount*(remainingPercent/100);
            buyer.transfer(amount);
            gamedev.send(amount*(devRoyalty/100));
            mktplace.send(amount*(mktRoyalty/100));
            creator.send(amount*(creatorRoyalty/100));
            seller.transfer(remainder);
           
        }
}
