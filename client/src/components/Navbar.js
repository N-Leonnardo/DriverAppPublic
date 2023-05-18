import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsMap } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [checkPage, setCheckPage] = useState(true);
  const [dashboard, setDashboard] = useState(false);
  const [newTrip, setNewTrip] = useState(false);
  const [account, setAccount] = useState(false);

  if (checkPage) {
    let page = document.URL;
    if (page.includes("dashboard")) {
      setDashboard(true);
    } else if (page.includes("newtrip")) {
      setNewTrip(true);
    } else if (page.includes("settings")) {
      setAccount(true);
    }
    setCheckPage(false);
  }
  return (
    <div className="z-40">
      <div className="btm-nav shadow">
        <button
          className={dashboard && "active"}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <AiOutlineHome className="text-lg" />
          <span className="text-xs">Home</span>
        </button>
        <button
          className={newTrip && "active"}
          onClick={() => {
            navigate("/newtrip");
          }}
        >
          <BsMap className="text-lg" />
          <span className="text-xs">New Trip</span>
        </button>
        <button className={account && "active"}>
          <AiOutlineUser className="text-lg" />
          <span className="text-xs">Account</span>
        </button>
      </div>
    </div>
  );
}
export default Navbar;
