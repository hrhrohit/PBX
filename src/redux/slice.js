import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDomains } from '../ApiConfig';

export const fetchDomains = createAsyncThunk(
  'domains/fetchDomains',
  async () => {
    const response = await getDomains();
    return response;
  }
);

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domains: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default domainsSlice.reducer;
