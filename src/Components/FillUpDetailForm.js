import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css'; // Add this for Font Awesome icons
import Navigation from './Navigation';
import { setFormData } from '../reducers/formSlice';
import { fetchFormGroups } from '../reducers/formFieldsSlice';

const FillUpDetailForm = () => {
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

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/page2');
  };

  const isDetailFilled = (field) => {
    return formData[field] && typeof formData[field] === 'string' && formData[field].trim() !== '';
  };

  // Find the "General Information" group
  const generalInfoGroup = formGroups.find(group => group.groupName === "General Information");
  const generalInfoFields = generalInfoGroup ? generalInfoGroup.fields : [];

  return (
    <div className="container mt-5">
      <Navigation currentStep={1} steps={['General Information', 'Functionality', 'Technical Specifications', 'Final Details', 'Review Your Submission']} />
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h2 className="card-title mb-0">General Information</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleNext}>
                {generalInfoFields.map((field) => (
                  <div className="mb-4" key={field.name}>
                    <label htmlFor={field.name} className="form-label fw-bold text-dark">
                      {field.label} {field.required && <span className="text-danger">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="form-control border-primary rounded-3"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows="4"
                        style={{ resize: 'none' }}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control border-primary rounded-3"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
                <div className="text-end">
                  <button type="submit" className="btn btn-success btn-lg rounded-3">
                    Save & Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-secondary text-white rounded-top-4">
              <h2 className="card-title mb-0">Form Progress</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {generalInfoFields.map((field, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-0 rounded-3 mb-2">
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

export default FillUpDetailForm;
