import { configureStore } from '@reduxjs/toolkit';
import domainsReducer from './slice';

export const store = configureStore({
  reducer: {
    domains: domainsReducer,
  },
});
