import "../styles/RowBox.css";
import AppointmentRow from "../components/AppointmentRow";
import type { Slot } from "../types";

type Props = { slots: Slot[]; isOwner?: boolean };

export default function Appointments(props: Props) {
  return (
    <div className="outer-box">
      <div className="outer-header">
        <h3>Upcoming Appointments</h3>
        {!props.isOwner && <a href="/appointments">Manage all</a>}
      </div>
      {props.slots.length === 0 && <p style={{ color: "#b9b9b9" }}>No upcoming appointments.</p>}
      {props.slots.map((slot) => (
        <AppointmentRow key={slot._id} slot={slot} isOwner={props.isOwner} />
      ))}
    </div>
  );
}
