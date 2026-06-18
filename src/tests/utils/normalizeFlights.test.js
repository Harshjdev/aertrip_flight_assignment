import {
  normalizeFlights,
  normalizeResult,
  getPriceBounds,
} from '../../utils/normalizeFlights';
import { mockApiPayload } from '../fixtures';

describe('normalizeFlights', () => {
  it('flattens all vendor groups into a single list', () => {
    const flights = normalizeFlights(mockApiPayload);
    expect(flights).toHaveLength(3); // 2 from tp + 1 from 6e
  });

  it('produces ids that are unique across vendors', () => {
    const flights = normalizeFlights(mockApiPayload);
    const ids = flights.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('tp-0');
    expect(ids).toContain('6e-0');
  });

  it('resolves airline and city names from the dictionaries', () => {
    const flights = normalizeFlights(mockApiPayload);
    const vistara = flights.find((f) => f.id === 'tp-0');
    expect(vistara.airlineName).toBe('Vistara');
    expect(vistara.airlineColor).toBe('#601848');
    expect(vistara.fromCity).toBe('Mumbai');
    expect(vistara.toCity).toBe('Kolkata');
    expect(vistara.fromCode).toBe('BOM');
    expect(vistara.toCode).toBe('CCU');
  });

  it('maps price, duration, times and stops', () => {
    const flights = normalizeFlights(mockApiPayload);
    const vistara = flights.find((f) => f.id === 'tp-0');
    expect(vistara.price).toBe(4564);
    expect(vistara.durationSeconds).toBe(9600);
    expect(vistara.departTime).toBe('07:05');
    expect(vistara.arriveTime).toBe('09:45');
    expect(vistara.stops).toBe(0);
  });

  it('returns an empty array for a malformed payload', () => {
    expect(normalizeFlights({})).toEqual([]);
    expect(normalizeFlights(null)).toEqual([]);
  });
});

describe('normalizeResult', () => {
  it('falls back to the airline code when no name is found', () => {
    const raw = { id: '9', al: ['ZZ'], ap: ['BOM', 'CCU'], tt: [600], stp: '1', farepr: 1000 };
    const view = normalizeResult(raw, 'tp', {});
    expect(view.airlineName).toBe('ZZ');
    expect(view.airlineColor).toBe('#334155'); // default colour
    expect(view.stops).toBe(1);
  });
});

describe('getPriceBounds', () => {
  it('derives min and max prices', () => {
    const flights = normalizeFlights(mockApiPayload);
    expect(getPriceBounds(flights)).toEqual({ min: 3855, max: 5687 });
  });

  it('returns null for an empty list', () => {
    expect(getPriceBounds([])).toBeNull();
  });
});
