import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { setFormData, fetchFormData } from '../reducers/formSlice';
import { fetchFormFields } from '../reducers/formFieldsSlice';

const Page3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const formFields = useSelector((state) => state.formFields.fields);

  // Define the fields to be displayed in Step 3
  const fieldsToShow = ['seo', 'timeline']; // Update with your desired field names

  useEffect(() => {
    dispatch(fetchFormData());
    dispatch(fetchFormFields());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setFormData({ [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/page4');
  };

  const handlePrevious = () => {
    navigate('/page2');
  };

  const isDetailFilled = (field) => {
    return formData[field] && typeof formData[field] === 'string' && formData[field].trim() !== '';
  };

  // Filter form fields to only show the fields defined in `fieldsToShow`
  const filteredFields = formFields.filter(field => fieldsToShow.includes(field.name));

  return (
    <div className="container mt-5">
      <Navigation currentStep={3} steps={['FillUpDetailForm', 'Page2', 'Page3', 'Page4', 'ReviewAndSubmit']} />
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleNext}>
            <h2>Technical Specifications</h2>
            {filteredFields.map((field) => (
              <div className="mb-3" key={field.name}>
                <label htmlFor={field.name} className="form-label">
                  {field.label}:
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="form-control"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    className="form-control"
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
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-primary" onClick={handlePrevious}>
                Previous
              </button>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save & Next
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <h2>Form Progress</h2>
          <ul className="list-group">
            {formFields.map((field, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {index + 1}. {field.label}
                {isDetailFilled(field.name) && (
                  <span className="text-success">
                    <i className="fas fa-check-circle"></i>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page3;
