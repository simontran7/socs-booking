import "../styles/RowBox.css";
import type { Slot } from "../types";

type Props = { slot: Slot; isOwner?: boolean };

export default function AppointmentRow(props: Props) {
  const { slot, isOwner } = props;
  const date = new Date(slot.date);
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = date.getDate();

  const personName = isOwner ? (slot.bookedBy?.name ?? "") : slot.ownerName;

  return (
    <div className="inner-row">
      <div className="row-left">
        <div className="appointment-date">
          <div className="month">{month}</div>
          <div className="day">{day}</div>
        </div>

        <div className="appointment-info">
          <div className="title">{personName} · {slot.course.toUpperCase()}</div>
          <div className="info">{slot.time} · {slot.type}</div>
        </div>
      </div>

    </div>
  );
}
