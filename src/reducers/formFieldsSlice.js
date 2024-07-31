// src/features/formFields/formFieldsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for fetching form fields
export const fetchFormFields = createAsyncThunk(
  'formFields/fetchFormFields',
  async () => {
    const response = await fetch('http://localhost:5000/formFields');
    const data = await response.json();
    return data;
  }
);

const formFieldsSlice = createSlice({
  name: 'formFields',
  initialState: {
    fields: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormFields.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormFields.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fields = action.payload;
      })
      .addCase(fetchFormFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default formFieldsSlice.reducer;
