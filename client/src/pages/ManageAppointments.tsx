import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import type { Slot, RequestSlot } from "../types";
import { authFetch } from "../utils/fetch";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

const ManageAppointments: React.FC = () => {
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [requests, setRequests] = useState<RequestSlot[]>([]);

  const fetchAll = async () => {
    const slotsRes = await authFetch("/api/slots/booked");
    setBookedSlots(await slotsRes.json());

    const reqRes = await authFetch("/api/requests");
    if (reqRes.ok) setRequests(await reqRes.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCancel = async (slot: Slot) => {
    const res = await authFetch(`/api/slots/${slot._id}/book`, { method: "DELETE" });
    const data = await res.json();
    if (data.ownerEmail) {
      window.location.href = `mailto:${data.ownerEmail}?subject=Booking Cancelled&body=Hi, I have cancelled my booking for ${slot.course} on ${slot.date} at ${slot.time}.`;
    }
    fetchAll();
  };

  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">

          <div className="outer-box">
            <div className="outer-header">
              <h3>My Appointments</h3>
            </div>
            {bookedSlots.length === 0 && <p style={{ color: "#b9b9b9" }}>No booked appointments.</p>}
            {bookedSlots.map(slot => {
              const date = new Date(slot.date);
              const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
              const day = date.getDate();
              return (
                <div key={slot._id} className="slot-row">
                  <div className="row-left">
                    <div className="slot-row-date">
                      <span className="month">{month}</span>
                      <span className="day">{day}</span>
                    </div>
                    <div className="appointment-info" style={{ marginLeft: "12px" }}>
                      <div className="title">{slot.ownerName} · {slot.course.toUpperCase()}</div>
                      <div className="info">{slot.time} · {slot.type}</div>
                    </div>
                  </div>
                  <div className="grouped-actions">
                    <a href={`mailto:${slot.ownerEmail}`} className="button blue" style={{ textDecoration: "none" }}>✉</a>
                    <button className="button red" onClick={() => handleCancel(slot)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="outer-box">
            <div className="outer-header">
              <h3>Booking Requests</h3>
            </div>
            {requests.length === 0 && <p style={{ color: "#b9b9b9" }}>No booking requests.</p>}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageAppointments;
