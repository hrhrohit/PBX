import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDomains, getDomainDetails } from '../ApiConfig';

export const fetchDomains = createAsyncThunk(
  'domains/fetchDomains',
  async () => {
    const response = await getDomains();
    return response;
  }
);

export const fetchDomainDetails = createAsyncThunk(
  'domains/fetchDomainDetails',
  async (domainName) => {
    const response = await getDomainDetails(domainName);
    return response;
  }
);

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domains: [],
    domainDetails: [],
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
      })
      .addCase(fetchDomainDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDomainDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.domainDetails = action.payload;
      })
      .addCase(fetchDomainDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default domainsSlice.reducer;