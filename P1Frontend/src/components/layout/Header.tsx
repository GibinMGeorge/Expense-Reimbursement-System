import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="nav-wrapper green darken-2">
      <div className="container">
        <Link to="/" className="brand-logo">
          Employee Reimbursement System (ERS)
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/login" className="waves-effect waves-light btn-small white green-text text-darken-2">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="waves-effect waves-light btn-small white green-text text-darken-2">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Header };
