// Jeremy
import "../styles/InfoBox.css";

type Props = {
  count: number;
};

export default function InfoUpcomingAppointments({ count }: Props) {
  return (
    <div className="info-card">
      <div className="info-number">{count}</div>
      <div className="info-text">Upcoming Appointments</div>
    </div>
  );
}
