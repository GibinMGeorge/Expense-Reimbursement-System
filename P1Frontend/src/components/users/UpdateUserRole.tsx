import { Button } from "../Button";
import { UserRole } from "../../interfaces/UserRole";
import { useEffect } from "react";

interface ChangeUserRoleModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleChangeRole: (userId: number, newRole: UserRole) => void;
  newRole: UserRole;
  setNewRole: (value: UserRole) => void;
  userId: number;
}

const ChangeUserRoleModal: React.FC<ChangeUserRoleModalProps> = ({
  isOpen,
  handleClose,
  handleChangeRole,
  newRole,
  setNewRole,
  userId,
}) => {
  const handleChangeButtonClick = () => {
    handleChangeRole(userId, newRole);
    handleClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleClickOutside}
    >
      <div className="row" style={{ maxWidth: "200%" }}>
      <div className="card-panel lighten-4 center-align">
        <h5 className="black-text text-darken-3" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          Promote Employee to Manager ?
        </h5>
        <div className="card white z-depth-3">
        {/* <div className="card-content">
          <p className="flow-text center-align grey-text text-darken-1">
            Promote employee to Manager
          </p>
        </div> */}

        <div className="card-action center-align" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Button
            handleClick={handleChangeButtonClick}
            className="btn green darken-2 waves-effect waves-light"
          >
            Promote
          </Button>
          <Button
            handleClick={handleClose}
            className="btn red darken-2 waves-effect waves-light"
            
          >
            Cancel
          </Button>
        </div>
      </div>

      </div>

      
    </div>
    </div>
  );
};

export { ChangeUserRoleModal };
