import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "sidebar-link active" : "sidebar-link";

export default function Sidebar() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? (JSON.parse(storedUser) as { role: string }) : null;
  const isOwner = user?.role === "owner";

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <div className="menu-title">MENU</div>
        <NavLink to="/dashboard" className={getLinkClass}>
          Dashboard
        </NavLink>

        {isOwner && (
          <NavLink to="/oh" className={getLinkClass}>
            Office Hours
          </NavLink>
        )}
        <NavLink to="/appointments" className={getLinkClass}>
          My Appointments
        </NavLink>
        {isOwner && (
          <NavLink to="/meetings" className={getLinkClass}>
            One-on-One Meetings
          </NavLink>
        )}
        {isOwner && (
          <NavLink to="/gm" className={getLinkClass}>
            Group Meetings
          </NavLink>
        )}
      </nav>
    </div>
  );
}
