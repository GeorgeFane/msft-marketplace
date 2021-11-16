pragma solidity ^0.8.0;

contract TransactionFee {
    uint256 transfee;
    uint256 mktpercent; //percentage that goes to 
    uint256 creatorpecent;
    uint256 gameDevpercent;
    uint256 holderpercent; //percentage for token holders

    constructor (){
    }
    
    function setFee(
        uint256 fee //fee in wei
        ) public virtual {
            fee = transfee;
    }
    
    //@ Dev fees for transactions that do not use Eth and send them to mktplace and royalty onwers
    function Feepayments(address mktplace
    address [ ] holders// adress of fractional NFT holders
    address creator //creator of NFT
    address gameDev) public payable{
        require (msg.value == transfee, "Insufficent funds");
        mktplace.send(transfee*(mktpercent/100));
        creator.send(transfee*(creatorpecent/100));
        gameDev.send(transfee*(gameDevpercent/100));
        
        uint256 memory percentper = holderpercen / holders.length;
        for //for loop sending feeepayments to all token holders amount transfee*(percentper/100)
        holders[i].send(transfee*(percentper/100));
    }

}
