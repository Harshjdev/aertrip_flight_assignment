import './states.css';
import Button from '../ui/Button';

export default function EmptyState({ onReset }) {
  return (
    <div className="state state--empty" role="status">
      <div className="state__icon" aria-hidden="true">🔍</div>
      <h2 className="state__title">No flights match your filters</h2>
      <p className="state__text">Try widening the price range to see more options.</p>
      {onReset && <Button variant="outline" onClick={onReset}>Clear filters</Button>}
    </div>
  );
}
