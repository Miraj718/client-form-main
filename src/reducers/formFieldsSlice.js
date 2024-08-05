// src/features/formFields/formFieldsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for fetching form groups
export const fetchFormGroups = createAsyncThunk(
  'formFields/fetchFormGroups',
  async () => {
    const response = await fetch('http://localhost:5000/formGroups');
    const data = await response.json();
    return data;
  }
);

const formFieldsSlice = createSlice({
  name: 'formGroups',
  initialState: {
    formGroups: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formGroups = action.payload;
      })
      .addCase(fetchFormGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default formFieldsSlice.reducer;
