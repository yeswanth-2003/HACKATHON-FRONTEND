import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "Google", pay: "₹6,50,000", location: "Bangalore, India", description: "Develop user interfaces using React and Angular.", experience: "0-1 years", skills: "React, Angular, JavaScript, CSS", jobType: "Full-time", benefits: "Health Insurance, Work From Home", hiringProcess: "Online Assessment, Technical Interview, HR Interview" },
  { id: 2, title: "Backend Developer", company: "Amazon", pay: "₹7,00,000", location: "Hyderabad, India", description: "Work on scalable backend services with Node.js and Python.", experience: "0-1 years", skills: "Node.js, Python, SQL, AWS", jobType: "Full-time", benefits: "Bonus, Flexible Work Hours", hiringProcess: "Coding Test, Technical Interviews, HR Round" },
  { id: 3, title: "Data Analyst", company: "Microsoft", pay: "₹6,00,000", location: "Pune, India", description: "Analyze large datasets and create meaningful reports.", experience: "0-1 years", skills: "SQL, Excel, Python, Power BI", jobType: "Full-time", benefits: "Stock Options, Health Coverage", hiringProcess: "Online Test, Technical Round, Managerial Round" },
  { id: 4, title: "Software Engineer", company: "Adobe", pay: "₹8,50,000", location: "Mumbai, India", description: "Design and develop high-quality software solutions.", experience: "0-1 years", skills: "Java, C++, Data Structures", jobType: "Full-time", benefits: "Gym Membership, Travel Allowance", hiringProcess: "Coding Test, System Design Interview, HR Interview" },
  { id: 5, title: "Cybersecurity Analyst", company: "IBM", pay: "₹7,50,000", location: "Chennai, India", description: "Monitor and protect organizational data and networks.", experience: "0-1 years", skills: "Network Security, Ethical Hacking, SIEM", jobType: "Full-time", benefits: "Remote Work, Learning Allowance", hiringProcess: "Aptitude Test, Security Test, HR Round" },
  { id: 6, title: "Cloud Engineer", company: "Oracle", pay: "₹9,00,000", location: "Delhi, India", description: "Develop and maintain cloud infrastructure solutions.", experience: "0-1 years", skills: "AWS, Azure, Kubernetes, Terraform", jobType: "Full-time", benefits: "Work From Home, Certification Sponsorship", hiringProcess: "Coding Test, Cloud Tech Interview, HR Round" },
  { id: 7, title: "AI Engineer", company: "Tesla", pay: "₹15,00,000", location: "Bangalore, India", description: "Build AI models and automation systems.", experience: "0-1 years", skills: "Machine Learning, Deep Learning, Python", jobType: "Full-time", benefits: "Stock Options, Flexible Hours", hiringProcess: "ML Test, Technical Interview, HR Round" },
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("darkMode")) || false);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <h2 className="text-center mt-5">Job not found</h2>;
  }

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3 shadow-lg">
        <Navbar.Brand className="fw-bold fs-3 text-warning">🚀 Student Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/studentprofile')} className="fw-semibold">Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/studentdashboard')} className="fw-semibold">Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/joblisting')} className="fw-semibold">Job Listings</Nav.Link>
            <Button variant="secondary" className="ms-3" onClick={toggleDarkMode}>
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
            <Button variant="outline-warning" className="ms-2" onClick={() => navigate('/')}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="mt-5 mx-auto" style={{ maxWidth: "800px" }}>
        <h2 className="fw-bold text-primary">{job.title}</h2>
        <p className={`fs-5 ${darkMode ? "text-light" : "text-muted"}`}>{job.company} | {job.location}</p>
        <hr />
        <p className="fs-5"><strong>💰 Salary:</strong> {job.pay}</p>
        <p className="fs-5"><strong>🎓 Experience Required:</strong> {job.experience}</p>
        <p className="fs-5"><strong>🛠 Skills:</strong> {job.skills}</p>
        <p className="fs-5"><strong>📝 Job Type:</strong> {job.jobType}</p>
        <p className="fs-5"><strong>🎁 Benefits:</strong> {job.benefits}</p>
        <p className="fs-5"><strong>📌 Hiring Process:</strong> {job.hiringProcess}</p>
        <p className="fs-5"><strong>📝 Job Description:</strong> {job.description}</p>
        <hr />
        <div className="d-flex gap-3">
          <Button variant="success" size="lg">Apply Now</Button>
          <Button variant="outline-secondary" size="lg" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    </div>
  );
}