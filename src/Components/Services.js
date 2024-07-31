import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  const navigate = useNavigate();

  const handleFillUpDetailForm = () => {
    navigate('/FillUpDetailForm');
  };

  return (
      <div className="container mt-5" >
    <div className="container">
      <h1  style= {{ backgroundColor: 'black', color: 'white' }}>Services</h1>
    </div>
      <div className="row">
        {/* First Card */}
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Web Development</h5>
              <p className="card-text">
                We offer comprehensive web development services that help businesses establish a strong online presence .
              </p>
              <button type="button" className="btn btn-primary" onClick={handleFillUpDetailForm}>
                Order Now
              </button>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Mobile Development</h5>
              <p className="card-text">
                Our mobile development services create innovative mobile applications tailored to your business needsong online presence.
              </p>
              <Link to="/fill-up-detail-form" className="btn btn-primary">Order Now</Link>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Digital Marketing</h5>
              <p className="card-text">
                Enhance your digital presence with our expert digital marketing services, designed to drive traffic and boost sales.
              </p>
              <Link to="/fill-up-detail-form" className="btn btn-primary">Order Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
