import React, { useState, useEffect } from "react";
import Arweave from "arweave";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    picture: null,
  });
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  // Load saved profile from localStorage
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
    <header className="header" data-header>
      <div className="container">
        <a href="#">
          <img
            src="/assets/images/logo-small.svg"
            width="40"
            height="40"
            alt="home"
            className="logo-small"
          />
        </a>

        <nav className={`navbar ${nav ? "active" : ""}`}>
          <ul className="navbar-list">
            <li>
              <a href="#" className="navbar-link label-lg link:hover">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link label-lg link:hover">
                Explore
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link label-lg link:hover">
                Wallet
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link label-lg link:hover">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link label-lg link:hover">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-action">
          {/* Wallet Button */}
          <button className="btn-icon primary" aria-label="wallet" onClick={walletClickHandler}>
            <ion-icon name="wallet-outline"></ion-icon>
          </button>

          {/* Wallet Details */}
          {showWalletDetails && walletDetails && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "100px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                width: "300px",
              }}
            >
              <h4>Wallet Details</h4>
              <p><strong>Address:</strong> {walletDetails.address}</p>
              <p><strong>Balance:</strong> {walletDetails.balance} AR</p>
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={() => setShowWalletDetails(false)}
              >
                Close
              </button>
            </div>
          )}

          {/* Profile Button */}
          <button
            className="btn-icon profile-btn"
            aria-label="Setup Profile"
            onClick={profileSetupHandler}
          >
            {profile.picture ? (
              <img
                src={profile.picture}
                alt={profile.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <ion-icon name="person-outline"></ion-icon>
            )}
          </button>

          {/* Profile Setup Screen */}
          {showProfileSetup && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "20px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                width: "300px",
              }}
            >
              <h4 style={{ margin: "5px 0", textAlign: "center" }}>Setup Profile</h4>
              <input
                type="text"
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                style={{ marginBottom: "10px" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => setProfile({ ...profile, picture: reader.result });
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={saveProfile}
              >
                Save Profile
              </button>
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setShowProfileSetup(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Navbar Toggle Button */}
          <button
            className={`nav-toggle-btn ${nav ? "active" : ""}`}
            onClick={navbarHandler}
          >
            {nav ? (
              <ion-icon
                name="close-outline"
                aria-hidden="true"
                className="active-icon"
              ></ion-icon>
            ) : (
              <ion-icon
                name="menu-outline"
                className="default-icon"
              ></ion-icon>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
