import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css'; // Add Font Awesome for icons
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../reducers/formSlice';
import { fetchFormGroups } from '../reducers/formFieldsSlice';
import { useNavigate } from 'react-router-dom';
import './ClientLogin.css'; // Custom CSS for additional styles

const ClientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formGroups = useSelector((state) => state.formFields.formGroups);

  useEffect(() => {
    dispatch(fetchFormGroups());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    navigate('/Services'); // Navigate to services page after login
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  // Find the "Login Details" group
  const loginDetailsGroup = formGroups.find(group => group.groupName === "Login Details");
  const loginDetailsFields = loginDetailsGroup ? loginDetailsGroup.fields : [];

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-card card mt-5 shadow-lg border-0 rounded-4">
          <div className="card-body">
            {/* <div className="text-center mb-4">
              <img src="/path-to-your-logo.png" alt="Logo" className="login-logo" />
            </div> */}
            <h2 className="card-title text-center text-primary">Login</h2>
            <form onSubmit={handleSubmit}>
              {loginDetailsFields.map((field) => (
                <div className="mb-4" key={field.id}>
                  <label htmlFor={field.name} className="form-label fw-bold text-dark">
                    {field.label}:
                  </label>
                  <input
                    type={field.type}
                    className="form-control border-primary rounded-3"
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg rounded-3">
                  Submit
                </button>
              </div>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-link text-decoration-none" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
