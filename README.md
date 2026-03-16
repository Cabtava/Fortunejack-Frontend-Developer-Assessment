# Crypto Bet Simulator

React app simulates a cryptocurrency coin-flip betting dashboard with persistent balances, bet history, statistics, filtering, and auto-bet controls using a Martingale strategy.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Zustand
- Zod
- localStorage-backed mock API layer

## Features

- Coin flip bet simulator with BTC, ETH, and SOL
- Starting balance of 1000 per currency
- Manual betting flow
- Auto-bet mode with Martingale strategy
- Stop Win and Stop Loss controls
- Persistent user data and bet history
- Recent bet history limited to last 20 bets
- Search and filter support for history
- Statistics dashboard:
  - Win/loss ratio
  - Biggest win/loss
  - Current profit/loss
  - Total bets placed

## Architecture Notes

### State Management

- TanStack Query is used for async/server-like state:
  - user data
  - bet history
  - bet mutations
- Zustand is used for local UI state:
  - current form inputs
  - filters
  - auto-bet session state

### Data Layer

- A mock API layer simulates network delays and occasional failures.
- localStorage is used as the persistence layer for user balances, settings, and bet history.
- Zod is used to validate persisted data when reading from localStorage.

### Business Logic

- `useBetSimulation` handles betting flow and Martingale progression.
- `useBetHistory` handles filtering and derived statistics.
- Utility functions isolate calculation and validation rules.

## Project Structure

```txt
src/
  app/
  components/
  features/
  lib/
  pages/
  services/
  types/
```

## Setup

npm install
npm run dev

## Build

npm run build
npm run preview
