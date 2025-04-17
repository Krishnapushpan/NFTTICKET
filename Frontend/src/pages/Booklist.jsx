import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../assets/TicketAccessNFT.json";
import addresses from "../assets/deployed_addresses.json";
import Heading from "../components/heading";
import video1 from "../assets/video/listvideo.mp4";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Ticket, User } from "lucide-react";

const Booklist = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

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

      {/* Home Button */}
      <div className="flex justify-end px-8 mt-4">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          Home
        </button>
      </div>

      {/* Tickets */}
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
                className="bg-gradient-to-br from-[#fef6ff] to-[#e9f0ff] shadow-xl rounded-2xl p-6 border border-gray-200 hover:scale-[1.02] transition-transform duration-300 animate-fadeIn"
              >
                <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                  {ticket.eventName}
                </h2>

                <p className="text-gray-800 flex items-center gap-2">
                  <CalendarDays className="text-blue-500" size={18} />
                  <strong>Event Date:</strong>{" "}
                  {ticket.eventDate
                    ? new Date(
                        Number(ticket.eventDate) * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <p className="text-gray-700 mt-2">
                  <strong>Ticket ID:</strong> {ticket.id.toString()}
                </p>

                <div className="mt-4 bg-white border border-blue-100 p-3 rounded-md shadow-inner">
                  <div className="flex items-center gap-2">
                    <User className="text-blue-400" size={18} />
                    <strong className="text-gray-700">Attendee Wallet:</strong>
                  </div>
                  <p className="text-blue-600 break-words mt-1 text-sm">
                    {ticket.attendee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
            <div className='items-center w-full'><p className='text-center text-xl text-[#094d7b] tracking-wide  font-caveat mt-10'>Heads up! Make sure to disconnect MetaMask before heading out</p></div>
      </div>
      
    </>
  );
};

export default Booklist;
