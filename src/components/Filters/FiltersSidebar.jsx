import { useDispatch, useSelector } from 'react-redux';
import PriceFilter from './PriceFilter';
import Button from '../ui/Button';
import { clearFilters } from '../../features/flights/flightsSlice';
import { selectVisibleCount } from '../../features/flights/selectors';
import './FiltersSidebar.css';

export default function FiltersSidebar() {
  const dispatch = useDispatch();
  const count = useSelector(selectVisibleCount);

  return (
    <aside className="filters" aria-label="Filters">
      <div className="filters__head">
        <div className="filters__count">
          <span className="filters__count-value">{count}</span>
          <span className="filters__count-label">{count === 1 ? 'flight' : 'flights'}</span>
        </div>
        <Button variant="ghost" onClick={() => dispatch(clearFilters())}>
          Clear filters
        </Button>
      </div>
      <PriceFilter />
    </aside>
  );
}
