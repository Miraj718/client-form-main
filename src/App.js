import React, { useState } from 'react';
import './App.css';
import ClientLogin from './Components/ClientLogin';
import FillUpDetailForm from './Components/FillUpDetailForm';
import MyNavbar from './Components/MyNavbar';
import Page2 from './Components/Page2';
import Page3 from './Components/Page3';
import Page4 from './Components/Page4';
import Services from './Components/Services';
import ReviewAndSubmit from './Components/ReviewAndSubmit';
import { FormDataProvider } from './FormDataContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Jobs from './Components/Jobs';

function App() {
  const [formData, setFormData] = useState({});

  return (
    <Router>
      <ConditionalNavbar />
      <FormDataProvider initialId="1">
        <Routes>
          <Route exact path="/" element={<ClientLogin />} />
          <Route exact path="/Services" element={<Services />} />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route
            path="/FillUpDetailForm"
            element={<FillUpDetailForm formData={formData} setFormData={setFormData} />}
          />
          <Route path="/page2" element={<Page2 formData={formData} setFormData={setFormData} />} />
          <Route path="/page3" element={<Page3 formData={formData} setFormData={setFormData} />} />
          <Route path="/page4" element={<Page4 formData={formData} setFormData={setFormData} />} />
          <Route path="/reviewandsubmit" element={<ReviewAndSubmit formData={formData} />} />
        </Routes>
      </FormDataProvider>
    </Router>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return showNavbar ? <MyNavbar /> : null;
};

export default App;
