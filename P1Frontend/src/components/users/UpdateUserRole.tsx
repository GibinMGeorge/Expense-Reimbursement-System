import { useEffect } from "react";
import { Button } from "../Button";

interface DeleteUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteUser: () => void;
  userId: number;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  handleClose,
  handleDeleteUser,
  userId,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="modal open">
      <div className="modal-content">
        <h4 className="center-align">Delete User</h4>
        <p className="center-align red-text">
          Are you sure you want to delete this user with ID <strong>{userId}</strong>?
        </p>
      </div>
      <div className="modal-footer">
        <Button
          handleClick={handleDeleteUser}
          className="btn red darken-1 waves-effect waves-light"
        >
          Delete
        </Button>
        <Button
          handleClick={handleClose}
          className="btn grey waves-effect waves-light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export { DeleteUserModal };
