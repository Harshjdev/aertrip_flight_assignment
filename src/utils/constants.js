export const SORT_KEYS = {
  PRICE: 'price',
  DURATION: 'duration',
  DEPART: 'depart',
  ARRIVAL: 'arrival',
};

export const SORT_DIRECTION = { ASC: 'asc', DESC: 'desc' };

export const SORT_OPTIONS = [
  { key: SORT_KEYS.PRICE, label: 'Price', defaultDirection: SORT_DIRECTION.ASC },
  { key: SORT_KEYS.DURATION, label: 'Duration', defaultDirection: SORT_DIRECTION.ASC },
  { key: SORT_KEYS.DEPART, label: 'Departure', defaultDirection: SORT_DIRECTION.ASC },
  { key: SORT_KEYS.ARRIVAL, label: 'Arrival', defaultDirection: SORT_DIRECTION.ASC },
];

export const DEFAULT_SORT = { key: SORT_KEYS.PRICE, direction: SORT_DIRECTION.ASC };

export const CURRENCY = 'INR';
export const LOCALE = 'en-IN';
