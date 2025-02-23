import { Button } from "../Button";
import { ReimbursementResolveRequest, ReimbursementResponse } from "../../interfaces/reimbursement";
import { useState } from "react";
import { ResolveReimbursementModal } from "./ResolveReimbursement";
import { resolveReimbursement } from "../../services/reimbursementService";
import toast from "react-hot-toast";
import { ReimbursementStatus } from "../../interfaces/ReimbursementStatus";
import { UserRole } from "../../interfaces/UserRole";

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
  const [newStatus, setNewStatus] = useState<ReimbursementStatus>(status);
  const [newComment, setNewComment] = useState<string | null>(comment);

  const handleResolveReimbursement = async () => {
    const payload: ReimbursementResolveRequest = {
      status: newStatus,
      comment: newComment,
      approverId: Number(localStorage.getItem("userId")), // Approver's ID
    };

    try {
      await resolveReimbursement(id, payload);
      toast.success("Reimbursement resolved successfully!");
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
              <Button
                handleClick={() => setIsResolveModalOpen(true)}
                className="btn waves-effect green darken-1"
              >
                Resolve
              </Button>
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
