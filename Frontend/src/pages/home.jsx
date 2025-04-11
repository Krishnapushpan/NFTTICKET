import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import ABI from '../assets/TicketAccessNFT.json';
import addresses from '../assets/deployed_addresses.json';
import { motion } from 'framer-motion';

import event1Img from '../assets/images/event1.jpeg';
import event2Img from '../assets/images/event2.jpg';
import event3Img from '../assets/images/event3.jpeg';
import event4Img from '../assets/images/event4.jpg';
import eventGif from '../assets/images/GIF.gif';


const events = [
  {
    id: 1,
    title: 'Bondi Pavilion 2025 Artistic Program',
    date: '31 DEC',
    description: '2025 is set to be a year of adventure, magic and fun...',
    image: event1Img,
  },
  {
    id: 2,
    title: 'Lunchtime Concerts at the Pav 2025',
    date: '11 JUN',
    description: 'Free monthly gigs to enjoy with your lunch',
    image: event2Img,
  },
  {
    id: 3,
    title: 'Lunchtime Concerts at the Pav 2025',
    date: '11 JUN',
    description: 'Free monthly gigs to enjoy with your lunch',
    image: event3Img,
  },
  {
    id: 4,
    title: 'Lunchtime Concerts at the Pav 2025',
    date: '11 JUN',
    description: 'Free monthly gigs to enjoy with your lunch',
    image: event4Img,
  },
];

const home = () => {
  const [loadingId, setLoadingId] = useState(null);

  const getContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractABI = ABI.abi;
    const contractAddress = addresses["TicketAccessNFTModule#TicketAccessNFT"] || addresses.TicketAccessNFT;
    const contract = new Contract(contractAddress, contractABI, signer);
    return { contract, signer };
  };

  const handleBookTicket = async (event) => {
    try {
      setLoadingId(event.id);
      const { contract } = await getContract();

      const timestamp = Math.floor(Date.now() / 1000);
      const tx = await contract.bookTicket(event.title, timestamp);
      await tx.wait();

      alert(`Ticket successfully booked for "${event.title}"`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Make sure you own the access NFT.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {/* Heading Section */}
      {/* <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-slate-800">What's On</h1>
        <h2 className="text-3xl font-semibold text-slate-800 mt-1">Events</h2>
        <div className="mt-2 w-24 h-0.5 mx-auto bg-red-300"></div>
      </div> */}
      <motion.div
  className="text-center mt-12"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
    What's       <motion.div
  className="flex justify-center mt-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.8 }}
>
  <img src={eventGif} alt="Event Animation" className="w-32 h-auto" />
</motion.div>
n
  </h1> */}
        



        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent flex items-center justify-center">
  <span>What's&nbsp;</span>
  <motion.div
    className="inline-flex"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.8 }}
  >
    <img src={eventGif} alt="Event O" className="w-9 h-9 object-contain rounded-full border-2 border-pink-400 shadow-md" />
  </motion.div>
  <span>n</span>
</h1>









  <h2 className="text-3xl font-semibold bg-gradient-to-r from-pink-600 to-red-400 bg-clip-text text-transparent mt-1">
    Events
  </h2>
  <motion.div
    className="mt-3 w-24 h-1 mx-auto bg-gradient-to-r from-pink-400 to-red-400 rounded-full"
    initial={{ width: 0 }}
    animate={{ width: "6rem" }}
    transition={{ duration: 0.7, delay: 0.6 }}
  />
      </motion.div>
      


      {/* Events Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 h-[50%]">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
            <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="text-sm text-pink-600 font-bold">{event.date}</div>
              <h2 className="text-lg font-semibold mt-1">{event.title}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <button
                onClick={() => handleBookTicket(event)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                disabled={loadingId === event.id}
              >
                {loadingId === event.id ? 'Booking...' : 'Book Ticket'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default home;
