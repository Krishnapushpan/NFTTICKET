import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import addresses from '../assets/deployed_addresses.json';
import ABI from '../assets/TicketAccessNFT.json';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');

  const checkAuthentication = async () => {
    try {
      if (!window.ethereum) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const contract = new Contract(
        addresses["TicketAccessNFTModule#TicketAccessNFT"] || addresses.TicketAccessNFT,
        ABI.abi,
        signer
      );

      const access = await contract.hasAccess(address);
      setIsAuthenticated(access);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Listen for account changes in MetaMask
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        checkAuthentication();
      });
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkAuthentication);
      }
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        loading, 
        walletAddress,
        checkAuthentication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};