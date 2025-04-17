import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { BrowserProvider, Contract } from 'ethers';
import addresses from '../assets/deployed_addresses.json';
import ABI from '../assets/TicketAccessNFT.json';
import Img4 from '../assets/images/img4.jpg';
import Img1 from '../assets/images/img1.jpg';
import Img2 from '../assets/images/img2.jpg';
import Img3 from '../assets/images/img3.jpg';
import Img5 from '../assets/images/img5.jpg';
import Img6 from '../assets/images/img6.jpg';
import FeaturesSection from '../components/FeaturesSection';
import MeetOurArtists from '../components/MeetOurArtists';
import Heading from '../components/heading';
import { useAuth } from '../contexts/AuthContext';

const images = [Img2, Img3, Img4, Img5, Img6];

const Login = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const { checkAuthentication, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const getContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new Contract(
      addresses["TicketAccessNFTModule#TicketAccessNFT"] || addresses.TicketAccessNFT,
      ABI.abi,
      signer
    );
    const address = await signer.getAddress();
    setWalletAddress(address);
    return { contract, address };
  };

  const handleLogin = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }
      const { contract, address } = await getContract();
      const access = await contract.hasAccess(address);
      if (access) {
        await checkAuthentication(); // Update authentication status
        navigate('/home');
      } else {
        setError("Access Denied: You don't own the required NFT.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  const handleMint = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new Contract(
        addresses["TicketAccessNFTModule#TicketAccessNFT"],
        ABI.abi,
        signer
      );
      const tx = await contract.mintNFT(userAddress);
      await tx.wait();
      setError('');
      alert("NFT Minted Successfully!");
      await checkAuthentication(); // Check if we can authenticate after minting
    } catch (err) {
      console.error("Mint error:", err);
      setError("Failed to mint NFT. Only contract owner can mint.");
    }
  };

  return (<>
    <Heading />
    <div className="flex-grow flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mt-6 h-[70vh] shadow-lg">
        {/* Left Animated Image Slideshow */}
        <div className="md:w-4/5 w-full h-[300px] md:h-full relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-linear ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Right Card */}
        <div className="md:w-2/5 w-full bg-[#1a5276] text-white flex flex-col justify-center px-10 py-2 space-y-8">
          <div>
            <p className="text-7xl font-semibold mt-[-50px]">Login</p>
            <h1 className="text-4xl font-semibold text-[#aed6f1] mt-[20px]">With MetaMask</h1>
          </div>

          <p className="text-lg text-gray-300">
            Access our exclusive art exhibitions by logging in with your wallet.
          </p>

          {/* Animated Buttons */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="bg-[#f4d03f] h-[50px] text-xl font-bold hover:bg-white text-[#04426b] py-2 px-4 rounded transition duration-300 shadow-md"
          >
            Connect Wallet
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMint}
            className="bg-[#f4d03f] h-[50px] text-xl font-bold hover:bg-white text-[#04426b] py-2 px-4 rounded transition duration-300 shadow-md"
          >
            Mint NFT
          </motion.button>

          {(walletAddress || error) && (
            <motion.div
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="mt-4 rounded-lg bg-white p-4 text-white shadow-md w-full"
            >
              {walletAddress && (
                <p className="text-sm text-[#1a5276] mt-2 break-words">
                  <span className="font-semibold text-[#1a5276]">Wallet:</span> {walletAddress}
                </p>
              )}

              {error && (
                <div className="mt-2 text-sm">
                  <p className="text-red-400 font-semibold">{error}</p>
                  <p className="text-gray-400 mt-2">Mint for earning NFTs</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
    <FeaturesSection />
    <MeetOurArtists />
  </>);
};

export default Login;
