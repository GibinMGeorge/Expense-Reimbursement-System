import { useEffect } from "react";
import { Button } from "../Button";

interface DeleteUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteUser: (userId: number) => void;
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

  const handleDeleteButtonClick = () => {
    console.log("✅ Delete button inside modal clicked for user ID:", userId);
    
    if (!userId) {
      console.error("❌ User ID is undefined in DeleteUserModal!");
      return;
    }
  
    if (typeof handleDeleteUser === "function") {
      handleDeleteUser(userId); // ✅ This ensures the function is triggered
      console.log("🚀 handleDeleteUser called for user ID:", userId);
    } else {
      console.error("❌ handleDeleteUser is NOT a function!");
    }
  
    handleClose();
  };
  
  

  useEffect(() => {
    console.log("📝 DeleteUserModal Rendered. isOpen:", isOpen, "userId:", userId);
  }, [isOpen, userId]);
  
  

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
          handleClick={handleDeleteButtonClick}
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
