import { ReimbursementResponse } from "@/interfaces/reimbursement";
import { ReimbursementRow } from "../ReimbursementRow/ReimbursementRow";
import { useState } from "react";
import { ReimbursementStatus } from "@/interfaces/ReimbursementStatus";
import { UserRole } from "@/interfaces/UserRole";

interface ReimbursementListProps {
  reimbursements: ReimbursementResponse[];
  role?: UserRole;
}

const ReimbursementList: React.FC<ReimbursementListProps> = ({ reimbursements, role }) => {
  const [filterStatus, setFilterStatus] = useState<ReimbursementStatus>("ALL");

  const filteredReimbursements = reimbursements.filter(
    (reimbursement) => filterStatus === "ALL" || reimbursement.status === filterStatus
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          minWidth: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#f9fafb" }}>
          <tr>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Amount</th>
            <th style={headerStyle}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ReimbursementStatus)}
                style={{
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="ALL">STATUS</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </th>
            <th style={headerStyle}>Approver's Comment</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReimbursements.length > 0 ? (
            filteredReimbursements.map((reimbursement) => (
              <ReimbursementRow key={reimbursement.id} reimbursement={reimbursement} role={role} />
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ padding: "16px", textAlign: "center", color: "#4b5563", fontStyle: "italic" }}>
                No reimbursements found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Common header style
const headerStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export { ReimbursementList };
