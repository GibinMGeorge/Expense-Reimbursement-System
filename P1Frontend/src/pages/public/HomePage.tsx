import { PageWrapper } from "../../components/layout/PageWrapper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const isAuthenticated = !!localStorage.getItem("userId"); 

  const handleNavigation = (path: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to continue.");
    } else {
      navigate(path);
    }
  };

  return (
    <PageWrapper>
      <br />
      <br />
      <div className="container">
        {/* Hero Section */}
        <div className="card-panel teal lighten-5 center-align z-depth-3" style={{ padding: "2rem", borderRadius: "10px" }}>
          <h1 className="blue-text text-darken-3" style={{ fontWeight: "bold", fontSize: "2rem" }}>
            Employee Reimbursement System (ERS)
          </h1>
          <p className="grey-text text-darken-1" style={{ fontSize: "1.2rem" }}>
            Simplifying your reimbursements with efficiency and ease.
          </p>
          <div className="divider"></div>

          {/* CTA Buttons */}
          <div className="section">
            <a href="/login" className="waves-effect waves-light btn-large green darken-2" style={{ marginRight: "10px" }}>
              <strong>login</strong>
            </a>
            <a href="/register" className="waves-effect waves-light btn-large blue darken-2">
            <strong>Register</strong>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="section">
          <div className="row">
            <div className="col s12 m6">
              <div className="card z-depth-3">
                <div className="card-content center-align">
                  <span className="card-title blue-text text-darken-3">Manage Your Expenses</span>
                  <p className="grey-text text-darken-1">Track and submit your reimbursement requests with ease.</p>
                </div>
                <div className="card-action center-align">
                  <button
                    onClick={() => handleNavigation("/employee/reimbursements")}
                    className="btn waves-effect waves-light teal darken-3"
                  >
                    View Reimbursements
                  </button>
                </div>
              </div>
            </div>

            <div className="col s12 m6">
              <div className="card z-depth-3">
                <div className="card-content center-align">
                  <span className="card-title blue-text text-darken-3">Manager Dashboard</span>
                  <p className="grey-text text-darken-1">Review, approve, or reject reimbursements seamlessly.</p>
                </div>
                <div className="card-action center-align">
                  <button
                    onClick={() => handleNavigation("/manager/reimbursements")}
                    className="btn waves-effect waves-light orange darken-3"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export { HomePage };
