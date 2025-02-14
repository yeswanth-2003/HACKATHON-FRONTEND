import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Card, Badge, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentApplications() {
  const [applications, setApplications] = useState([
    { id: 1, job: "Frontend Developer", company: "Google", location: "Bangalore", status: "Pending" },
    { id: 2, job: "Backend Developer", company: "Amazon", location: "Hyderabad", status: "Accepted" },
    { id: 3, job: "Data Analyst", company: "Microsoft", location: "Pune", status: "Rejected" },
    { id: 4, job: "Software Engineer", company: "Adobe", location: "Mumbai", status: "Pending" },
    { id: 5, job: "Cybersecurity Analyst", company: "IBM", location: "Chennai", status: "Accepted" },
    { id: 6, job: "Cloud Engineer", company: "Oracle", location: "Delhi", status: "Rejected" },
    { id: 7, job: "AI Engineer", company: "Tesla", location: "Bangalore", status: "Pending" },
    { id: 8, job: "Blockchain Developer", company: "Ripple", location: "Mumbai", status: "Accepted" },
    { id: 9, job: "Embedded Systems Engineer", company: "Intel", location: "Pune", status: "Rejected" },
    { id: 10, job: "Game Developer", company: "Ubisoft", location: "Hyderabad", status: "Pending" },
    { id: 11, job: "DevOps Engineer", company: "Microsoft", location: "Noida", status: "Accepted" },
    { id: 12, job: "Full Stack Developer", company: "Facebook", location: "Delhi", status: "Rejected" },
    { id: 13, job: "ML Engineer", company: "Netflix", location: "Bangalore", status: "Pending" }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
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

  const indexOfLastApp = currentPage * applicationsPerPage;
  const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApp, indexOfLastApp);

  return (
    <div className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
        <Navbar.Brand className="fw-bold fs-3">Student Applications</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/studentprofile')} className="fw-semibold">Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentdashboard')} className="fw-semibold">Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/joblisting')} className="fw-semibold">Job Listings</Nav.Link>
            <Button variant={darkMode ? "light" : "dark"} className="ms-3" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-2" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center display-4 fw-bold">Your Job Applications</h2>
        <Row className="mt-4 g-4">
          {currentApplications.map((app) => (
            <Col md={4} key={app.id}>
              <Card className={`shadow-lg rounded-3 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
                <Card.Body>
                  <Card.Title className="fw-bold">{app.job}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{app.company}</Card.Subtitle>
                  <Card.Text className="mb-2">📍 {app.location}</Card.Text>
                  <Badge pill bg={
                    app.status === "Accepted" ? "success" :
                    app.status === "Rejected" ? "danger" : "warning"
                  } className="fs-6">{app.status}</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="justify-content-center mt-4">
          {[...Array(Math.ceil(applications.length / applicationsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
}