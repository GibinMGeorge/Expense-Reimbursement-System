import { Link, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { UserRole } from "../../interfaces/UserRole";
import { Button } from "../Button";
import { toast } from "react-hot-toast";
import { logoutUser } from "../../services/authService";

interface UserLayoutProps {
  role: UserRole;
}

const UserLayout: React.FC<UserLayoutProps> = (role: UserLayoutProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await logoutUser();

      const loadingToast = toast.loading(
        "You are being redirected to the login page..."
      );
      toast.success("Logout successful!");

      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      setTimeout(() => {
        navigate("/login");
        toast.dismiss(loadingToast);
      }, 2000);

      console.log(response);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Green Navbar */}
      <header className="navbar-fixed">
        <nav className="green">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo">
              Employee Reimbursement System
            </Link>

            <ul className="right hide-on-med-and-down">
              {/* Username Display */}
              <li>
                <span className="white-text">Hello, {role.role}</span>
              </li>

              {/* Logout Button (Moved to Right) */}
              <li>
                <Link
                  to="/logout"
                  onClick={handleLogoutClick}
                  className="waves-effect waves-light btn red darken-2 white-text"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Manager Controls - Moved Outside Navbar */}
      {role.role === "MANAGER" && (
        <div className="container section">
          <div className="card-panel green lighten-4 center-align">
            <h5 className="green-text text-darken-2"></h5>
            <div className="row">
              <div className="col s6">
                <Link to="/manager/reimbursements" className="waves-effect waves-light btn green darken-2 white-text">
                  Manage Reimbursements
                </Link>
              </div>
              <div className="col s6">
                <Link to="/manager/users" className="waves-effect waves-light btn green darken-2 white-text">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container section">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export { UserLayout };
