import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { authFetch } from "../utils/fetch";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

const capitalize = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

type Owner = { _id: string; name: string; email: string };

const Staff: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("/api/users")
      .then((r) => r.json())
      .then(setOwners);
  }, []);

  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="outer-box">
            <div className="outer-header">
              <h3>Staff</h3>
            </div>
            {owners.length === 0 && (
              <p style={{ color: "#b9b9b9" }}>No staff available.</p>
            )}
            {owners.map((owner) => {
              const initials = owner.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <div key={owner._id} className="inner-row">
                  <div className="row-left">
                    <div className="navbar-icon">{initials}</div>
                    <div className="appointment-info">
                      <div className="title">{capitalize(owner.name)}</div>
                      <div className="info">{owner.email}</div>
                    </div>
                  </div>
                  <div className="grouped-actions">
                    <button
                      className="button blue"
                      onClick={() => navigate(`/staff/${owner._id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Staff;
