import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Form, Card } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();
    const [darkTheme, setDarkTheme] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [userType, setUserType] = useState("student");
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ email: '', password: '', name: '', phone: '' });
    const [error, setError] = useState("");

    useEffect(() => {
        setDarkTheme(JSON.parse(localStorage.getItem("darkMode")) || false);

        const studentToken = localStorage.getItem("studentToken");
        const companyToken = localStorage.getItem("companyToken");

        if (studentToken) {
            navigate("/studentdashboard");
        } else if (companyToken) {
            navigate("/companydashboard");
        }
    }, [navigate]);

    const toggleTheme = () => {
        setDarkTheme(prevMode => {
            localStorage.setItem("darkMode", JSON.stringify(!prevMode));
            return !prevMode;
        });
    };

    const handleInputChange = (e, isLogin) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setRegisterData({ ...registerData, [name]: value });
        }
    };

    const handleSubmit = async (e, isLogin) => {
        e.preventDefault();
        setError("");
        try {
            const endpoint = isLogin ? "login" : "register";
            const bodyData = isLogin ? loginData : registerData;

            const response = await fetch(`https://hackathon-backend-z1w8.onrender.com/api/${userType === "student" ? "students" : "companies"}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                throw new Error("Invalid JSON response from server");
            }

            console.log("Parsed API Response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (isLogin && data.token) {
                try {
                    localStorage.setItem(`${userType}Token`, data.token);
                    localStorage.setItem(`${userType}Name`, data[userType]?.name || "");
                    if (userType === "student" && data.student?.studentId) {
                        localStorage.setItem("studentId", data.student.studentId);
                    } else if (userType === "company" && data.company?.companyId) {
                        localStorage.setItem("companyId", data.company.companyId);
                    }
                    console.log("Saved to localStorage:", {
                        token: localStorage.getItem(`${userType}Token`),
                        name: localStorage.getItem(`${userType}Name`),
                        id: userType === "student" ? localStorage.getItem("studentId") : localStorage.getItem("companyId")
                    });
                } catch (storageError) {
                    console.error("LocalStorage Error:", storageError);
                    setError("Storage issue. Please check browser settings.");
                    return;
                }
                navigate(`/${userType}dashboard`);
            } else if (!isLogin) {
                setIsRegister(false);
            }
        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className={darkTheme ? "bg-secondary text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
            <Navbar expand="lg" className={`px-3 shadow-lg ${darkTheme ? "bg-secondary" : "bg-light"}`} variant={darkTheme ? "dark" : "light"}>
                <Navbar.Brand className="fw-bold fs-3 text-primary">
                    Ideathon Job Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button variant={darkTheme ? "outline-light" : "outline-dark"} onClick={toggleTheme}>
                            {darkTheme ? <FaSun /> : <FaMoon />}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container mt-5 d-flex justify-content-center">
                <Card className={`border-0 shadow-lg p-4 ${darkTheme ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ width: '400px' }}>
                    <Card.Body>
                        <h3 className="fw-bold text-center">{isRegister ? "Register" : "Login"}</h3>
                        <Form onSubmit={(e) => handleSubmit(e, !isRegister)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select User Type</Form.Label>
                                <Form.Select value={userType} onChange={(e) => setUserType(e.target.value)}>
                                    <option value="student">Student</option>
                                    <option value="company">Company</option>
                                </Form.Select>
                            </Form.Group>
                            {isRegister && (
                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={registerData.name} onChange={(e) => handleInputChange(e, false)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="tel" name="phone" value={registerData.phone} onChange={(e) => handleInputChange(e, false)} required />
                                    </Form.Group>
                                </>
                            )}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={isRegister ? registerData.email : loginData.email} onChange={(e) => handleInputChange(e, !isRegister)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={isRegister ? registerData.password : loginData.password} onChange={(e) => handleInputChange(e, !isRegister)} required />
                            </Form.Group>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <Button type="submit" variant="primary" className="w-100">{isRegister ? "Register" : "Login"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default LandingPage;
