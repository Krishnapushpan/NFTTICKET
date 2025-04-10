import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import addresses from '../assets/deployed_addresses.json';
import ABI from '../assets/TicketAccessNFT.json';

const Login = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // ✅ Move getContract *inside* the component
  const getContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractABI = ABI.abi;
    const contractAddress = addresses["TicketAccessNFTModule#TicketAccessNFT"] || addresses.TicketAccessNFT;
    const contract = new Contract(contractAddress, contractABI, signer);
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
  
      const contractABI = ABI.abi;
      const contractAddress = addresses["TicketAccessNFTModule#TicketAccessNFT"];
      const contract = new Contract(contractAddress, contractABI, signer);
  
      // Make the mint call using the correct function name and user's address
      const tx = await contract.mintNFT(userAddress);
      await tx.wait();
  
      setError('');
      alert("NFT Minted Successfully!");
    } catch (err) {
      console.error("Mint error:", err);
      setError("Failed to mint NFT. Only contract owner can mint.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login with MetaMask</h1>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2"
        >
          Connect Wallet
        </button>

        <button
          onClick={handleMint}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Mint NFT
        </button>

        {walletAddress && (
          <p className="mt-2 text-sm text-green-600">Wallet: {walletAddress}</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="mt-2 text-sm text-green-600">{success}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
