// Jeremy
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import PollManager from "../components/PollManager";
import CreatePoll from "../components/CreatePoll";
import PollVoteRow from "../components/PollVoteRow";
import { authFetch } from "../utils/fetch";
import "../styles/Dashboard.css";
import "../styles/RowBox.css";

type PollSlotView = { id: string; start: string; end: string; voteCount: number };
type PollView = { _id: string; course: string; slots: PollSlotView[] };

const GroupMeetings: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? (JSON.parse(storedUser) as { id: string; role: string }) : null;
  const isOwner = user?.role === "owner";

  const [polls, setPolls] = useState<PollView[]>([]);

  const fetchPolls = async () => {
    const res = await authFetch("/api/polls");
    if (res.ok) setPolls(await res.json());
  };

  useEffect(() => {
    if (!isOwner) fetchPolls();
    window.addEventListener("poll-updated", fetchPolls);
    return () => window.removeEventListener("poll-updated", fetchPolls);
  }, [isOwner]);

  return (
    <div className="user-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          {isOwner ? (
            <>
              <CreatePoll />
              <PollManager />
            </>
          ) : (
            <div className="outer-box">
              <div className="outer-header">
                <h3>Open Polls</h3>
              </div>
              {polls.length === 0 && <p style={{ color: "#b9b9b9" }}>No open polls.</p>}
              {polls.map((poll) => (
                <PollVoteRow key={poll._id} poll={poll} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupMeetings;
