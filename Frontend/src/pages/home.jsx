import React, { useState } from "react";
import ABI from "../assets/TicketAccessNFT.json";
import addresses from "../assets/deployed_addresses.json";
import { motion } from "framer-motion";
import { BrowserProvider, Contract } from 'ethers';
import event1Img from '../assets/images/event1.jpg';
import event2Img from '../assets/images/event2.jpg';
import event3Img from '../assets/images/event3.jpg';
import event4Img from '../assets/images/event4.jpg';
import list from "../assets/images/Arrow.png";
import Heading from "../components/heading";

const events = [
  {
    id: 1,
    title: "Canvas Chronicles: Modern Painting Exhibition",
    date: "28 APRIL 2025",
    description: "A diverse gallery of contemporary paintings capturing the emotions, struggles, and hopes of the modern world.",
    image: event1Img,
  },
  {
    id: 2,
    title: "Colors of Silence: Minimalist Paintings",
    date: "11 JUN 2025",
    description: "An elegant showcase of minimalist and abstract paintings that speak through simplicity and silence.",
    image: event2Img,
  },
  {
    id: 3,
    title: "Brush & Soul: Portrait Masters Collection",
    date: "4 JULY 2025",
    description: "A striking collection of painted portraits that reveal stories hidden in expressions, light, and shadow.",
    image: event3Img,
  },
  {
    id: 4,
    title: "Youth on Canvas: Emerging Painters’ Exhibit",
    date: "5 MAY 2025",
    description: "Vivid, raw, and inspiring — a colorful celebration of young painters expressing their world on canvas.",
    image: event4Img,
  },
];

const Home = () => {
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

      // ✅ FIX: use event.date instead of event.eventDate
      const timestamp = Math.floor(new Date(event.date).getTime() / 1000);

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
        <h1 className="text-6xl font-bold text-[#21618c] tracking-wide font-caveat">
          What's <span className="text-5xl font-monoton">o</span>n
        </h1>
        <h2 className="text-4xl font-semibold text-[#ec7063] font-caveat mt-4">
          Events
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.7, delay: 0.6 }}
        />
      </motion.div>

      <a href="/list" className="flex items-center justify-end px-6 mt-6">
        <span className="text-lg font-semibold">Booked Events</span>
        <img src={list} alt="Booked Events" className="w-[50px] h-[50px] ml-2" />
      </a>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="flex">
              <div>
                <div className="relative h-[600px] md:h-[400px] w-full">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md shadow-md">
                    {event.date}
                  </div>
                </div>
              </div>
              <div>
                <div className="p-4 flex flex-col w-[200px] justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a5276] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <div className="mt-24 flex justify-between items-center">
                    <button
                      onClick={() => handleBookTicket(event)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded"
                      disabled={loadingId === event.id}
                    >
                      {loadingId === event.id ? "Booking..." : "Book Ticket"}
                    </button>
                    <img
                      src={list}
                      alt="Arrow"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
