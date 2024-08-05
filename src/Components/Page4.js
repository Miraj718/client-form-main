import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { setFormData } from '../reducers/formSlice';
import { fetchFormGroups } from '../reducers/formFieldsSlice';

const Page4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const formGroups = useSelector((state) => state.formFields.formGroups);

  useEffect(() => {
    dispatch(fetchFormGroups());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setFormData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reviewAndSubmit');
  };

  const handlePrevious = () => {
    navigate('/page3');
  };

  const isDetailFilled = (field) => {
    return formData[field] && typeof formData[field] === 'string' && formData[field].trim() !== '';
  };

  // Find the "Final Details" group
  const finalDetailsGroup = formGroups.find(group => group.groupName === "Final Details");
  const finalDetailsFields = finalDetailsGroup ? finalDetailsGroup.fields : [];

  return (
    <div className="container mt-5">
      <Navigation
        currentStep={4}
        steps={['General Information', 'Functionality', 'Technical Specifications', 'Final Details', 'Review Your Submission']}
      />
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">Final Details</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {finalDetailsFields.map((field) => (
                  <div className="mb-4" key={field.name}>
                    <label htmlFor={field.name} className="form-label fs-5 fw-bold">
                      {field.label} {field.required && <span className="text-danger">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows="4"
                        style={{ resize: 'none' }}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary btn-lg" onClick={handlePrevious}>
                    Previous
                  </button>
                  <button type="submit" className="btn btn-success btn-lg">
                    Save & Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-secondary text-white">
              <h4 className="card-title mb-0">Form Progress</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {finalDetailsFields.map((field, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {index + 1}. {field.label}
                    {isDetailFilled(field.name) && (
                      <span className="text-success">
                        <i className="fa fa-check-circle"></i>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
