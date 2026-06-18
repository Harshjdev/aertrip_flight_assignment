import './Header.css';

export default function Header({ origin, destination, date, passengers }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">✈</span>
          <span className="site-header__name">Aertrip</span>
        </div>
        {(origin || destination) && (
          <div className="site-header__search" aria-label="Current search">
            <span className="site-header__route">
              <strong>{origin}</strong>
              <span className="site-header__arrow" aria-hidden="true">→</span>
              <strong>{destination}</strong>
            </span>
            <span className="site-header__meta">{date}{passengers ? ` · ${passengers}` : ''}</span>
          </div>
        )}
      </div>
    </header>
  );
}
