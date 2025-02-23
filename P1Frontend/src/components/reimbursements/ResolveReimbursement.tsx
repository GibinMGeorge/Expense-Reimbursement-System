import { Button } from "../Button";
import { ReimbursementStatus } from "../../interfaces/ReimbursementStatus";
import { useEffect, useState } from "react";
import M from "materialize-css"; // Ensure Materialize works

interface ResolveReimbursementModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleResolve: () => void;
  newStatus: ReimbursementStatus | null;
  setNewStatus: (value: ReimbursementStatus) => void;
  newComment: string;
  setNewComment: (value: string) => void;
}

const ResolveReimbursementModal: React.FC<ResolveReimbursementModalProps> = ({
  isOpen,
  handleClose,
  handleResolve,
  newStatus,
  setNewStatus,
  newComment,
  setNewComment,
}) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError(""); // Reset error on modal open
    M.AutoInit(); // Initialize Materialize modals
  }, [isOpen]);

  const handleResolveButtonClick = () => {
    if (!newStatus) {
      setError("Please select a status before resolving.");
      return;
    }
    handleResolve();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div id="resolveReimbursementModal" className="modal open">
      <div className="modal-content">
        <h4 className="center-align">Resolve Reimbursement</h4>
        <p>Select the new status for this reimbursement:</p>
        <select
          value={newStatus || ""}
          onChange={(e) => setNewStatus(e.target.value as ReimbursementStatus)}
          className="browser-default"
        >
          <option value="" disabled>Select Status</option>
          <option value="APPROVED">Approve</option>
          <option value="REJECTED">Deny</option>
        </select>
        {error && <p className="red-text">{error}</p>}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="materialize-textarea"
        />
      </div>
      <div className="modal-footer" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Button handleClick={handleResolveButtonClick} className="btn green mx-2">
          Confirm
        </Button>
        <Button handleClick={handleClose} className="btn red mx-2">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export { ResolveReimbursementModal };
