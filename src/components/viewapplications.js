import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Applications() {
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
        <Navbar.Brand className={darkMode ? "text-light" : "text-dark"}>Applications</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" style={{ filter: darkMode ? "invert(1)" : "none" }} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companydashboard')}>Dashboard</Nav.Link>
            <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/postjob')}>Post a Job</Nav.Link>
             <Nav.Link className={darkMode ? "text-light" : "text-dark"} onClick={() => navigate('/companyprofile')}>Profile</Nav.Link>
                       
            <Button className="ms-3" onClick={toggleDarkMode} variant={darkMode ? "outline-light" : "outline-dark"}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button variant={darkMode ? "outline-light" : "outline-dark"} className="ms-3" onClick={() => navigate('/')}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-5">
        <h2>Job Applications</h2>
        <Table striped bordered hover variant={darkMode ? "dark" : "light"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Software Engineer</td>
              <td>john.doe@example.com</td>
              <td><Button variant="info" size="sm">View</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>Data Scientist</td>
              <td>jane.smith@example.com</td>
              <td><Button variant="info" size="sm">View</Button></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
