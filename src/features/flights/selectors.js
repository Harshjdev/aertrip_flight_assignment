import { SORT_DIRECTION, SORT_KEYS } from '../../utils/constants';

// Base selectors
export const selectStatus = (state) => state.flights.status;
export const selectError = (state) => state.flights.error;
export const selectAllFlights = (state) => state.flights.items;
export const selectPriceBounds = (state) => state.flights.priceBounds;
export const selectPriceRange = (state) => state.flights.filters.priceRange;
export const selectSort = (state) => state.flights.sort;

const comparators = {
  [SORT_KEYS.PRICE]: (a, b) => a.price - b.price,
  [SORT_KEYS.DURATION]: (a, b) => a.durationSeconds - b.durationSeconds,
  [SORT_KEYS.DEPART]: (a, b) => a.departSortKey - b.departSortKey,
  [SORT_KEYS.ARRIVAL]: (a, b) => a.arriveSortKey - b.arriveSortKey,
};

// Filter flights by price range
export const selectPriceFilteredFlights = (state) => {
  const items = selectAllFlights(state);
  const range = selectPriceRange(state);
  if (!range) return items;
  return items.filter((f) => f.price >= range.min && f.price <= range.max);
};

// Sort the filtered flights
export const selectVisibleFlights = (state) => {
  const filtered = selectPriceFilteredFlights(state);
  const sort = selectSort(state);
  const compare = comparators[sort.key] || comparators[SORT_KEYS.PRICE];
  const sorted = [...filtered].sort(compare);
  if (sort.direction === SORT_DIRECTION.DESC) sorted.reverse();
  return sorted;
};

export const selectVisibleCount = (state) => selectPriceFilteredFlights(state).length;
