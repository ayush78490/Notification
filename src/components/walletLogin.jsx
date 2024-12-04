import React, { useState, useEffect } from 'react';
import Arweave from 'arweave';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  // Initialize Arweave instance
  const arweave = Arweave.init({
    host: 'arweave.net',  // Arweave network host
    protocol: 'https',    // Protocol
    port: 443,            // Port
  });

  // Function to check and enable ArConnect
  const checkArConnect = async () => {
    if (window.arweaveWallet) {
      try {
        // Enable ArConnect to request permission to access the wallet
        await window.arweaveWallet.enable();
        console.log('ArConnect enabled');

        // Get the active wallet address
        const address = await window.arweaveWallet.getActiveAddress();
        setWalletAddress(address);

        // Fetch wallet balance
        const balanceInWinston = await arweave.wallets.getBalance(address);
        const balanceInAr = arweave.ar.winstonToAr(balanceInWinston);
        setWalletBalance(balanceInAr);

        console.log('Wallet Address:', address);
        console.log('Wallet Balance:', balanceInAr);
      } catch (err) {
        console.error('Failed to enable ArConnect:', err);
        alert('Failed to connect to Arweave wallet');
      }
    } else {
      alert('Please install the ArConnect extension!');
    }
  };

  useEffect(() => {
    // Check for ArConnect when the component mounts
    checkArConnect();
  }, []);

  return (
    <div className="App">
      <h1>Arweave Wallet Login</h1>
      
      {/* Display Wallet Address and Balance */}
      {walletAddress ? (
        <div>
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {walletBalance} AR</p>
        </div>
      ) : (
        <p>Please connect to your Arweave wallet.</p>
      )}
    </div>
  );
};

export default App;
