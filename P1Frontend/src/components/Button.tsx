import { ButtonProps } from "../interfaces/ButtonProps";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Button.css"; 

const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  isActive = true,
  to,
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = to ? location.pathname === to : false;

  return (
    <button
      onClick={handleClick ? handleClick : to ? () => navigate(to) : undefined}
      className={`button ${isActiveRoute ? "button-active" : ""} ${className}`}
      disabled={!isActive}
    >
      {children}
    </button>
  );
};

export { Button };
