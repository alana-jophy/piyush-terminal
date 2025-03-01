// import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TerminalComponent from "../components/Terminal";


const DashboardPage = () => {
  const navigate = useNavigate();
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
      {showTerminal && <TerminalComponent isVisible={showTerminal} />}
    </div>
  );
};

export default DashboardPage;
