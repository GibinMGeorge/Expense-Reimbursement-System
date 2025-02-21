import { Link, Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import Logo from "@/assets/logo.svg?react";
import { Button } from "./Button";
// import "./EmployeeLayout.css"; 

const EmployeeLayout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo-container">
            <Logo className="logo" />
            <span className="logo-text"> Employee Reimbursement System (ERS) </span>
          </Link>
          <nav className="nav-links">
            <Link to="/login" className="nav-link" aria-label="Logout Page">
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-container">
        <div className="button-group">
          <Button to="/employee/dashboard">Dashboard</Button>
          <Button to="/employee/reimbursements">View Reimbursements</Button>
          <Button to="/employee/reimbursements/pending">Pending Reimbursements</Button>
          <Button to="/employee/reimbursements/create">Create Reimbursement</Button>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { EmployeeLayout };
