import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDomains, getDomainDetails, createDialRule as createDialRuleApi, updateDialRule as updateDialRuleApi } from '../ApiConfig';

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

export const createDialRule = createAsyncThunk(
  'domains/createDialRule',
  async (ruleData) => {
    const response = await createDialRuleApi(ruleData);
    return response;
  }
);

export const updateDialRule = createAsyncThunk(
  'domains/updateDialRule',
  async (ruleData) => {
    const response = await updateDialRuleApi(ruleData);
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
      })
      .addCase(createDialRule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDialRule.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createDialRule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateDialRule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDialRule.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateDialRule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default domainsSlice.reducer;
