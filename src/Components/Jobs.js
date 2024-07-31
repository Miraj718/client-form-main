import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setFormData } from '../reducers/formSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

const Jobs = () => {
  const [jobEntries, setJobEntries] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch job entries from the server
    fetch('http://localhost:5000/formData')
      .then(response => response.json())
      .then(data => setJobEntries(data))
      .catch(error => console.error('Error fetching job entries:', error));

    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setMessageStatus(location.state.status);
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filter job entries based on search input
  const filteredJobs = jobEntries.filter(
    (job) => job.jobTitle && job.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  // Format date for display
  const formattedSubmissionDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : '';
  };

  // Handle job click to display details
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  // Handle editing draft
  const handleEditDraft = () => {
    if (selectedJob) {
      dispatch(setFormData(selectedJob)); // Dispatch action to set form data
      navigate('/FillUpDetailForm'); // Navigate to edit form page
    }
  };

  return (
    <div className="container mt-5">
      <h2>Jobs</h2>
      {showMessage && (
        <Alert variant={messageStatus} onClose={() => setShowMessage(false)} dismissible>
          {message}
        </Alert>
      )}
      <label htmlFor="search">
        Search by Job Title:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>
      <br />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Submission Date</th>
            <th>Job Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{formattedSubmissionDate(job.submissionDate)}</td>
              <td>
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleJobClick(job)}>
                  {job.jobTitle}
                </span>
              </td>
              <td>
                <span style={{ color: job.status === 'complete' ? 'blue' : 'red' }}>
                  {job.status === 'complete' ? 'Complete' : 'Save As Draft'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {selectedJob && (
        <div className="mt-4">
          <h3>Selected Job Details</h3>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="fw-bold">Job ID:</td>
                <td>{selectedJob.id}</td>
              </tr>
              <tr>
                <td className="fw-bold">Submission Date:</td>
                <td>{formattedSubmissionDate(selectedJob.submissionDate)}</td>
              </tr>
              <tr>
                <td className="fw-bold">1. Job Title:</td>
                <td>{selectedJob.jobTitle}</td>
              </tr>
              <tr>
                <td className="fw-bold">2. Project Overview:</td>
                <td>{selectedJob.projectOverview}</td>
              </tr>
              <tr>
                <td className="fw-bold">3. Branding:</td>
                <td>{selectedJob.branding}</td>
              </tr>
              <tr>
                <td className="fw-bold">4. Features and Functionalities:</td>
                <td>{selectedJob.features}</td>
              </tr>
              <tr>
                <td className="fw-bold">5. User Interaction:</td>
                <td>{selectedJob.userInteraction}</td>
              </tr>
              <tr>
                <td className="fw-bold">6. Platform and Hosting:</td>
                <td>{selectedJob.platform}</td>
              </tr>
              <tr>
                <td className="fw-bold">7. SEO and Analytics:</td>
                <td>{selectedJob.seo}</td>
              </tr>
              <tr>
                <td className="fw-bold">8. Timeline and Budget:</td>
                <td>{selectedJob.timeline}</td>
              </tr>
              <tr>
                <td className="fw-bold">9. Maintenance and Support:</td>
                <td>{selectedJob.maintenance}</td>
              </tr>
              <tr>
                <td className="fw-bold">11. Scalability and Future Enhancements:</td>
                <td>{selectedJob.scalability}</td>
              </tr>
            </tbody>
          </table>
          {selectedJob.status === 'draft' && (
            <button type="button" className="btn btn-primary mt-3" onClick={handleEditDraft}>
              Edit Draft
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
