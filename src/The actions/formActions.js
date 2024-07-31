// actions/formActions.js
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const LOAD_FORM_DATA = 'LOAD_FORM_DATA';

export const setFormData = (data) => ({
  type: SET_FORM_DATA,
  payload: data,
});

export const loadFormData = () => ({
  type: LOAD_FORM_DATA,
});