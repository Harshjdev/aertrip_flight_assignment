import axiosInstance from './axiosInstance';

const ENDPOINT = import.meta.env?.VITE_FLIGHTS_ENDPOINT ?? 'data/flights.json';

// Fetches the raw flights payload from the static JSON file.
export async function getFlights() {
  const res = await axiosInstance.get(ENDPOINT);
  return res.data;
}
