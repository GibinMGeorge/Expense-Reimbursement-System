import { ReimbursementResponse } from '../../interfaces/reimbursement';
import { ReimbursementRow } from './ReimbursementRow';
import { useState } from 'react';
import { ReimbursementStatus } from '../../interfaces/ReimbursementStatus';
import { UserRole } from '../../interfaces/UserRole';

interface ReimbursementListProps {
  reimbursements: ReimbursementResponse[];
  role?: UserRole;
  handleReimbursementChanged?: () => void;
};

const ReimbursementList: React.FC<ReimbursementListProps> = ({ reimbursements, role, handleReimbursementChanged }) => {
  const [filterStatus, setFilterStatus] = useState<ReimbursementStatus>('ALL');

  const filteredReimbursements = reimbursements.filter((reimbursement) =>
    filterStatus === 'ALL' || reimbursement.status === filterStatus
  );

  return (
    <div className="container section">
      <table className="highlight centered responsive-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ReimbursementStatus)}
                className="browser-default"
              >
                <option value="ALL">STATUS</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </th>
            <th>Approver's Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReimbursements.length > 0 ? (
            filteredReimbursements.map((reimbursement) => (
              <ReimbursementRow
                key={reimbursement.id}
                reimbursement={reimbursement}
                role={role}
                handleReimbursementChanged={handleReimbursementChanged}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="center-align grey-text">No reimbursements found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { ReimbursementList };
