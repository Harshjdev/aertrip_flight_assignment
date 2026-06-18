import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../features/flights/flightsSlice';
import { selectSort } from '../../features/flights/selectors';
import { SORT_DIRECTION, SORT_OPTIONS } from '../../utils/constants';
import './SortBar.css';

export default function SortBar() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  return (
    <div className="sort-bar" role="group" aria-label="Sort flights">
      <span className="sort-bar__label">Sort by</span>
      <div className="sort-bar__options">
        {SORT_OPTIONS.map((option) => {
          const isActive = sort.key === option.key;
          const isAsc = sort.direction === SORT_DIRECTION.ASC;
          return (
            <button
              key={option.key}
              type="button"
              className={`sort-bar__btn${isActive ? ' sort-bar__btn--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => dispatch(setSort(option.key))}
            >
              {option.label}
              {isActive && <span className="sort-bar__arrow" aria-hidden="true">{isAsc ? '▼' : '▲'}</span>}
              {isActive && <span className="sr-only">{isAsc ? ', ascending' : ', descending'}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
