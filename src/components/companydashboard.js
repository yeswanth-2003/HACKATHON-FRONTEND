import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, ListGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CompanyDashboard() {
  const [jobPosts, setJobPosts] = useState([
    { id: 1, title: "Frontend Developer", applicants: 5 },
    { id: 2, title: "Backend Developer", applicants: 8 },
    { id: 3, title: "Data Analyst", applicants: 3 },
  ]);
  const [applications, setApplications] = useState([
    { id: 1, applicant: "Amit Sharma", job: "Frontend Developer", status: "Pending" },
    { id: 2, applicant: "Priya Singh", job: "Backend Developer", status: "Accepted" },
    { id: 3, applicant: "Rahul Mehta", job: "Data Analyst", status: "Rejected" },
  ]);
  const [companyName, setCompanyName] = useState("Company");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCompanyName(localStorage.getItem("companyName") || "Company");
    setDarkMode(JSON.parse(localStorage.getItem("darkMode")) || false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Navbar expand="lg" className={`px-4 py-3 border-bottom ${darkMode ? "bg-dark" : "bg-light"}`}>
        <Navbar.Brand className={`fw-bold ${darkMode ? "text-light" : "text-dark"}`}>{companyName} Dashboard</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{ filter: darkMode ? "invert(1)" : "none" }} // Ensure hamburger is visible in dark mode
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companyprofile')}>Profile</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/postjob')}>Post a Job</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companyapplications')}>Applications</Nav.Link>
            <Button className="ms-3" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-3" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Row className="g-4">
          <Col md={8}>
            <div className={`p-4 border rounded ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <h4 className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>Job Postings</h4>
              <ListGroup variant="flush">
                {jobPosts.map(job => (
                  <ListGroup.Item key={job.id} className={`d-flex justify-content-between border-0 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
                    <span>{job.title}</span>
                    <span className="fw-semibold">{job.applicants} applicants</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button variant={darkMode ? "light" : "dark"} className="mt-3 w-100" onClick={() => navigate('/postjob')}>Post New Job</Button>
            </div>
          </Col>

          <Col md={4}>
            <div className={`p-4 border rounded ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <h4 className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>Applications</h4>
              <ListGroup variant="flush">
                {applications.map(app => (
                  <ListGroup.Item key={app.id} className={`d-flex justify-content-between border-0 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
                    <span>{app.applicant} - {app.job}</span>
                    <span className={`fw-semibold ${
                      app.status === "Accepted" ? "text-success" :
                      app.status === "Rejected" ? "text-danger" : "text-muted"
                    }`}>{app.status}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>

        <div className={`mt-4 p-4 border rounded ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
          <h4 className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>Company Profile</h4>
          <p>- Company Details & Contact Info</p>
          <p>- Hiring Preferences</p>
          <Button variant={darkMode ? "light" : "dark"} className="w-100" onClick={() => navigate('/companyprofile')}>Update Profile</Button>
        </div>
      </Container>
    </div>
  );
}
