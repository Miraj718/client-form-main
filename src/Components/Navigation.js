import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = ({ currentStep, steps }) => {
  const stepPaths = {
    'General Information': '/fillUpDetailForm',
    'Functionality': '/page2',
    'Technical Specifications': '/page3',
    'Final Details': '/page4',
    'Review Your Submission': '/reviewAndSubmit',
  };

  return (
    <nav className="nav nav-pills flex-column flex-sm-row">
      {steps.map((step, index) => (
        <NavLink
          key={index}
          to={stepPaths[step]}
          className={`flex-sm-fill text-sm-center nav-link ${currentStep === index + 1 ? 'active' : ''}`}
        >
          {step}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
