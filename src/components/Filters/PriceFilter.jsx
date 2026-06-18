import { useDispatch, useSelector } from 'react-redux';
import RangeSlider from '../ui/RangeSlider';
import { setPriceRange } from '../../features/flights/flightsSlice';
import { selectPriceBounds, selectPriceRange } from '../../features/flights/selectors';
import { formatCurrency } from '../../utils/formatters';
import './PriceFilter.css';

export default function PriceFilter() {
  const dispatch = useDispatch();
  const bounds = useSelector(selectPriceBounds);
  const range = useSelector(selectPriceRange);

  if (!bounds || !range) return null;

  return (
    <section className="price-filter" aria-label="Filter by price">
      <header className="price-filter__head">
        <h3 className="price-filter__title">Price</h3>
      </header>
      <div className="price-filter__values" aria-hidden="true">
        <span>{formatCurrency(range.min)}</span>
        <span>{formatCurrency(range.max)}</span>
      </div>
      <RangeSlider
        min={bounds.min} max={bounds.max} value={range} step={1}
        onChange={(next) => dispatch(setPriceRange(next))}
        formatLabel={formatCurrency}
      />
      <div className="price-filter__bounds" aria-hidden="true">
        <span>Min {formatCurrency(bounds.min)}</span>
        <span>Max {formatCurrency(bounds.max)}</span>
      </div>
    </section>
  );
}
