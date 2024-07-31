// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import formFieldsReducer  from './reducers/formFieldsSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    formFields: formFieldsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/setFormData'],
        ignoredPaths: ['form.documentation'],
      },
    }),
});

export default store;