import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFlights } from '../../services/flightsApi';
import { normalizeFlights, getPriceBounds } from '../../utils/normalizeFlights';

// Fetch, normalize, and store flight data. Normalization runs here so components get clean data.
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (_arg, { rejectWithValue }) => {
    try {
      const payload = await getFlights();
      const items = normalizeFlights(payload);
      const priceBounds = getPriceBounds(items);
      return { items, priceBounds };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load flights.');
    }
  },
);
