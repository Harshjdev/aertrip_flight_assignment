import { memo } from 'react';
import { formatCurrency, formatDuration } from '../../utils/formatters';
import './FlightCard.css';

// Memoized so the list doesn't re-render unchanged cards on every sort/filter change.
function FlightCard({ flight }) {
  const { airlineName, airlineColor, airlineCode, fromCity, fromCode, toCity, toCode,
    departTime, arriveTime, durationSeconds, stops, price } = flight;

  const initials = (airlineName || airlineCode || '?').slice(0, 2).toUpperCase();
  const stopsLabel = stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`;

  return (
    <article className="flight-card" aria-label={`${airlineName} flight from ${fromCity} to ${toCity}`}>
      <div className="flight-card__airline">
        <span className="flight-card__logo" style={{ backgroundColor: airlineColor }} aria-hidden="true">
          {initials}
        </span>
        <span className="flight-card__airline-name">{airlineName}</span>
      </div>

      <div className="flight-card__point flight-card__point--depart">
        <span className="flight-card__time">{departTime}</span>
        <span className="flight-card__city">{fromCity} <span className="flight-card__code">({fromCode})</span></span>
      </div>

      <div className="flight-card__journey" aria-label={`${formatDuration(durationSeconds)}, ${stopsLabel}`}>
        <span className="flight-card__duration">{formatDuration(durationSeconds)}</span>
        <span className="flight-card__line" aria-hidden="true">
          <span className="flight-card__dot" />
          <span className="flight-card__plane">✈</span>
          <span className="flight-card__dot" />
        </span>
        <span className="flight-card__stops">{stopsLabel}</span>
      </div>

      <div className="flight-card__point flight-card__point--arrive">
        <span className="flight-card__time">{arriveTime}</span>
        <span className="flight-card__city">{toCity} <span className="flight-card__code">({toCode})</span></span>
      </div>

      <div className="flight-card__price">
        <span className="flight-card__amount">{formatCurrency(price)}</span>
        <span className="flight-card__amount-note">per adult</span>
      </div>
    </article>
  );
}

export default memo(FlightCard);
