# Aertrip Flight Results

A React-based flight search results page built as part of the Aertrip front-end assignment.

The sample data contains **65 flights** for the route:

**Mumbai (BOM) → Kolkata (CCU)**
**17 Oct 2021 · 1 Adult · Economy**

---

## Tech Stack

- **React 18**
- **Vite**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Jest + React Testing Library**

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

No backend setup is required. Flight data is loaded from:

```text
public/data/flights.json
```

---

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm test`      | Run tests                |
| `npm run lint`  | Run ESLint               |

---

## Features

- Sticky search header
- Flight cards showing airline, timings, duration, stops and fare
- Sorting by:

  - Price
  - Duration
  - Departure time
  - Arrival time

- Clicking the same sort option toggles ascending/descending order
- Price range filter with instant updates
- Live flight count in the sidebar
- Clear filters option
- Loading skeletons
- Error state with retry support
- Empty state handling
- Responsive layout for tablet and mobile devices

---

## Project Structure

```
src/
├── app/          Store configuration
├── components/   Reusable UI components
├── features/     Redux slice, selectors and thunks
├── hooks/        Custom hooks
├── layouts/      Layout components
├── pages/        Application pages
├── routes/       Route configuration
├── services/     API layer
├── styles/       Global styles
├── tests/        Unit tests
└── utils/        Helpers and formatters
```

---

## State Management

Redux Toolkit is used to manage flight data and UI state.

The store keeps:

- Raw flight data
- Loading status
- Selected sort option
- Price filter values

Filtered and sorted results are derived using memoized selectors rather than storing separate arrays.

---

## Data Transformation

The API response contains nested structures and lookup tables. Before saving data to Redux, it is transformed into a simpler format through `normalizeFlights()`, making the UI components easier to work with.

---

## Custom Hook

`useFlights()` handles:

- Fetching flight data
- Exposing loading and error states
- Providing a retry mechanism

This keeps page components lightweight and focused on rendering.

---

## Environment Variables

| Variable                | Default             |
| ----------------------- | ------------------- |
| `VITE_API_BASE_URL`     | `/`                 |
| `VITE_FLIGHTS_ENDPOINT` | `data/flights.json` |

---

## Assumptions

- Flight data is static and loaded from `public/data/flights.json`.
- Only the flight results screen was implemented; search and booking flows are outside the scope of the assignment.
- Prices are displayed as received from the dataset without currency conversion.
- Since the dataset is relatively small, all filtering and sorting are performed on the client side.
- Flight count updates automatically based on the applied filters.

---

## Tradeoffs

- Redux Toolkit was used to keep state management predictable and scalable, although local component state would have been sufficient for a small dataset.
- Filtering and sorting are derived through selectors instead of storing multiple copies of the data to avoid duplication and keep the store normalized.
- Mock JSON data was used instead of integrating with a live API to keep the focus on UI and state management.
- The UI prioritizes readability and responsiveness over pixel-perfect replication of any specific design system.
- Tests focus on core business logic and component behavior rather than exhaustive UI snapshot testing.
