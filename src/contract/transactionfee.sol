pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

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
    
    function setFeepercents(
    uint256 mpercent,
    uint256 cpercent,
    uint256 gpercent,
    uint256 hpercent,
    ) public{
        require(mpercent+cpercent+gpercent+hpercent == 100, "Need a total of 100");
        mpercent = mktpercent;
        cpercent = creatorpecent;
        gpercent = gameDevpercent;
        hpercent = holderpercent;
    }
    
    function adjustHolderpercent(
    uint256 adjust
    ) public{
        require(adjust <= creatorpecent, "Can not exceed creator percent");
        creatorpecent -= adjust;
        holderpercent +=adjust;
    }
    //@ Dev fees for transactions that do not use Eth and send them to mktplace and royalty onwers
    function Feepayments(address mktplace,
    address [ ] holders,// adress of fractional NFT holders
    address creator, //creator of NFT
    address gameDev) public payable{
        require (msg.value == transfee, "Insufficent funds");
        mktplace.send(transfee*(mktpercent/100));
        creator.send(transfee*(creatorpecent/100));
        gameDev.send(transfee*(gameDevpercent/100));
        
        uint256 memory percentper = holderpercent / holders.length;
        for(uint256 i=0, i < holders.length, i++){ //for loop sending feeepayments to all token holders amount transfee*(percentper/100)
        holders[i].send(transfee*(percentper/100));
        }
    }

}
