import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate(); // Hook to redirect after login

  const isLoginButtonActive = username !== "" && password !== "";

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/gmg/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures authentication works with cookies/sessions
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Store user details in localStorage for session persistence
      localStorage.setItem("user", JSON.stringify(data));

      console.log("Login successful:", data);

      // Redirect user after successful login
      navigate("/dashboard"); // Change this path as per your application
    } catch (error) {
      setErrorMessage("Invalid username or password.");
      console.error("Login failed:", error);
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

                {errorMessage && (
                  <p className="red-text center-align">{errorMessage}</p>
                )}

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

                <div className="center-align">
                  <Button
                    handleClick={handleLogin}
                    isActive={isLoginButtonActive}
                    className={`btn waves-effect waves-light ${
                      isLoginButtonActive ? "" : "disabled"
                    }`}
                  >
                    Login
                  </Button>
                </div>

                <p className="center-align">
                  Don't have an account?{" "}
                  <Link to="/register" className="blue-text">
                    Register
                  </Link>
                </p>

                <div className="center-align">
                  <Button to="/" className="btn-flat blue-text">
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
