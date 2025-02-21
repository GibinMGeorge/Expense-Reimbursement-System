import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
// import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
          <span className="logo-text">
            Employee Reimbursement System (ERS)
          </span>
        </Link>
        <nav className="nav-links">
          <Link to="/login" className="nav-link" aria-label="Login Page">
            Login
          </Link>
          <Link to="/register" className="nav-link" aria-label="Register Page">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export { Header };
