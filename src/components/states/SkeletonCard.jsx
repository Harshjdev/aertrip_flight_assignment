import './states.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__airline">
        <span className="skeleton skeleton--avatar" />
        <span className="skeleton skeleton--line skeleton--w80" />
      </div>
      <div className="skeleton-card__seg">
        <span className="skeleton skeleton--line skeleton--w60" />
        <span className="skeleton skeleton--line skeleton--w40" />
      </div>
      <div className="skeleton-card__seg">
        <span className="skeleton skeleton--line skeleton--w50" />
      </div>
      <div className="skeleton-card__price">
        <span className="skeleton skeleton--line skeleton--w70" />
      </div>
    </div>
  );
}
