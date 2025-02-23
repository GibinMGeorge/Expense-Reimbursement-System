import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="nav-wrapper green darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left" style={{ fontSize: "1.7rem", fontWeight: "bold", paddingLeft: "10px" }}>
          <i>Employee Reimbursement System (ERS)</i> 
        </Link>

        {/* Mobile Menu Toggle */}
        <a href="#" data-target="mobile-nav" className="sidenav-trigger right">
        </a>

        {/* Desktop Navigation */}
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/" className="waves-effect waves-light white-text">Home</Link>
          </li>
          <li>
            <Link to="/about" className="waves-effect waves-light white-text">About</Link>
          </li>
          <li>
            <Link to="/contact" className="waves-effect waves-light white-text">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <ul className="sidenav" id="mobile-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Header };
