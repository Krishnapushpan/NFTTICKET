import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../assets/TicketAccessNFT.json";
import addresses from "../assets/deployed_addresses.json";
import Heading from "../components/heading";
import video1 from '../assets/video/listvideo.mp4';
import event1Img from '../assets/images/event1.jpg';
import event2Img from '../assets/images/event2.jpg';
import event3Img from '../assets/images/event3.jpg';
import event4Img from '../assets/images/event4.jpg';

const Booklist = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  const getContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    setAddress(userAddress);

    const contractABI = ABI.abi;
    const contractAddress =
      addresses["TicketAccessNFTModule#TicketAccessNFT"] ||
      addresses.TicketAccessNFT;
    const contract = new Contract(contractAddress, contractABI, signer);
    return { contract, userAddress };
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { contract, userAddress } = await getContract();
      const ticketData = await contract.getTickets(userAddress);
      setTickets(ticketData);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <Heading />

      {/* Video Banner */}
      <div className="relative mt-6 h-[400px] w-full">
        <video
          className="h-full w-full object-cover opacity-70"
          src={video1}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-sacramento text-5xl font-bold mt-20 px-6 py-5 rounded-md text-center">
            To view art is to time-travel through imagination.
          </h2>
        </div>
      </div>

      {/* Ticket List */}
      <div className="p-8">
        <h1 className="text-4xl font-bold mt-6 text-center text-[#1b4f72] mb-8">
          Your Booked Tickets
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-gray-600">No tickets booked yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  {ticket.eventName}
                </h2>

                <p className="text-gray-600">
                  <strong>Event Date:</strong>{" "}
                  {ticket.eventDate
                    ? new Date(Number(ticket.eventDate) * 1000).toLocaleDateString()
                    : "N/A"}
                </p>

                {/* <p className="text-gray-600 mt-1">
                  <strong>Booked On:</strong>{" "}
                  {new Date(Number(ticket.eventDate) * 1000).toLocaleString()}
                </p> */}

                <p className="text-gray-600 mt-2">
                  <strong>Ticket ID:</strong> {ticket.id.toString()}
                </p>
                <p className="text-gray-600">
                  <strong>Attendee:</strong> {ticket.attendee}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Booklist;
