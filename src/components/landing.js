import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

            const response = await fetch(`https://hackathon-backend-z1w8.onrender.com/api/${userType === "student" ? "students" : "companys"}/${endpoint}`, {
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

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (isLogin && data.token) {
                try {
                    localStorage.setItem(`${userType}Token`, data.token);
                    if (userType === "student") {
                        localStorage.setItem("studentName", data.student?.name || "");
                        localStorage.setItem("studentId", data.student?.studentId || "");
                    } else if (userType === "company") {
                        localStorage.setItem("companyName", data.company?.name || "");
                        localStorage.setItem("companyId", data.company?.companyId || "");
                    }
                    console.log(data)
                } catch (storageError) {
                    setError("Storage issue. Please check browser settings.");
                    return;
                }
                navigate(`/${userType}dashboard`);
            } else if (!isLogin) {
                setIsRegister(false);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <motion.div 
            className={darkTheme ? "bg-secondary text-light min-vh-100" : "bg-light text-dark min-vh-100"}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Navbar expand="lg" className={`px-3 shadow-lg ${darkTheme ? "bg-secondary" : "bg-light"}`} variant={darkTheme ? "dark" : "light"}>
                <Navbar.Brand className="fw-bold fs-3 text-primary">Ideathon Job Portal</Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center">
                    <motion.button 
                        className="btn btn-outline-dark" 
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}>
                        {darkTheme ? <FaSun /> : <FaMoon />}
                    </motion.button>
                </Nav>
            </Navbar>

            <div className="container mt-5 d-flex justify-content-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }} 
                    className={`border-0 shadow-lg p-4 rounded ${darkTheme ? "bg-dark text-light" : "bg-white text-dark"}`} 
                    style={{ width: '400px' }}>

                    <h3 className="fw-bold text-center">{isRegister ? "Register" : "Login"}</h3>
                    <Form onSubmit={(e) => handleSubmit(e, !isRegister)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Select User Type</Form.Label>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Form.Select value={userType} onChange={(e) => setUserType(e.target.value)}>
                                    <option value="student">Student</option>
                                    <option value="company">Company</option>
                                </Form.Select>
                            </motion.div>
                        </Form.Group>

                        {isRegister && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={registerData.name} onChange={(e) => handleInputChange(e, false)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" name="phone" value={registerData.phone} onChange={(e) => handleInputChange(e, false)} required />
                                </Form.Group>
                            </motion.div>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={isRegister ? registerData.email : loginData.email} onChange={(e) => handleInputChange(e, !isRegister)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={isRegister ? registerData.password : loginData.password} onChange={(e) => handleInputChange(e, !isRegister)} required />
                        </Form.Group>

                        {error && <motion.p className="text-danger text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}

                        <motion.button 
                            type="submit" 
                            className="btn btn-primary w-100 mb-2" 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}>
                            {isRegister ? "Register" : "Login"}
                        </motion.button>

                        <p className="text-center mt-3">
                            {isRegister ? "Already have an account? " : "New here? "}
                            <span 
                                className="text-primary fw-bold" 
                                style={{ cursor: "pointer" }} 
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? "Login" : "Register"}
                            </span>
                        </p>
                    </Form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LandingPage;
