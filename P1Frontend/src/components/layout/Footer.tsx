const Footer: React.FC = () => {
  return (
    <footer className="page-footer green darken-2">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <h5 className="white-text">Employee Reimbursement System (ERS)</h5>
            <p className="grey-text text-lighten-4">
              A simple and efficient way to manage employee reimbursements.
            </p>
          </div>
          <div className="col s12 m6">
            <h5 className="white-text">Quick Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="/dashboard">Dashboard</a></li>
              <li><a className="grey-text text-lighten-3" href="/login">Login</a></li>
              <li><a className="grey-text text-lighten-3" href="/register">Register</a></li>
              <li><a className="grey-text text-lighten-3" href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container center-align">
          &copy; {new Date().getFullYear()} Employee Reimbursement System (ERS). All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
