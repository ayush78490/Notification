import React, { useState, useEffect } from "react";
import Arweave from "arweave";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", picture: null });
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const navbarHandler = () => setNav(!nav);
  const profileSetupHandler = () => setShowProfileSetup(true);

  const saveProfile = () => {
    if (!profile.name || !profile.email || !profile.picture) {
      alert("Please fill all fields and upload a profile picture.");
    } else {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      alert("Profile saved successfully!");
      setShowProfileSetup(false);
    }
  };

  // Handle Wallet Click - Connecting to Arweave wallet via ArConnect
  const walletClickHandler = async () => {
    if (!walletDetails) {
      try {
        const arweave = Arweave.init({});
        const wallet = await window.arweaveWallet.getActiveAddress();
        const balanceInWinston = await arweave.wallets.getBalance(wallet);
        const balanceInAr = arweave.ar.winstonToAr(balanceInWinston);
        setWalletDetails({ address: wallet, balance: balanceInAr });
        alert("Wallet connected successfully!");
      } catch (error) {
        alert("Failed to connect wallet: " + error.message);
      }
    } else {
      setShowWalletDetails(!showWalletDetails);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <a href="#">
          <img src="/assets/images/logo-small.svg" width="40" height="40" alt="home" />
        </a>

        <nav className={`navbar ${nav ? "active" : ""}`}>
          <ul className="navbar-list">
            <li><a href="#" className="navbar-link">Home</a></li>
            <li><a href="#" className="navbar-link">Explore</a></li>
            <li><a href="#" className="navbar-link">Wallet</a></li>
            <li><a href="#" className="navbar-link">About Us</a></li>
            <li><a href="#" className="navbar-link">Contact</a></li>
          </ul>
        </nav>

        <div className="header-action">
          {/* Wallet Button */}
          <button className="btn-icon" aria-label="wallet" onClick={walletClickHandler}>
            <ion-icon name="wallet-outline"></ion-icon>
          </button>

          {/* Wallet Details Popup */}
          {showWalletDetails && walletDetails && (
            <div style={{ position: "absolute", top: "60px", right: "100px", backgroundColor: "#fff", padding: "15px", borderRadius: "8px" }}>
              <h4>Wallet Details</h4>
              <p><strong>Address:</strong> {walletDetails.address}</p>
              <p><strong>Balance:</strong> {walletDetails.balance} AR</p>
              <button onClick={() => setShowWalletDetails(false)}>Close</button>
            </div>
          )}

          {/* Profile Button */}
          <button className="btn-icon" aria-label="Setup Profile" onClick={profileSetupHandler}>
            {profile.picture ? (
              <img src={profile.picture} alt={profile.name} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            ) : (
              <ion-icon name="person-outline"></ion-icon>
            )}
          </button>

          {/* Profile Setup Screen */}
          {showProfileSetup && (
            <div style={{ position: "absolute", top: "60px", right: "20px", backgroundColor: "#fff", padding: "15px", borderRadius: "8px" }}>
              <h4>Setup Profile</h4>
              <input type="text" placeholder="Enter your name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              <input type="email" placeholder="Enter your email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              <input type="file" accept="image/*" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = () => setProfile({ ...profile, picture: reader.result });
                  reader.readAsDataURL(e.target.files[0]);
                }
              }} />
              <button onClick={saveProfile}>Save Profile</button>
              <button onClick={() => setShowProfileSetup(false)}>Cancel</button>
            </div>
          )}

          {/* Navbar Toggle Button */}
          <button className="nav-toggle-btn" onClick={navbarHandler}>
            {nav ? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="menu-outline"></ion-icon>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
