import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { resetFormData, addFormData } from '../reducers/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { fetchFormGroups } from '../reducers/formFieldsSlice';

const ReviewAndSubmit = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const formGroups = useSelector((state) => state.formFields.formGroups);

  useEffect(() => {
    dispatch(fetchFormGroups());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!formData.projectOverview) newErrors.projectOverview = 'Project Overview is required';
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

  const saveJobEntry = (status) => {
    const newId = uuidv4(); // Generate a new ID for each submission
    const newFormData = {
      ...formData,
      id: newId,
      status,
      submissionDate: new Date().toISOString(),
    };

    dispatch(addFormData(newFormData))
      .unwrap()
      .then(() => {
        dispatch(resetFormData());
        navigate('/jobs', { state: { message: `Form ${status === 'complete' ? 'submitted' : 'saved as draft'} successfully!`, status: status === 'complete' ? 'success' : 'warning' } });
      })
      .catch((error) => {
        console.error('Failed to save the job entry: ', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveJobEntry('complete');
    }
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveJobEntry('draft');
    }
  };

  const handlePrevious = () => {
    navigate('/page4');
  };

  const checkboxGroup = formGroups.find(group => group.groupName === "Checkbox");
  const checkboxFields = checkboxGroup ? checkboxGroup.fields : [];

  return (
    <div className="container mt-5">
      <Navigation currentStep={5} steps={['General Information', 'Functionality', 'Technical Specifications', 'Final Details', 'Review Your Submission']} />
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">Review Your Submission</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <table className="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <td className="fw-bold">1. Job Title:</td>
                      <td>
                        {formData.jobTitle || <span className="text-danger">{errors.jobTitle}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">2. Project Overview:</td>
                      <td>
                        {formData.projectOverview || <span className="text-danger">{errors.projectOverview}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">3. Branding and Design:</td>
                      <td>
                        {formData.branding || <span className="text-danger">{errors.branding}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">4. Features and Functionalities:</td>
                      <td>
                        {formData.features || <span className="text-danger">{errors.features}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">5. User Interaction:</td>
                      <td>
                        {formData.userInteraction || <span className="text-danger">{errors.userInteraction}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">6. Platform and Hosting:</td>
                      <td>
                        {formData.platform || <span className="text-danger">{errors.platform}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">7. SEO and Analytics:</td>
                      <td>
                        {formData.seo || <span className="text-danger">{errors.seo}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">8. Timeline and Budget:</td>
                      <td>
                        {formData.timeline || <span className="text-danger">{errors.timeline}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">9. Maintenance and Support:</td>
                      <td>
                        {formData.maintenance || <span className="text-danger">{errors.maintenance}</span>}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">10. Scalability and Future Enhancements:</td>
                      <td>
                        {formData.scalability || <span className="text-danger">{errors.scalability}</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {checkboxFields.length > 0 && (
                  <div className="mt-4">
                    <h4>Additional Options:</h4>
                    {checkboxFields.map((field) => (
                      <div className="form-check" key={field.id}>
                        <input
                          className="form-check-input"
                          type={field.type}
                          id={field.id}
                          required={field.required}
                        />
                        <label className="form-check-label" htmlFor={field.id}>
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary btn-lg" onClick={handlePrevious}>Previous</button>
                  <div>
                    <button type="submit" className="btn btn-success btn-lg me-2">Submit</button>
                    <button type="button" className="btn btn-warning btn-lg" onClick={handleSaveDraft}>Save as Draft</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
