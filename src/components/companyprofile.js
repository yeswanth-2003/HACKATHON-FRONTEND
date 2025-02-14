import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState("Tech Innovators Inc.");
  const [description, setDescription] = useState("Tech Innovators Inc. is a leading software development company specializing in AI-driven solutions and cloud computing services.");
  const [openings, setOpenings] = useState("Software Engineer, Data Scientist, DevOps Engineer");
  const [employees, setEmployees] = useState("500+ Employees");
  const [location, setLocation] = useState("San Francisco, CA, USA");
  const [website, setWebsite] = useState("https://techinnovators.com");
  const [industry, setIndustry] = useState("Software & AI");
  const [founded, setFounded] = useState("2010");
  const [image, setImage] = useState("https://www.infosys.com/content/dam/infosys-web/en/careers/Images/2020/global-education-mob.jpg");
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const navigate = useNavigate();

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
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companydashboard')}>Dashboard</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/post-job')}>Post a Job</Nav.Link>
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
            <Row className="align-items-center mb-4">
              <Col md={9}>
                <h2>{companyName}</h2>
                <p><strong>Industry:</strong> {industry}</p>
                <p><strong>Founded:</strong> {founded}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer" className={darkMode ? "text-light" : "text-dark"}>{website}</a></p>
              </Col>
              <Col md={3}>
                <Image src={image} rounded fluid className="w-100" />
              </Col>
            </Row>
            <hr />
            <h4 className="mt-4">About</h4>
            <p>{description}</p>
            <hr />
            <h4 className="mt-4">Job Openings</h4>
            <p>{openings}</p>
            <hr />
            <h4 className="mt-4">Number of Employees</h4>
            <p>{employees}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
