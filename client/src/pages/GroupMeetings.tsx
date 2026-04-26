import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

const GroupMeetings: React.FC = () => {
  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="outer-box">
            <div className="outer-header">
              <h3>Group Meetings</h3>
            </div>
            <p style={{ color: "#b9b9b9" }}>Coming soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupMeetings;
