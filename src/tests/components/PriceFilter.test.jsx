jest.mock('../../services/flightsApi', () => ({ getFlights: jest.fn() }));

import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import flightsReducer from '../../features/flights/flightsSlice';
import FiltersSidebar from '../../components/Filters/FiltersSidebar';

// Build a store preloaded as if flights had already loaded.
function setup() {
  const items = [
    { id: 'a', price: 4000 },
    { id: 'b', price: 6000 },
    { id: 'c', price: 9000 },
  ];
  const store = configureStore({
    reducer: { flights: flightsReducer },
    preloadedState: {
      flights: {
        status: 'succeeded',
        error: null,
        items,
        priceBounds: { min: 4000, max: 9000 },
        filters: { priceRange: { min: 4000, max: 9000 } },
        sort: { key: 'price', direction: 'asc' },
      },
    },
  });
  const utils = render(
    <Provider store={store}>
      <FiltersSidebar />
    </Provider>,
  );
  return { store, ...utils };
}

describe('FiltersSidebar + PriceFilter', () => {
  it('shows the full flight count initially', () => {
    setup();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('flights')).toBeInTheDocument();
  });

  it('shows the min and max price bounds', () => {
    setup();
    expect(screen.getByText(/Min ₹4,000/)).toBeInTheDocument();
    expect(screen.getByText(/Max ₹9,000/)).toBeInTheDocument();
  });

  it('filters the count when the max thumb is lowered', () => {
    const { store } = setup();
    const maxThumb = screen.getByLabelText('Maximum price');

    fireEvent.change(maxThumb, { target: { value: '5000' } });

    // Only the 4000 flight remains under a 5000 ceiling.
    expect(store.getState().flights.filters.priceRange.max).toBe(5000);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('flight')).toBeInTheDocument(); // singular
  });

  it('resets the range and count when Clear filters is clicked', () => {
    const { store } = setup();
    const maxThumb = screen.getByLabelText('Maximum price');
    fireEvent.change(maxThumb, { target: { value: '5000' } });

    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

    expect(store.getState().flights.filters.priceRange).toEqual({ min: 4000, max: 9000 });
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
