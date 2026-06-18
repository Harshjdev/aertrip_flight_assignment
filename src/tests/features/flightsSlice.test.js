// Mock the API module so importing the slice (which transitively imports the
// Axios-based service) never pulls in the real network client during tests.
jest.mock('../../services/flightsApi', () => ({ getFlights: jest.fn() }));

import reducer, {
  setSort,
  setPriceRange,
  clearFilters,
} from '../../features/flights/flightsSlice';
import { fetchFlights } from '../../features/flights/flightsThunks';
import { DEFAULT_SORT, SORT_DIRECTION, SORT_KEYS } from '../../utils/constants';

const baseState = () => reducer(undefined, { type: '@@INIT' });

describe('flightsSlice — initial state', () => {
  it('starts idle with default sort and no items', () => {
    const state = baseState();
    expect(state.status).toBe('idle');
    expect(state.items).toEqual([]);
    expect(state.sort).toEqual(DEFAULT_SORT);
    expect(state.filters.priceRange).toBeNull();
  });
});

describe('setSort', () => {
  it('activates a new option in ascending order', () => {
    const state = reducer(baseState(), setSort(SORT_KEYS.DURATION));
    expect(state.sort).toEqual({ key: SORT_KEYS.DURATION, direction: SORT_DIRECTION.ASC });
  });

  it('toggles direction when the active option is reselected', () => {
    // Price is active/ascending by default, so the first reselect flips to desc.
    let state = reducer(baseState(), setSort(SORT_KEYS.PRICE));
    expect(state.sort.direction).toBe(SORT_DIRECTION.DESC);
    state = reducer(state, setSort(SORT_KEYS.PRICE));
    expect(state.sort.direction).toBe(SORT_DIRECTION.ASC);
  });

  it('ignores unknown sort keys', () => {
    const state = reducer(baseState(), setSort('nonsense'));
    expect(state.sort).toEqual(DEFAULT_SORT);
  });
});

describe('setPriceRange', () => {
  it('updates the active range', () => {
    const state = reducer(baseState(), setPriceRange({ min: 4000, max: 8000 }));
    expect(state.filters.priceRange).toEqual({ min: 4000, max: 8000 });
  });

  it('normalises an inverted range', () => {
    const state = reducer(baseState(), setPriceRange({ min: 8000, max: 4000 }));
    expect(state.filters.priceRange).toEqual({ min: 4000, max: 8000 });
  });
});

describe('clearFilters', () => {
  it('resets sort and price range to defaults', () => {
    // Arrange a loaded, mutated state.
    let state = reducer(baseState(), {
      type: fetchFlights.fulfilled.type,
      payload: { items: [], priceBounds: { min: 3000, max: 9000 } },
    });
    state = reducer(state, setSort(SORT_KEYS.DURATION));
    state = reducer(state, setPriceRange({ min: 5000, max: 6000 }));

    // Act
    state = reducer(state, clearFilters());

    // Assert
    expect(state.sort).toEqual(DEFAULT_SORT);
    expect(state.filters.priceRange).toEqual({ min: 3000, max: 9000 });
  });
});

describe('fetchFlights lifecycle', () => {
  it('sets loading on pending', () => {
    const state = reducer(baseState(), { type: fetchFlights.pending.type });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('stores items, bounds and initialises the slider on fulfilled', () => {
    const items = [{ id: 'x', price: 5000 }];
    const state = reducer(baseState(), {
      type: fetchFlights.fulfilled.type,
      payload: { items, priceBounds: { min: 5000, max: 5000 } },
    });
    expect(state.status).toBe('succeeded');
    expect(state.items).toBe(items);
    expect(state.priceBounds).toEqual({ min: 5000, max: 5000 });
    expect(state.filters.priceRange).toEqual({ min: 5000, max: 5000 });
  });

  it('captures the error message on rejected', () => {
    const state = reducer(baseState(), {
      type: fetchFlights.rejected.type,
      payload: 'Network error.',
    });
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network error.');
  });
});
