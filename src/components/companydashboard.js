import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, ListGroup, Row, Col, Badge } from "react-bootstrap";
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
  const [companyName, setCompanyName] = useState("");
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
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-4 py-3 shadow-lg">
        <Navbar.Brand className={darkMode ? "text-info" : "text-primary"}>🏢 {companyName} Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/companyprofile')} className={darkMode ? "text-light" : "text-dark"}>Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/postjob')} className={darkMode ? "text-light" : "text-dark"}>Post a Job</Nav.Link>
            <Nav.Link onClick={() => navigate('/companyapplications')} className={darkMode ? "text-light" : "text-dark"}>Applications</Nav.Link>
            <Button className={`ms-3 ${darkMode ? "btn-light text-dark" : "btn-dark text-light"}`} onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Container fluid className="mt-4 px-5">
        <Row className="mt-4 g-4">
          <Col md={8}>
            <div className={`p-4 rounded-3 shadow-lg ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <h4 className={darkMode ? "text-info" : "text-primary"}>📌 Job Postings</h4>
              <ListGroup>
                {jobPosts.map(job => (
                  <ListGroup.Item key={job.id} className={`border-0 fs-5 d-flex justify-content-between align-items-center bg-transparent ${darkMode ? "text-light" : "text-dark"}`}>
                    <span><strong>{job.title}</strong></span>
                    <Badge pill bg="info" className="fs-6 px-3 py-2">{job.applicants} applicants</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button variant="info" className="mt-3 w-100 py-2" onClick={() => navigate('/postjob')}>➕ Post New Job</Button>
            </div>
          </Col>
          
          <Col md={4}>
            <div className={`p-4 rounded-3 shadow-lg ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <h4 className={darkMode ? "text-success" : "text-success"}>📊 Applications Received</h4>
              <ListGroup>
                {applications.map(app => (
                  <ListGroup.Item key={app.id} className={`d-flex justify-content-between align-items-center p-2 rounded-3 shadow-sm bg-transparent ${darkMode ? "text-light" : "text-dark"}`}>                    
                    <span className="fw-bold">{app.applicant} - {app.job}</span>
                    <Badge pill bg={
                      app.status === "Accepted" ? "success" :
                      app.status === "Rejected" ? "danger" : "warning"
                    } className="fs-6 px-3 py-2">{app.status}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>

        <div className={`mt-4 p-4 rounded-3 shadow-lg ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
          <h4 className={darkMode ? "text-primary" : "text-dark"}>🏢 Company Profile</h4>
          <p className="fs-5">- Company Details & Contact Info</p>
          <p className="fs-5">- Hiring Preferences</p>
          <Button variant="primary" className="w-100 fs-5 fw-bold py-2" onClick={() => navigate('/companyprofile')}>Update Profile</Button>
        </div>
      </Container>
    </div>
  );
}