<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../assets/TicketAccessNFT.json";
import addresses from "../assets/deployed_addresses.json";
import { motion } from "framer-motion";
=======
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
>>>>>>> 94ec389612f00f599e6e41a9870cf18e08c62bbd

import event1Img from "../assets/event1.jpeg";
import event2Img from "../assets/event2.jpg";
import event3Img from "../assets/event3.jpeg";
import event4Img from "../assets/event4.jpg";
import list from "../assets/images/Arrow.png";
import Heading from "../components/heading";

const events = [
  {
    id: 1,
    title: "Bondi Pavilion 2025 Artistic Program",
    date: "31 DEC",
    description: "2025 is set to be a year of adventure, magic and fun...",
    image: event1Img,
  },
  {
    id: 2,
    title: "Lunchtime Concerts at the Pav 2025",
    date: "11 JUN",
    description: "Free monthly gigs to enjoy with your lunch",
    image: event2Img,
  },
  {
    id: 3,
    title: "Lunchtime Concerts at the Pav 2025",
    date: "11 JUN",
    description: "Free monthly gigs to enjoy with your lunch",
    image: event3Img,
  },
  {
    id: 4,
    title: "Lunchtime Concerts at the Pav 2025",
    date: "11 JUN",
    description: "Free monthly gigs to enjoy with your lunch",
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
    const contractAddress =
      addresses["TicketAccessNFTModule#TicketAccessNFT"] ||
      addresses.TicketAccessNFT;
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
      <Heading />

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-[#21618c] text-center tracking-wide font-caveat">
          <span>What's&nbsp;</span>

          <span className="text-5xl mt-4 text-[#21618c] text-center font-monoton">
            o
          </span>

          <span>n</span>
        </h1>

        <h2 className="text-4xl font-semibold text-[#ec7063] text-center tracking-wide font-caveat mt-4">
          Events
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.7, delay: 0.6 }}
        />
      </motion.div>

      <a href="/list" className="flex items-center ml-[82%]">
        {/* Text */}
        <span className="text-lg font-semibold">Booked Events</span>

        {/* Image */}
        <img
          src={list}
          alt="Booked Events"
          className="w-[70px] h-[70px] object-cover"
        />
      </a>

      {/* Events Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 h-[50%] mt-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-xl rounded-xl overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-pink-600 font-bold">
                {event.date}
              </div>
              <h2 className="text-lg font-semibold mt-1">{event.title}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleBookTicket(event)}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                  disabled={loadingId === event.id}
                >
                  {loadingId === event.id ? "Booking..." : "Book Ticket"}
                </button>

                <img
                  src={list}
                  alt="Booked Events"
                  className="w-[50px] h-[50px] object-cover mt-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default home;
