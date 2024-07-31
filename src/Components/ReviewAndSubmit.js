import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { resetFormData, saveFormData } from '../reducers/formSlice';
import { v4 as uuidv4 } from 'uuid';

const ReviewAndSubmit = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!formData.projectOverview) newErrors.projectOverview = 'Project Overview is required';
    if (!formData.branding) newErrors.branding = 'Branding and Design is required';
    if (!formData.features) newErrors.features = 'Features and Functionalities are required';
    if (!formData.userInteraction) newErrors.userInteraction = 'User Interaction is required';
    if (!formData.platform) newErrors.platform = 'Platform and Hosting is required';
    if (!formData.seo) newErrors.seo = 'SEO and Analytics are required';
    if (!formData.timeline) newErrors.timeline = 'Timeline and Budget are required';
    if (!formData.maintenance) newErrors.maintenance = 'Maintenance and Support is required';
    if (!formData.scalability) newErrors.scalability = 'Scalability and Future Enhancements are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save job entry to JSON server
  const saveJobEntry = (status) => {
    const newId = formData.id || uuidv4();
    const updatedFormData = {
      ...formData,
      id: newId,
      status,
      submissionDate: formData.submissionDate || new Date().toISOString(),
    };

    dispatch(saveFormData(updatedFormData))
      .unwrap()
      .then(() => {
        dispatch(resetFormData());
        navigate('/jobs', { state: { message: `Form ${status === 'complete' ? 'submitted' : 'saved as draft'} successfully!`, status: status === 'complete' ? 'success' : 'warning' } });
      })
      .catch((error) => {
        console.error('Failed to save the job entry: ', error);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveJobEntry('complete');
    }
  };

  // Handle saving form as draft
  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveJobEntry('draft');
    }
  };

  // Navigate to the previous page
  const handlePrevious = () => {
    navigate('/page4');
  };

  return (
    <div className="container mt-5">
      <Navigation currentStep={5} steps={['FillUpDetailForm', 'Page2', 'Page3', 'Page4', 'ReviewAndSubmit']} />
      <form onSubmit={handleSubmit}>
        <h2>Review Your Submission</h2>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="fw-bold">1. Job Title:</td>
              <td>{formData.jobTitle || <span className="text-danger">{errors.jobTitle}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">2. Project Overview:</td>
              <td>{formData.projectOverview || <span className="text-danger">{errors.projectOverview}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">3. Branding and Design:</td>
              <td>{formData.branding || <span className="text-danger">{errors.branding}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">4. Features and Functionalities:</td>
              <td>{formData.features || <span className="text-danger">{errors.features}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">5. User Interaction:</td>
              <td>{formData.userInteraction || <span className="text-danger">{errors.userInteraction}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">6. Platform and Hosting:</td>
              <td>{formData.platform || <span className="text-danger">{errors.platform}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">7. SEO and Analytics:</td>
              <td>{formData.seo || <span className="text-danger">{errors.seo}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">8. Timeline and Budget:</td>
              <td>{formData.timeline || <span className="text-danger">{errors.timeline}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">9. Maintenance and Support:</td>
              <td>{formData.maintenance || <span className="text-danger">{errors.maintenance}</span>}</td>
            </tr>
            <tr>
              <td className="fw-bold">10. Scalability and Future Enhancements:</td>
              <td>{formData.scalability || <span className="text-danger">{errors.scalability}</span>}</td>
            </tr>
          </tbody>
        </table>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Confirm
          </label>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-primary me-2" onClick={handlePrevious}>Previous</button>
          <button type="submit" className="btn btn-success me-2">Submit</button>
          <button type="button" className="btn btn-warning" onClick={handleSaveDraft}>Save as Draft</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewAndSubmit;
