import { useDispatch } from 'react-redux';
import { useFlights } from '../hooks/useFlights';
import { clearFilters } from '../features/flights/flightsSlice';
import FiltersSidebar from '../components/Filters/FiltersSidebar';
import SortBar from '../components/Filters/SortBar';
import FlightList from '../components/FlightList/FlightList';
import SkeletonCard from '../components/states/SkeletonCard';
import EmptyState from '../components/states/EmptyState';
import ErrorState from '../components/states/ErrorState';

const SKELETON_COUNT = 6;

export default function FlightsPage() {
  const dispatch = useDispatch();
  const { status, error, flights, retry } = useFlights();

  const isLoading = status === 'loading' || status === 'idle';
  const isError = status === 'failed';
  const isEmpty = status === 'succeeded' && flights.length === 0;

  return (
    <div className="page">
      <div className="results-layout">
        {status === 'succeeded' && (
          <div className="results-sidebar">
            <FiltersSidebar />
          </div>
        )}

        <div
          className="results-main"
          style={status === 'succeeded' ? undefined : { gridColumn: '1 / -1' }}
        >
          {status === 'succeeded' && !isEmpty && <SortBar />}

          {isLoading && (
            <div aria-busy="true">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {isError && <ErrorState message={error} onRetry={retry} />}
          {isEmpty && <EmptyState onReset={() => dispatch(clearFilters())} />}
          {status === 'succeeded' && !isEmpty && <FlightList flights={flights} />}
        </div>
      </div>
    </div>
  );
}
