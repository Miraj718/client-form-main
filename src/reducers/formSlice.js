import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch form data from JSON Server
export const fetchFormData = createAsyncThunk(
  'form/fetchFormData',
  async () => {
    const response = await fetch('http://localhost:5000/formData');
    const data = await response.json();
    return data;
  }
);

// Async thunk to save (create or update) form data in JSON Server
export const saveFormData = createAsyncThunk(
  'form/saveFormData',
  async (formData, { rejectWithValue }) => {
    try {
      let response;

      if (formData.id) {
        // If ID exists, attempt PATCH request
        response = await fetch(`http://localhost:5000/formData/${formData.id}`);
        if (response.ok) {
          response = await fetch(`http://localhost:5000/formData/${formData.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } else {
          // If ID doesn't exist, create new entry
          response = await fetch('http://localhost:5000/formData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        }
      } else {
        // No ID means creating a new entry
        response = await fetch('http://localhost:5000/formData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to save form data: ${response.statusText}`);
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
      // Directly modify the draft state
      Object.assign(state, action.payload);
    },
    resetFormData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Directly modify the draft state
        Object.assign(state, action.payload);
      })
      .addCase(fetchFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Directly modify the draft state
        Object.assign(state, action.payload);
      })
      .addCase(saveFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});


// Export actions and reducer from slice
export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
