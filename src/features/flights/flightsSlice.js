import { createSlice } from '@reduxjs/toolkit';
import { fetchFlights } from './flightsThunks';
import { DEFAULT_SORT, SORT_DIRECTION, SORT_OPTIONS } from '../../utils/constants';

// Holds raw flight items, loading state, active sort, and price filter.

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  items: [],
  priceBounds: null,
  filters: { priceRange: null },
  sort: { ...DEFAULT_SORT },
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSort(state, action) {
      const key = action.payload;
      const option = SORT_OPTIONS.find((o) => o.key === key);
      if (!option) return;
      if (state.sort.key === key) {
        state.sort.direction =
          state.sort.direction === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
      } else {
        state.sort.key = key;
        state.sort.direction = option.defaultDirection;
      }
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload || {};
      if (typeof min !== 'number' || typeof max !== 'number') return;
      state.filters.priceRange = { min: Math.min(min, max), max: Math.max(min, max) };
    },
    clearFilters(state) {
      state.filters.priceRange = state.priceBounds ? { ...state.priceBounds } : null;
      state.sort = { ...DEFAULT_SORT };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.priceBounds = action.payload.priceBounds;
        state.filters.priceRange = action.payload.priceBounds
          ? { ...action.payload.priceBounds }
          : null;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Failed to load flights.';
      });
  },
});

export const { setSort, setPriceRange, clearFilters } = flightsSlice.actions;
export default flightsSlice.reducer;
