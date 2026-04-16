import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard: React.FC = () => {
  return (
    <div className="user-page">
      <div className="user-container">
        <Navbar />
        <main></main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
