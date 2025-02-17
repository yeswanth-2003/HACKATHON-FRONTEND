import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CompanyProfile() {
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    description: "",
    openings: "",
    employees: "",
    location: "",
    website: "",
    industry: "",
    founded: "",
    image: ""
  });
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      fetch(`https://hackathon-backend-z1w8.onrender.com/api/companyprofile/profile/${companyId}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setCompanyProfile(data);
            console.log("Company profile fetched:", data);
          } if(data.message === "Company profile not found") {
            setShowForm(true);
          }
        })
        .catch(error => {
          console.error("Error fetching company profile:", error);
          setShowForm(true);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyProfile({ ...companyProfile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyId = localStorage.getItem("companyId");
    const newCompanyProfile = { ...companyProfile, companyId };

    fetch("https://hackathon-backend-z1w8.onrender.com/api/companyprofile/newcompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCompanyProfile)
    })
      .then(response => response.json())
      .then(data => {
        console.log("New company profile created:", data);
        setCompanyProfile(newCompanyProfile);
        setShowForm(false);
      })
      .catch(error => {
        console.error("Error creating new company profile:", error);
      });
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
        <Navbar.Brand className={darkMode ? "text-light" : "text-dark"}>Company Profile</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{ filter: darkMode ? "invert(1)" : "none" }} // Ensures visibility in dark mode
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companydashboard')}>Dashboard</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/postjob')}>Post a Job</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/applications')}>Applications</Nav.Link>
            <Button className="ms-3" onClick={toggleDarkMode} variant={darkMode ? "outline-light" : "outline-dark"}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-3" onClick={() => navigate('/')}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10}>
            {showForm ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" name="companyName" value={companyProfile.companyName} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" value={companyProfile.description} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Job Openings</Form.Label>
                  <Form.Control type="text" name="openings" value={companyProfile.openings} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Employees</Form.Label>
                  <Form.Control type="text" name="employees" value={companyProfile.employees} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" value={companyProfile.location} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control type="text" name="website" value={companyProfile.website} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Industry</Form.Label>
                  <Form.Control type="text" name="industry" value={companyProfile.industry} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Founded</Form.Label>
                  <Form.Control type="text" name="founded" value={companyProfile.founded} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" name="image" value={companyProfile.image} onChange={handleInputChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            ) : (
              <>
                <Row className="align-items-center mb-4">
                  <Col md={9}>
                    <h2>{companyProfile.companyName}</h2>
                    <p><strong>Industry:</strong> {companyProfile.industry}</p>
                    <p><strong>Founded:</strong> {companyProfile.founded}</p>
                    <p><strong>Location:</strong> {companyProfile.location}</p>
                    <p><strong>Website:</strong> <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className={darkMode ? "text-light" : "text-dark"}>{companyProfile.website}</a></p>
                  </Col>
                  <Col md={3}>
                    <Image src={companyProfile.image} rounded fluid className="w-100" />
                  </Col>
                </Row>
                <hr />
                <h4 className="mt-4">About</h4>
                <p>{companyProfile.description}</p>
                <hr />
                <h4 className="mt-4">Job Openings</h4>
                <p>{companyProfile.openings}</p>
                <hr />
                <h4 className="mt-4">Number of Employees</h4>
                <p>{companyProfile.employees}</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}