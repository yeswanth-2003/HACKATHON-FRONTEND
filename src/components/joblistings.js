import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Card, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
      <Navbar bg={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
        <Navbar.Brand className={darkMode ? "fw-bold fs-3 text-light" : "fw-bold fs-3 text-dark"}>💼 Job Listings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/studentprofile')} className={darkMode ? "text-light" : "text-dark"}>Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentdashboard')} className={darkMode ? "text-light" : "text-dark"}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentapplications')} className={darkMode ? "text-light" : "text-dark"}>Applications</Nav.Link>
            <Button variant={darkMode ? "light" : "dark"} className="ms-3" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-2" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center display-4 fw-bold">Available Jobs</h2>
        <Row className="mt-4 g-4">
          {currentJobs.map((job) => (
            <Col md={4} key={job.id}>
              <Card className={darkMode ? "shadow-lg rounded-3 bg-secondary text-light" : "shadow-lg rounded-3 bg-white text-dark"}>
                <Card.Body>
                  <Card.Title className={darkMode ? "fw-bold text-light" : "fw-bold text-dark"}>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                  <Card.Text>📍 {job.location}</Card.Text>
                  <Card.Text className="fw-bold">💰 {job.pay}</Card.Text>
                  <Button variant={darkMode ? "light" : "dark"} onClick={() => navigate(`/job/${job.id}`)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="justify-content-center mt-4">
          {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(number => (
            <Pagination.Item 
              key={number + 1} 
              active={number + 1 === currentPage} 
              onClick={() => setCurrentPage(number + 1)}
              className={darkMode ? "rounded-pill bg-secondary text-light border-0 mx-1" : "rounded-pill bg-white text-dark border-0 mx-1 shadow-sm"}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
}
