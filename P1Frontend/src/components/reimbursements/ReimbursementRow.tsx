import { ReimbursementResolveRequest, ReimbursementResponse } from "../../interfaces/reimbursement";
import { useEffect, useState } from "react";
import { ResolveReimbursementModal } from "./ResolveReimbursement";
import { resolveReimbursement } from "../../services/reimbursementService";
import toast from "react-hot-toast";
import { ReimbursementStatus } from "../../interfaces/ReimbursementStatus";
import { UserRole } from "../../interfaces/UserRole";
import M from "materialize-css"; // Materialize Initialization

interface ReimbursementRowProps {
  reimbursement: ReimbursementResponse;
  role?: UserRole;
  handleReimbursementChanged?: () => void;
}

const ReimbursementRow: React.FC<ReimbursementRowProps> = ({
  reimbursement,
  role,
  handleReimbursementChanged,
}) => {
  const { id, description, amount, status, comment } = reimbursement;

  const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<ReimbursementStatus | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    M.AutoInit(); // Reinitialize Materialize CSS
  }, []);

  const handleResolveReimbursement = async () => {
    if (!newStatus) {
      toast.error("Please select either Approve or Deny before resolving.");
      return;
    }

    const payload: ReimbursementResolveRequest = {
      status: newStatus,
      comment: newComment,
      approverId: Number(localStorage.getItem("userId")), // Approver's ID
    };

    try {
      await resolveReimbursement(id, payload);
      toast.success(`Reimbursement ${newStatus === "APPROVED" ? "Approved" : "Denied"} Successfully!`);
      setIsResolveModalOpen(false);
      if (handleReimbursementChanged) handleReimbursementChanged();
    } catch (error: any) {
      toast.error("Failed to resolve reimbursement.");
      console.error("Error resolving reimbursement:", error);
    }
  };

  return (
    <>
      <tr>
        <td>{description}</td>
        <td>${amount}</td>
        <td>
          <span
            className={`badge ${
              status === "PENDING"
                ? "yellow darken-1"
                : status === "APPROVED"
                ? "green darken-1"
                : "red darken-1"
            }`}
          >
            {status}
          </span>
        </td>
        <td>{comment ?? "N/A"}</td>
        <td>
          <div className="action-buttons">
            {role === "MANAGER" && status === "PENDING" && (
              <button
                className="btn waves-effect waves-light green darken-1 modal-trigger"
                data-target="resolveReimbursementModal"
                onClick={() => setIsResolveModalOpen(true)}
              >
                Resolve
              </button>
            )}
          </div>
        </td>
      </tr>

      <ResolveReimbursementModal
        isOpen={isResolveModalOpen}
        handleClose={() => setIsResolveModalOpen(false)}
        handleResolve={handleResolveReimbursement}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </>
  );
};

export { ReimbursementRow };
