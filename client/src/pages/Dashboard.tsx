import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentSidebar from "../components/StudentSidebar";
import InfoUpcomingAppointments from "../components/Info-UpcomingAppointments";
import MySlots from "../components/MySlots";
import InfoActiveSlots from "../components/Info-ActiveSlots";
import type { RequestSlot } from "../types";
import type { Slot } from "../types";
import InfoPendingRequests from "../components/Info-PendingRequests";
import Appointments from "../components/Appointments";
import Calendar from "../components/Calendar";
import Requests from "../components/Requests";
import OwnerRequests from "../components/OwnerRequests";
import InviteLinkButton from "../components/InviteLinkButton";
import { authFetch } from "../utils/fetch";
import "../styles/Dashboard.css";

const dummyRequests: RequestSlot[] = [
  {
    _id: "req1",
    ownerId: "owner123",
    ownerName: "Alice Smith",
    ownerEmail: "alice@example.com",
    course: "COMP 307",
    date: "2026-04-25",
    time: "14:00",
    type: "office-hours",
    status: "pending",
    createdBy: {
      userId: "user456",
      name: "John Doe",
      email: "john@example.com",
    },
    createdAt: new Date().toISOString(),
    message:
      "Hi, I'm having trouble understanding the last assignment. Could we go over the reduction step together?",
  },
  {
    _id: "req2",
    ownerId: "owner124",
    ownerName: "Bob Lee",
    ownerEmail: "bob@example.com",
    course: "COMP 251",
    date: "2026-04-26",
    time: "10:00",
    type: "review",
    status: "confirmed",
    createdBy: {
      userId: "user789",
      name: "Emma Brown",
      email: "emma@example.com",
    },
    createdAt: new Date().toISOString(),
    message:
      "Could you help me review dynamic programming? I want to make sure I'm ready for the midterm.",
  },
];

const Dashboard: React.FC = () => {
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [createdSlots, setCreatedSlots] = useState<Slot[]>([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser
    ? (JSON.parse(storedUser) as {
      firstName: string;
      lastName: string;
      role: string;
    })
    : null;

  useEffect(() => {
    const fetchAll = async () => {
      const booked = await authFetch("/api/slots/booked");
      setBookedSlots(await booked.json());

      if (user?.role === "owner") {
        const created = await authFetch("/api/slots/created");
        setCreatedSlots(await created.json());
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <StudentSidebar />
        <div className="dashboard-content">
          <div className="dashboard-info">
            <InfoUpcomingAppointments count={bookedSlots.length} />
            <InfoPendingRequests count={0} />
            {user?.role === "owner" && <InfoActiveSlots count={createdSlots.filter(s => s.status === "active").length} />}
          </div>
          <div className="dashboard-main">
            <Appointments slots={bookedSlots} />
            <Calendar />
          </div>
          {user?.role === "owner" ? (
            <>
              <OwnerRequests requests={dummyRequests} />
              <MySlots slots={createdSlots} />
              <InviteLinkButton />
            </>
          ) : (
            <Requests requests={dummyRequests} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
