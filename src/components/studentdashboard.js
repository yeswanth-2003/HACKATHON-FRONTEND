import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, ListGroup, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentDashboard() {
  const [applications, setApplications] = useState([
    { id: 1, job: "Frontend Developer", status: "Pending" },
    { id: 2, job: "Backend Developer", status: "Accepted" },
    { id: 3, job: "Data Analyst", status: "Rejected" },
  ]);
  const [studentName, setStudentName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStudentName(localStorage.getItem("studentName") || "Student");
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

  const jobListings = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Bangalore" },
    { id: 2, title: "Data Scientist", company: "Amazon", location: "Hyderabad" },
    { id: 3, title: "UI/UX Designer", company: "Adobe", location: "Mumbai" },
    { id: 4, title: "DevOps Engineer", company: "Microsoft", location: "Pune" },
  ];

  return (
    <div className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
        <Navbar.Brand className="fw-bold fs-3">🚀 Student Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/studentprofile')} className="fw-semibold">Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/joblisting')} className="fw-semibold">Job Listings</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentapplications')} className="fw-semibold">Applications</Nav.Link>
            <Button variant={darkMode ? "light" : "dark"} className="ms-3" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant="outline-secondary" className="ms-2" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center display-4 fw-bold">Welcome, {studentName}! 🎉</h2>
        <Row className="mt-4 g-4">
          <Col md={8}>
            <ListGroup className={`mb-4 shadow-lg rounded-3 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <ListGroup.Item className="fw-bold fs-5">🌟 Job Listings</ListGroup.Item>
              {jobListings.map(job => (
                <ListGroup.Item key={job.id} className="border-0 fs-5">
                  <strong>{job.title}</strong> - {job.company} ({job.location})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup className={`mb-4 shadow-lg rounded-3 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
              <ListGroup.Item className="fw-bold fs-5">📊 Application Tracker</ListGroup.Item>
              {applications.map(app => (
                <ListGroup.Item key={app.id} className={`d-flex justify-content-between align-items-center p-2 rounded-3 shadow-sm ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
                  <span className="fw-bold">{app.job}</span>
                  <Badge pill bg={
                    app.status === "Accepted" ? "success" :
                    app.status === "Rejected" ? "danger" : "warning"
                  } className="fs-6">{app.status}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <ListGroup className={`mb-4 shadow-lg rounded-3 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
          <ListGroup.Item className="fw-bold fs-5">📝 Profile Summary</ListGroup.Item>
          <ListGroup.Item>
            <p className="fs-5">- Quick access to resume</p>
            <p className="fs-5">- Skills overview</p>
            <Button variant={darkMode ? "light" : "dark"} className="w-100 fs-5 fw-bold">Update Profile</Button>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
}
