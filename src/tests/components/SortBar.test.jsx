jest.mock('../../services/flightsApi', () => ({ getFlights: jest.fn() }));

import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import flightsReducer from '../../features/flights/flightsSlice';
import SortBar from '../../components/Filters/SortBar';

function setup() {
  const store = configureStore({ reducer: { flights: flightsReducer } });
  const utils = render(
    <Provider store={store}>
      <SortBar />
    </Provider>,
  );
  return { store, ...utils };
}

describe('SortBar', () => {
  it('marks Price as active by default with a descending-capable toggle', () => {
    setup();
    const priceBtn = screen.getByRole('button', { name: /price/i });
    expect(priceBtn).toHaveAttribute('aria-pressed', 'true');
    // Default ascending shows the downward arrow.
    expect(priceBtn).toHaveTextContent('▼');
  });

  it('activates Duration when clicked', () => {
    const { store } = setup();
    fireEvent.click(screen.getByRole('button', { name: /duration/i }));
    expect(store.getState().flights.sort.key).toBe('duration');
    expect(store.getState().flights.sort.direction).toBe('asc');
  });

  it('toggles the active option direction (arrow flips to up)', () => {
    const { store } = setup();
    const priceBtn = screen.getByRole('button', { name: /price/i });
    fireEvent.click(priceBtn); // price asc -> desc
    expect(store.getState().flights.sort.direction).toBe('desc');
    expect(priceBtn).toHaveTextContent('▲');
  });
});
