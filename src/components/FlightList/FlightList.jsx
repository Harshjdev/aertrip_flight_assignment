import FlightCard from '../FlightCard/FlightCard';
import './FlightList.css';

// receives the sorted array and maps it to cards.
export default function FlightList({ flights }) {
  return (
    <ul className="flight-list" aria-label="Flight results">
      {flights.map((flight) => (
        <li key={flight.id} className="flight-list__item">
          <FlightCard flight={flight} />
        </li>
      ))}
    </ul>
  );
}
