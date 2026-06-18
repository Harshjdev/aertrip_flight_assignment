import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from '../features/flights/flightsSlice';

// Redux store
export const store = configureStore({
  reducer: { flights: flightsReducer },
  devTools: import.meta.env?.MODE !== 'production',
});

export default store;
