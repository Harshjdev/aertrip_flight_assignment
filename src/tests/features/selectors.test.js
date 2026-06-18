import {
  selectVisibleFlights,
  selectVisibleCount,
  selectPriceFilteredFlights,
} from '../../features/flights/selectors';
import { SORT_DIRECTION, SORT_KEYS } from '../../utils/constants';

// Minimal, deterministic flight view-models for selector logic.
const items = [
  { id: 'a', price: 5000, durationSeconds: 9600, departSortKey: 425, arriveSortKey: 585 },
  { id: 'b', price: 3000, durationSeconds: 14400, departSortKey: 720, arriveSortKey: 960 },
  { id: 'c', price: 9000, durationSeconds: 7200, departSortKey: 320, arriveSortKey: 500 },
];

const makeState = (overrides = {}) => ({
  flights: {
    items,
    filters: { priceRange: { min: 0, max: 100000 }, ...overrides.filters },
    sort: overrides.sort || { key: SORT_KEYS.PRICE, direction: SORT_DIRECTION.ASC },
    ...overrides.flights,
  },
});

describe('selectPriceFilteredFlights', () => {
  it('keeps only flights within the active price range', () => {
    const state = makeState({ filters: { priceRange: { min: 2500, max: 6000 } } });
    const result = selectPriceFilteredFlights(state);
    expect(result.map((f) => f.id).sort()).toEqual(['a', 'b']);
  });

  it('returns everything when no range is set', () => {
    const state = makeState({ filters: { priceRange: null } });
    expect(selectPriceFilteredFlights(state)).toHaveLength(3);
  });
});

describe('selectVisibleCount', () => {
  it('reflects the number of price-filtered flights', () => {
    const state = makeState({ filters: { priceRange: { min: 0, max: 4000 } } });
    expect(selectVisibleCount(state)).toBe(1); // only 'b' at 3000
  });
});

describe('selectVisibleFlights — sorting', () => {
  it('sorts by price ascending by default', () => {
    const state = makeState();
    expect(selectVisibleFlights(state).map((f) => f.id)).toEqual(['b', 'a', 'c']);
  });

  it('reverses for descending price', () => {
    const state = makeState({ sort: { key: SORT_KEYS.PRICE, direction: SORT_DIRECTION.DESC } });
    expect(selectVisibleFlights(state).map((f) => f.id)).toEqual(['c', 'a', 'b']);
  });

  it('sorts by duration shortest first', () => {
    const state = makeState({ sort: { key: SORT_KEYS.DURATION, direction: SORT_DIRECTION.ASC } });
    expect(selectVisibleFlights(state).map((f) => f.id)).toEqual(['c', 'a', 'b']);
  });

  it('sorts by departure earliest first', () => {
    const state = makeState({ sort: { key: SORT_KEYS.DEPART, direction: SORT_DIRECTION.ASC } });
    expect(selectVisibleFlights(state).map((f) => f.id)).toEqual(['c', 'a', 'b']);
  });

  it('sorts by arrival earliest first', () => {
    const state = makeState({ sort: { key: SORT_KEYS.ARRIVAL, direction: SORT_DIRECTION.ASC } });
    expect(selectVisibleFlights(state).map((f) => f.id)).toEqual(['c', 'a', 'b']);
  });

  it('does not mutate the source array', () => {
    const state = makeState({ sort: { key: SORT_KEYS.PRICE, direction: SORT_DIRECTION.DESC } });
    selectVisibleFlights(state);
    expect(state.flights.items.map((f) => f.id)).toEqual(['a', 'b', 'c']);
  });
});
