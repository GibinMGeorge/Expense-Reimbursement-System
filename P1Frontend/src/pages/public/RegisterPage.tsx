import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { UserRequest } from '../../interfaces/user';
import { UserRole } from '../../interfaces/UserRole';
import { useState } from 'react';
import { registerUser } from '../../services/authService';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const isRegisterButtonActive = firstName !== '' && lastName !== '' && username !== '' && password !== '';

  const handleRegister = async () => {
    const payload: UserRequest = {
      firstName,
      lastName,
      username,
      password,
      role: UserRole.USER,
    };

    try {
      const response = await registerUser(payload);
      const loadingToast = toast.loading('You are being redirected to the login page...');
      toast.success('Registration successful!');

      setTimeout(() => {
        toast.dismiss(loadingToast);
        navigate('/login');
      }, 3000);

      console.log(response);
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }

      console.error(error.message);
    }
  };

  return (
    <PageWrapper>
      <div className="container section">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-content">
                <span className="card-title center-align">Register</span>
                <p className="red-text center-align">
                  * Fields marked with * are mandatory.
                </p>

                <div className="input-field">
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="First Name *"
                    required
                    className="validate"
                  />
                </div>

                <div className="input-field">
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name *"
                    required
                    className="validate"
                  />
                </div>

                <div className="input-field">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username *"
                    required
                    className="validate"
                  />
                </div>

                <div className="input-field">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password *"
                    required
                    className="validate"
                  />
                </div>

                <div className="center-align">
                  <Button
                    handleClick={handleRegister}
                    isActive={isRegisterButtonActive}
                    className={`btn green waves-effect waves-light ${
                      isRegisterButtonActive ? "" : "disabled"
                    }`}
                  >
                    Register
                  </Button>
                </div>

                <p className="center-align">
                  Already have an account?{" "}
                  <Link to="/login" className="blue-text">
                    Login
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

export { RegisterPage };
