# NFTTicket - Ticket Booking System for NFT Holders

NFTTicket is a ticket booking web application that allows only verified NFT holders to view and book tickets for exclusive exhibitions. The platform leverages Ethereum blockchain technology to ensure that only authenticated NFT holders can access and participate in events.

## 🚀 Features

- 🔐 NFT Access Control: Only users who own a specific NFT can access event listings and book tickets.
  
- 🦊 MetaMask Integration: Users connect their MetaMask wallet to authenticate NFT ownership.
  
- 🗓️ Event Listings: View upcoming exhibitions with details like name, date, description, and images.
  
- 🎟️ Ticket Booking: Book tickets for available exhibitions as an NFT holder.
  
- 📋 Booked Tickets: View your previously booked events.

  ## 🛠 Tech Stack
  
 ### Frontend
 
  - React.js

  - React Router

  - Framer Motion (animations)

  - Tailwind CSS

### Backend

  - Ethereum Blockchain

  - Smart Contracts (Solidity)

### Wallet Integration

  - MetaMask (via ethers.js)

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

  - MetaMask browser extension installed

  - Node.js 

  - Access to Ethereum Testnet or Mainnet for deploying contracts

## 📥 Installation
    ```
    git clone git@github.com:Krishnapushpan/NFTTICKET.git
    cd NFTTICKET
    npm install
    ```
## ⚙️ Environment Setup

  Create a .env file in the project root and add:
  
 ``` env
  PRIVATE_KEY=your_private_key_here
  API_KEY=your_api_key_here
  ```
  Make sure to keep these values secure and never commit .env to version control.

  ## 📦 Deploy Smart Contract

  To deploy the contract on Sepolia:
  ```bash
  npx hardhat ignition deploy ignition/modules/TicketAccessNFT.js --network sepolia
  ```
  Once deployed, copy the following files into your frontend assets:

  - Deployed Address:
  ```
  NFTTICKET/ignition/deployments/chain-11155111/deployed_addresses.json
  ```
  - ABI File:
   ```
  NFTTICKET/artifacts/contracts/TicketAccessNFT.sol/TicketAccessNFT.json
  ```
  Place both in:
  ```
  Frontend/src/assets
  ```
## 🔄 Run the Application

  ```
  npm run dev
  ```
Open your browser and go to

[http://localhost:5173](http://localhost:5173)

## 🧪 Manual Testing

 - Connect your MetaMask wallet.

 - Ensure it holds the correct NFT.

 - Try accessing the event page – only eligible users can view and book.

 - Book a ticket and view it under Booked Events.

## 📌 Usage Flow

 - Connect Wallet: Prompted on homepage to connect MetaMask.

 - NFT Check: App verifies NFT ownership.

 - Access Events: NFT holders view upcoming events.

 - Book Ticket: Choose an event and book.

 - View Booked Events: Navigate to your booked list.




  
