import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentSidebar from "../components/StudentSidebar";
import type { Slot } from "../types";
import { authFetch } from "../utils/fetch";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

const ManageSlots: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Office Hours");
  const [error, setError] = useState("");

  const fetchSlots = async () => {
    const res = await authFetch("/api/slots/created");
    const data = await res.json();
    setSlots(data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await authFetch("/api/slots", {
      method: "POST",
      body: JSON.stringify({ course, date, time, type }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create slot");
      return;
    }
    setCourse("");
    setDate("");
    setTime("");
    setType("Office Hours");
    fetchSlots();
  };

  const handleActivate = async (id: string) => {
    await authFetch(`/api/slots/${id}/publish`, { method: "PATCH" });
    fetchSlots();
  };

  const handleDelete = async (slot: Slot) => {
    const res = await authFetch(`/api/slots/${slot._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.bookedBy) {
      window.location.href = `mailto:${data.bookedBy.email}?subject=Slot Cancelled&body=Your booking for ${slot.course} on ${slot.date} at ${slot.time} has been cancelled.`;
    }
    fetchSlots();
  };

  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <StudentSidebar />
        <div className="dashboard-content">

          <div className="outer-box">
            <div className="outer-header">
              <h3>Create Slot</h3>
            </div>
            <form onSubmit={handleCreate} style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label>Course</label>
                <input value={course} onChange={e => setCourse(e.target.value)} placeholder="COMP XXX" required />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label>Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label>Type</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option>Office Hours</option>
                  <option>1-on-1</option>
                  <option>Group Meeting</option>
                </select>
              </div>
              {error && <p style={{ color: "#d61f2c", margin: 0 }}>{error}</p>}
              <button type="submit" className="button">Create</button>
            </form>
          </div>

          <div className="outer-box">
            <div className="outer-header">
              <h3>My Slots</h3>
            </div>
            {slots.length === 0 && <p style={{ color: "#b9b9b9" }}>No slots yet.</p>}
            {slots.map(slot => {
              const date = new Date(slot.date);
              const day = date.toLocaleString("default", { weekday: "short" });
              return (
                <div key={slot._id} className="inner-row">
                  <div className="appointment-info">
                    <div className="title">{slot.type} | {day} {slot.time}</div>
                    <div className="info">{slot.course} · {slot.date}</div>
                    {slot.bookedBy && <div className="info">Booked by: {slot.bookedBy.name} ({slot.bookedBy.email})</div>}
                  </div>
                  <select
                    className={`status ${slot.status}`}
                    value={slot.status}
                    disabled={slot.status !== "private"}
                    onChange={() => handleActivate(slot._id)}
                    style={{ cursor: slot.status === "private" ? "pointer" : "default", border: "none", appearance: "none", width: "auto", minWidth: "fit-content", padding: "6px 12px" }}
                  >
                    <option value="private">Private</option>
                    <option value="active">Active</option>
                    {slot.status === "booked" && <option value="booked">Booked</option>}
                  </select>
                  <div className="grouped-actions">
                    {slot.bookedBy && (
                      <a href={`mailto:${slot.bookedBy.email}`} className="button blue" style={{ textDecoration: "none" }}>✉</a>
                    )}
                    <button className="button red" onClick={() => handleDelete(slot)}>✕</button>
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

export default ManageSlots;
