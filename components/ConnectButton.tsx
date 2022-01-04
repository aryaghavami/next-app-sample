import { useWeb3React } from '@web3-react/core';
import { FaWallet } from 'react-icons/fa';

import { useContractContext } from '../context/Contract';
import { injected } from '../utils/wallet/connectors';
import React, {useState, Component } from 'react'
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {ethers} from 'ethers'

export default function ConnectButton() {
  // const { activate, setError, chainId, error } = useWeb3React();

  // const { isConnecting, setErrMsg, setIsConnecting } = useContractContext();

  // async function connectMetaMask() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     if (!error) {
  //       setIsConnecting(true);
  //       try {
  //         await activate(injected);
  //         setIsConnecting(false);
  //         // if (
  //         //   chainId &&
  //         //   chainId.toString() !== process.env.NEXT_PUBLIC_NETWORK_ID
  //         // ) {
  //         //   setErrMsg(
  //         //     `Change the network to ${process.env.NEXT_PUBLIC_NETWORK_ID}.`
  //         //   );
  //         // }
  //       } catch (error) {
  //         if (error instanceof Error) setError(error);
  //         setIsConnecting(false);
  //       }
  //     } else {
  //       // setErrMsg(
  //       //   `Change the network to ${process.env.NEXT_PUBLIC_NETWORK_ID}.`
  //       // );
  //     }
  //   } else {
  //     setErrMsg('Please install MetaMask.');
  //   }
  // }

  const [errorMessage, setErrorMessage] = useState(null);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const onClick = async (event) => {
    // const accounts = await web3.eth.getAccounts();
    console.log("Cherti"/*accounts[0]*/);
  };

  const connectWalletHandler = () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // We are in the browser and metamask is running.
      window.ethereum.request({ method: "eth_requestAccounts" })
      .then(result => {
        accountChangedHandler(result[0]);
      })
      // web3 = new Web3(window.ethereum);
    } else {
      // We are on the server *OR* the user is not running metamask
      // const provider = new Web3.providers.HttpProvider(
      //   "https://mainnet.infura.io/v3/83d163ba810743adbb21f577f610e8ed"
      // );
      // web3 = new Web3(provider);
      setErrorMessage('Install MetaMask');
    }
  }

  return (
    <div className="flex justify-center">
      {isConnecting ? (
        <button
          type="button"
          className="flex justify-center items-center border-2 border-gray-500 bg-gray-800 rounded-full px-4 py-2 w-40 cursor-not-allowed"
          disabled
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Connecting
        </button>
      ) : (
        <button
          type="button"
          className="flex justify-center items-center space-x-2 border-2 border-gray-500 hover:border-gray-400 bg-gray-800 rounded-full px-4 py-2 w-50"
          onClick={connectMetaMask}
        >
          <FaWallet />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
}
