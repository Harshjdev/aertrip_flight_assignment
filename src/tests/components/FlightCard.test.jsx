import { render, screen } from '@testing-library/react';
import FlightCard from '../../components/FlightCard/FlightCard';

const flight = {
  id: 'tp-0',
  airlineName: 'Vistara',
  airlineColor: '#601848',
  airlineCode: 'UK',
  fromCity: 'Mumbai',
  fromCode: 'BOM',
  toCity: 'Kolkata',
  toCode: 'CCU',
  departTime: '07:05',
  arriveTime: '09:45',
  durationSeconds: 9600,
  stops: 0,
  price: 4564,
};

describe('FlightCard', () => {
  it('renders airline, cities, times, duration and price', () => {
    render(<FlightCard flight={flight} />);

    expect(screen.getByText('Vistara')).toBeInTheDocument();
    expect(screen.getByText('07:05')).toBeInTheDocument();
    expect(screen.getByText('09:45')).toBeInTheDocument();
    expect(screen.getByText('2h 40m')).toBeInTheDocument();
    expect(screen.getByText('Non-stop')).toBeInTheDocument();
    expect(screen.getByText(/4,564/)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai/)).toBeInTheDocument();
    expect(screen.getByText(/Kolkata/)).toBeInTheDocument();
  });

  it('labels multi-stop journeys correctly', () => {
    render(<FlightCard flight={{ ...flight, id: 'tp-9', stops: 2 }} />);
    expect(screen.getByText('2 stops')).toBeInTheDocument();
  });

  it('exposes an accessible label describing the flight', () => {
    render(<FlightCard flight={flight} />);
    expect(
      screen.getByLabelText('Vistara flight from Mumbai to Kolkata'),
    ).toBeInTheDocument();
  });
});
