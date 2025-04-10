// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketAccessNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public ticketId;

    constructor() ERC721("AccessNFT", "ANFT") Ownable(msg.sender) {}

    function mintNFT(address to) external  {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function hasAccess(address user) external view returns (bool) {
        return balanceOf(user) > 0;
    }

    struct Ticket {
        uint256 id;
        string eventName;
        uint256 eventDate;
        address attendee;
    }

    mapping(address => Ticket[]) public userTickets;

    function bookTicket(string memory eventName, uint256 eventDate) external {
        require(balanceOf(msg.sender) > 0, "You must own an access NFT to book");

        Ticket memory newTicket = Ticket({
            id: ticketId,
            eventName: eventName,
            eventDate: eventDate,
            attendee: msg.sender
        });

        userTickets[msg.sender].push(newTicket);
        ticketId++;
    }

    function getTickets(address user) external view returns (Ticket[] memory) {
        return userTickets[user];
    }
}
