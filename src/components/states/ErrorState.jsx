import './states.css';
import Button from '../ui/Button';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <div className="state__icon" aria-hidden="true">⚠️</div>
      <h2 className="state__title">We hit a snag</h2>
      <p className="state__text">{message || 'Unable to load flights right now.'}</p>
      {onRetry && <Button variant="primary" onClick={onRetry}>Try again</Button>}
    </div>
  );
}
