import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostJob() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [jobType, setJobType] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [benefits, setBenefits] = useState("");
  const [hiringProcess, setHiringProcess] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Fetch companyId from localStorage
    const companyId = localStorage.getItem("companyId");

    if (!companyId) {
      setErrorMessage("Company ID is required.");
      return;
    }

    // Collect job data from the form
    const jobData = {
      companyId,
      title,
      description,
      jobType,
      requiredSkills,
      location,
      salaryRange,
      employmentType,
      benefits,
      hiringProcess,
    };

    // Check for required fields
    if (
      !jobData.companyId ||
      !jobData.title ||
      !jobData.description ||
      !jobData.jobType ||
      !jobData.location ||
      !jobData.salaryRange ||
      !jobData.employmentType
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("https://hackathon-backend-z1w8.onrender.com/api/jobs/postjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      const result = await response.json();
    //   navigate("/jobs"); // Redirect to jobs page after successful posting
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Navbar expand="lg" className={`px-4 py-3 border-bottom ${darkMode ? "bg-dark" : "bg-light"}`}>
        <Navbar.Brand className={darkMode ? "text-light" : "text-dark"}>Post a Job</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" style={{ filter: darkMode ? "invert(1)" : "none" }} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companydashboard')}>Dashboard</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/viewapplication')}>Applications</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companyprofile')}>Profile</Nav.Link>
            <Button className="ms-3" onClick={toggleDarkMode} variant={darkMode ? "outline-light" : "outline-dark"}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-3" onClick={() => navigate('/')}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-5">
        <h2>Post a New Job</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Provide a detailed job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Select Job Type</option>
              <option value="Software Development">Software Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Required Skills</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="List required skills (e.g., React, Node.js, SQL)"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter salary range"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employment Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="Full-Time"
                type="radio"
                name="employmentType"
                checked={employmentType === "Full-Time"}
                onChange={() => setEmploymentType("Full-Time")}
              />
              <Form.Check
                inline
                label="Contract"
                type="radio"
                name="employmentType"
                checked={employmentType === "Contract"}
                onChange={() => setEmploymentType("Contract")}
              />
              <Form.Check
                inline
                label="Internship"
                type="radio"
                name="employmentType"
                checked={employmentType === "Internship"}
                onChange={() => setEmploymentType("Internship")}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Benefits</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="List benefits (e.g., Health Insurance, Remote Work, Flexible Hours)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hiring Process</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={hiringProcess}
              onChange={(e) => setHiringProcess(e.target.value)}
              placeholder="Describe the hiring process (e.g., 1. Online Assessment → 2. Technical Interview → 3. HR Interview)"
            />
          </Form.Group>

          <Button variant={darkMode ? "outline-light" : "outline-dark"} type="submit">
            Post Job
          </Button>
        </Form>
      </Container>
    </div>
  );
}
