import { UserRole } from '../../interfaces/UserRole';
import { EmployeeReimbursements } from '../employee/EmployeeReimbursements';

const ManagerReimbursements: React.FC = () => {
  return (
    <EmployeeReimbursements
      role={UserRole.MANAGER}
    />
  );
};

export { ManagerReimbursements };