import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

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

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
            <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
                <Navbar.Brand className="fw-bold fs-3 text-warning">🚀 Student Profile</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}>
                    {navbarOpen ? <FaTimes /> : <FaBars />}
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className={navbarOpen ? "show" : ""}>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => navigate('/studentdashboard')} className="fw-semibold">Dashboard</Nav.Link>
                        <Nav.Link onClick={() => navigate('/joblisting')} className="fw-semibold">Job Listings</Nav.Link>
                        <Nav.Link onClick={() => navigate('/studentapplications')} className="fw-semibold">Applications</Nav.Link>
                        <Button variant="secondary" className="ms-3" onClick={toggleDarkMode}>
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </Button>
                        <Button variant="outline-warning" className="ms-2" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container mt-4">
                <div className={`card border-0 shadow-lg p-4 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}>
                    <div className="row align-items-center">
                        <div className="col-md-4 text-center">
                            <img src="profile.jpg" alt="Student Photo" className="border rounded-circle" 
                                style={{ width: '350px', height: '350px', objectFit: 'cover', borderWidth: '4px' }} />
                        </div>
                        <div className="col-md-8">
                            <h2 className={`fw-bold ${darkMode ? "text-light" : "text-dark"}`}>John Doe</h2>
                            <p className={darkMode ? "text-light" : "text-muted"}>Engineering Student | AI Enthusiast | Software Developer</p>
                            <p><strong>Location:</strong> New Delhi, India</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="fw-bold">About</h4>
                    <p>Engineering student passionate about software development and artificial intelligence, always eager to solve problems and innovate.</p>
                </div>

                <hr />

                <div className="mt-4">
                    <h4 className="fw-bold">Experience</h4>
                    <p className="fw-bold">Software Development Intern - Google</p>
                    <p>Worked on Android app development using Kotlin and Jetpack Compose.</p>
                </div>

                <hr />

                <div className="mt-4">
                    <h4 className="fw-bold">Skills</h4>
                    <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-secondary">Kotlin</span>
                        <span className="badge bg-secondary">Jetpack Compose</span>
                        <span className="badge bg-secondary">AI</span>
                        <span className="badge bg-secondary">Python</span>
                    </div>
                </div>

                <hr />

                <div className="mt-4">
                    <h4 className="fw-bold">Education</h4>
                    <p><strong>Jawaharlal Nehru Technical University</strong> | B.Tech in Computer Science (Expected 2025)</p>
                </div>

                <hr />

                <div className="mt-4">
                    <h4 className="fw-bold">Contact Info</h4>
                    <p><strong>Email:</strong> johndoe@example.com</p>
                    <p><strong>Phone:</strong> +91 9876543210</p>
                </div>

                <hr />

                <div className="text-center mt-4">
                    <button className="btn btn-primary px-4 py-2 me-2">Connect</button>
                    <a href="resume.pdf" className="btn btn-success px-4 py-2">Download Resume</a>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;