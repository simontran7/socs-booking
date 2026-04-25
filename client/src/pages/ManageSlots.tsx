import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import OwnerRequests from "../components/OwnerRequests";
import type { Slot } from "../types";
import { authFetch } from "../utils/fetch";
import { formatTime } from "../utils/time";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ManageSlots: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Office Hours");
  const [error, setError] = useState("");

  const [rCourse, setRCourse] = useState("");
  const [rTimeSlots, setRTimeSlots] = useState<{ day: number; time: string }[]>([]);
  const [rDay, setRDay] = useState(1);
  const [rAddTime, setRAddTime] = useState("");
  const [rStartDate, setRStartDate] = useState("");
  const [rWeeks, setRWeeks] = useState(1);
  const [rError, setRError] = useState("");
  const [rSuccess, setRSuccess] = useState("");

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
      body: JSON.stringify({ course: `COMP ${course}`, date, time: formatTime(time), type }),
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

  const handleAddTimeSlot = () => {
    if (!rAddTime) return;
    setRTimeSlots(prev => [...prev, { day: rDay, time: rAddTime }]);
    setRAddTime("");
  };

  const handleCreateRecurring = async (e: React.FormEvent) => {
    e.preventDefault();
    setRError("");
    setRSuccess("");
    if (rTimeSlots.length === 0) { setRError("Add at least one time slot"); return; }
    const res = await authFetch("/api/slots/recurring", {
      method: "POST",
      body: JSON.stringify({
        course: `COMP ${rCourse}`,
        timeSlots: rTimeSlots.map(s => ({ day: s.day, time: formatTime(s.time) })),
        startDate: rStartDate,
        weeks: rWeeks,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setRError(data.error || "Failed to create slots"); return; }
    setRSuccess(`${data.count} slots created.`);
    setRCourse(""); setRTimeSlots([]); setRAddTime(""); setRStartDate(""); setRWeeks(1);
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
        <Sidebar />
        <div className="dashboard-content">

          <div className="outer-box">
            <div className="outer-header">
              <h3>Create Slot</h3>
            </div>
            <form onSubmit={handleCreate} style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label>Course</label>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontWeight: 600 }}>COMP</span>
                  <input
                    value={course}
                    onChange={e => setCourse(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="307"
                    maxLength={3}
                    style={{ width: "60px" }}
                    required
                  />
                </div>
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
              <h3>Create Recurring Slots</h3>
            </div>
            <form onSubmit={handleCreateRecurring} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label>Course</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontWeight: 600 }}>COMP</span>
                    <input
                      value={rCourse}
                      onChange={e => setRCourse(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="307"
                      maxLength={3}
                      style={{ width: "60px" }}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label>Start Date</label>
                  <input type="date" value={rStartDate} onChange={e => setRStartDate(e.target.value)} required />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label>Weeks</label>
                  <input
                    type="number" min={1} max={52} value={rWeeks}
                    onChange={e => setRWeeks(Number(e.target.value))}
                    style={{ width: "70px" }} required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label>Day</label>
                  <select value={rDay} onChange={e => setRDay(Number(e.target.value))}>
                    {DAYS.map((label, i) => <option key={i} value={i}>{label}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label>Time</label>
                  <input type="time" value={rAddTime} onChange={e => setRAddTime(e.target.value)} />
                </div>
                <button type="button" className="button" onClick={handleAddTimeSlot}>Add Slot</button>
              </div>

              {rTimeSlots.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {rTimeSlots.map((s, i) => (
                    <div key={i} className="button" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {DAYS[s.day]} {formatTime(s.time)}
                      <span style={{ cursor: "pointer", fontWeight: 700 }} onClick={() => setRTimeSlots(prev => prev.filter((_, j) => j !== i))}>×</span>
                    </div>
                  ))}
                </div>
              )}

              {rError && <p style={{ color: "#d61f2c", margin: 0 }}>{rError}</p>}
              {rSuccess && <p style={{ color: "#2e7d32", margin: 0 }}>{rSuccess}</p>}
              <div><button type="submit" className="button">Create</button></div>
            </form>
          </div>

          <div className="outer-box">
            <div className="outer-header">
              <h3>Slots with Me</h3>
            </div>
            {slots.length === 0 && <p style={{ color: "#b9b9b9" }}>No slots yet.</p>}
            {slots.map(slot => {
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
                      <div className="title">{slot.bookedBy ? `${slot.bookedBy.name} · ${slot.course.toUpperCase()}` : slot.course.toUpperCase()}</div>
                      <div className="info">{slot.time} · {slot.type}</div>
                    </div>
                  </div>
                  <div className="grouped-actions">
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
                    {slot.bookedBy && (
                      <a href={`mailto:${slot.bookedBy.email}`} className="button blue" style={{ textDecoration: "none" }}>✉</a>
                    )}
                    <button className="button red" onClick={() => handleDelete(slot)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg></button>
                  </div>
                </div>
              );
            })}
          </div>

          <OwnerRequests requests={[]} />

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageSlots;
