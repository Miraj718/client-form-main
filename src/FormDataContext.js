// FormDataContext.js
import React, { createContext, useState, useContext } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children, initialId }) => {
  const [formData, setFormData] = useState({
    id: initialId || '1',
    jobTitle: '',
    projectOverview: '',
    branding: '',
    features: '',
    userInteraction: '',
    platform: '',
    seo: '',
    timeline: '',
    maintenance: '',
    scalability: ''
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};