import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { UserLoginRequest } from "../../interfaces/user";
import { loginUser } from "../../services/authService";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const isLoginButtonActive = username !== "" && password !== "";

  const handleLogin = async () => {
    const payload: UserLoginRequest = { username, password };

    try {
      const response = await loginUser(payload);

      const loadingToast = toast.loading("Redirecting to your dashboard...");
      toast.success("Login successful!");

      setTimeout(() => {
        toast.dismiss(loadingToast);

        // Redirect based on user role
        if (response.role === "MANAGER") {
          navigate("/manager/reimbursements");
        } else {
          navigate("/employee/reimbursements");
        }
      }, 2000);

      // Store user details in local storage
      const { id, username, role } = response;
      localStorage.setItem("userId", id.toString());
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      console.log(response);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <div className="container section">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-content">
                <span className="card-title center-align">Login</span>

                {/* Error Message */}
                {(!isLoginButtonActive || username === "" || password === "") && (
                  <p className="red-text center-align">
                    Please enter both username and password.
                  </p>
                )}

                {/* Username Input */}
                <div className="input-field">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    required
                    className="validate"
                  />
                </div>

                {/* Password Input */}
                <div className="input-field">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                    className="validate"
                  />
                </div>

                {/* Login Button */}
                <div className="center-align">
                  <Button
                    handleClick={handleLogin}
                    isActive={isLoginButtonActive}
                    className={`btn green waves-effect waves-light ${
                      isLoginButtonActive ? "" : "disabled"
                    }`}
                  >
                    Login
                  </Button>
                </div>

                {/* Register Link */}
                <p className="center-align">
                  Don't have an account?{" "}
                  <Link to="/register" className="blue-text text-darken-2">
                    Register
                  </Link>
                </p>

                {/* Go Home Button */}
                <div className="center-align">
                  <Button to="/" className="btn-flat blue-text text-darken-2">
                    Go Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export { LoginPage };
