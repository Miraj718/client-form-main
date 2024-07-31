import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ currentStep, steps }) => {
  const isStepComplete = (stepNumber) => {
    return stepNumber < currentStep;
  };

  return (
    <ul className="nav nav-pills">
      {steps.map((step, index) => (
        <li className="nav-item" key={index}>
          <NavLink className={`nav-link ${currentStep === index + 1 ? 'active' : ''}`} to={`/${step.toLowerCase()}`}>
            Step {index + 1} {isStepComplete(index + 1) && <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginLeft: '5px' }} />}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
