import { toAbsoluteMinutes } from './formatters';

// Transforms the nested Aertrip API response into a flat array of UI-ready flight objects.

const safeNumber = (v, fallback = 0) => { const n = Number(v); return Number.isFinite(n) ? n : fallback; };
const firstAirport = (ap) => (Array.isArray(ap) && ap.length ? ap[0] : '');
const lastAirport = (ap) => (Array.isArray(ap) && ap.length ? ap[ap.length - 1] : '');
const cityFor = (code, apdet) => apdet?.[code]?.c || code || '';

export function normalizeResult(raw, vendorCode, { aldet = {}, alMaster = {}, apdet = {} }) {
  const airlineCode = Array.isArray(raw.al) ? raw.al[0] : raw.al || '';
  const airlineName = aldet[airlineCode] || alMaster[airlineCode]?.name || airlineCode;
  const airlineColor = alMaster[airlineCode]?.bgcolor || '#334155';
  const fromCode = firstAirport(raw.ap);
  const toCode = lastAirport(raw.ap);
  const durationSeconds = Array.isArray(raw.tt) ? safeNumber(raw.tt[0]) : safeNumber(raw.tt);

  return {
    id: `${vendorCode}-${raw.id}`,
    airlineCode, airlineName, airlineColor,
    fromCode, fromCity: cityFor(fromCode, apdet),
    toCode, toCity: cityFor(toCode, apdet),
    departTime: raw.dt || '',
    arriveTime: raw.at || '',
    durationSeconds,
    stops: safeNumber(raw.stp),
    price: safeNumber(raw.farepr),
    departSortKey: toAbsoluteMinutes(raw.dd, raw.dt),
    arriveSortKey: toAbsoluteMinutes(raw.ad, raw.at),
  };
}

export function normalizeFlights(payload) {
  const groups = payload?.data?.flights ?? [];
  const flights = [];
  for (const group of groups) {
    const results = group?.results;
    if (!results || !Array.isArray(results.j)) continue;
    const dicts = { aldet: results.aldet, alMaster: results.alMaster, apdet: results.apdet };
    for (const raw of results.j) {
      flights.push(normalizeResult(raw, group.vcode || 'xx', dicts));
    }
  }
  return flights;
}

export function getPriceBounds(flights) {
  if (!Array.isArray(flights) || flights.length === 0) return null;
  let min = Infinity, max = -Infinity;
  for (const f of flights) {
    if (f.price < min) min = f.price;
    if (f.price > max) max = f.price;
  }
  return { min, max };
}
