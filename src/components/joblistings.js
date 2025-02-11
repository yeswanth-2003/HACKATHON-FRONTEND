import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Card, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSun, FaMoon } from 'react-icons/fa';


export default function JobListing() {
  const [darkMode, setDarkMode] = useState(false);
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", pay: "₹6,50,000", location: "Bangalore, India" },
    { id: 2, title: "Backend Developer", company: "Amazon", pay: "₹7,00,000", location: "Hyderabad, India" },
    { id: 3, title: "Data Analyst", company: "Microsoft", pay: "₹6,00,000", location: "Pune, India" },
    { id: 4, title: "Software Engineer", company: "Adobe", pay: "₹8,50,000", location: "Mumbai, India" },
    { id: 5, title: "Cybersecurity Analyst", company: "IBM", pay: "₹7,50,000", location: "Chennai, India" },
    { id: 6, title: "Cloud Engineer", company: "Oracle", pay: "₹9,00,000", location: "Delhi, India" },
    { id: 7, title: "AI Engineer", company: "Tesla", pay: "₹15,00,000", location: "Bangalore, India" },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
      <Navbar bg={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
        <Navbar.Brand className={darkMode ? "fw-bold fs-3 text-white" : "fw-bold fs-3 text-primary"}>💼 Job Listings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/studentprofile')} className={darkMode ? "fw-semibold text-white" : "fw-semibold text-dark"}>Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentdashboard')} className={darkMode ? "fw-semibold text-white" : "fw-semibold text-dark"}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentapplications')} className={darkMode ? "fw-semibold text-white" : "fw-semibold text-dark"}>Applications</Nav.Link>
             <Button variant="secondary" className="ms-3" onClick={toggleDarkMode}>
                          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
            <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center display-4 fw-bold">Available Jobs</h2>
        <Row className="mt-4 g-4">
          {currentJobs.map((job) => (
            <Col md={4} key={job.id}>
              <Card className={darkMode ? "shadow-lg rounded-3 bg-secondary text-light" : "shadow-lg rounded-3"}>
                <Card.Body>
                  <Card.Title className={darkMode ? "fw-bold text-white" : "fw-bold text-primary"}>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                  <Card.Text className="mb-2">📍 {job.location}</Card.Text>
                  <Card.Text className="fw-bold">💰 {job.pay}</Card.Text>
                  <Button variant="primary">Apply</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="justify-content-center mt-4">
          {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
}
