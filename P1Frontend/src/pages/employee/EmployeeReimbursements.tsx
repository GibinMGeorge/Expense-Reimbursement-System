import { CreateReimbursementFormModal } from "../../components/reimbursements/CreateReimbursementForm";
import { ReimbursementList } from "../../components/reimbursements/ReimbursementList";
import { Button } from "../../components/Button";
import { ReimbursementRequest, ReimbursementResponse } from "../../interfaces/reimbursement";
import { UserRole } from "../../interfaces/UserRole";
import { createReimbursement, getReimbursements, getReimbursementsByUserId } from "../../services/reimbursementService";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import M from 'materialize-css'; // Materialize for modal

interface ReimbursementListProps {
  role?: UserRole;
}

const EmployeeReimbursements: React.FC<ReimbursementListProps> = ({ role }) => {
  const [reimbursements, setReimbursements] = useState<ReimbursementResponse[]>([]);
  const [newReimbursementAmount, setNewReimbursementAmount] = useState<number>(0);
  const [newReimbursementDescription, setNewReimbursementDescription] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const userId = Number(localStorage.getItem("userId")); // Get logged-in user's ID

  useEffect(() => {
    M.AutoInit(); // Initialize Materialize components
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let reimbursements: ReimbursementResponse[];

      if (role === "MANAGER") {
        reimbursements = await getReimbursements(); // Fetch all reimbursements for managers
      } else {
        reimbursements = await getReimbursementsByUserId(userId); // Fetch only user's reimbursements
      }

      setReimbursements(reimbursements);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSaveReimbursement = async () => {
    const payload: ReimbursementRequest = {
      userId: userId, // Use the logged-in user's ID
      description: newReimbursementDescription,
      amount: newReimbursementAmount,
      status: "PENDING",
    };

    try {
      await createReimbursement(payload);
      setNewReimbursementAmount(0);
      setNewReimbursementDescription('');
      toast.success("Reimbursement created successfully!");
      setIsCreateModalOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Failed to create reimbursement. Please try again later.");
      console.error("Error creating reimbursement:", error);
    }
  };

  return (
    <div className="container section">
      <div className="card-panel green lighten-4 center-align">
        <h4 className="green-text text-darken-2">
          {role === "MANAGER" ? "Manage" : "Your"} Reimbursements
        </h4>
      </div>

      {/* Create New Reimbursement Button (Floating Button) */}
      <div className="fixed-action-btn">
        <a
          href="#createReimbursementModal"
          className="btn-floating btn-large green darken-2 waves-effect waves-light modal-trigger"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="material-icons">add</i>
        </a>
      </div>

      {/* Reimbursement List */}
      {reimbursements.length > 0 ? (
        <ReimbursementList
          reimbursements={reimbursements}
          role={role}
          handleReimbursementChanged={fetchData}
        />
      ) : (
        <p className="flow-text center-align grey-text text-darken-1">
          No reimbursements found.
        </p>
      )}

      {/* Create Reimbursement Modal */}
      <CreateReimbursementFormModal
        isOpen={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
        handleSave={handleSaveReimbursement}
        amount={newReimbursementAmount}
        setAmount={setNewReimbursementAmount}
        description={newReimbursementDescription}
        setDescription={setNewReimbursementDescription}
      />
    </div>
  );
};

export { EmployeeReimbursements };
