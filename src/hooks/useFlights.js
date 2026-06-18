import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../features/flights/flightsThunks';
import { selectError, selectStatus, selectVisibleCount, selectVisibleFlights } from '../features/flights/selectors';

// Fetches flight data when the component loads and provides loading, data, and retry functionality.
export function useFlights() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const flights = useSelector(selectVisibleFlights);
  const count = useSelector(selectVisibleCount);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchFlights());
  }, [status, dispatch]);

  const retry = useCallback(() => dispatch(fetchFlights()), [dispatch]);

  return { status, error, flights, count, retry };
}

export default useFlights;
