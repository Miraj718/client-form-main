import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to add form data to JSON Server
export const addFormData = createAsyncThunk(
  'form/addFormData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add form data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for form data
const initialState = {
  id: '',
  jobTitle: '',
  projectOverview: '',
  branding: '',
  features: '',
  userInteraction: '',
  platform: '',
  seo: '',
  timeline: '',
  maintenance: '',
  scalability: '',
  status: 'idle',
  error: null,
};

// Redux slice for form data management
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetFormData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFormData.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: 'succeeded' };
      })
      .addCase(addFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
