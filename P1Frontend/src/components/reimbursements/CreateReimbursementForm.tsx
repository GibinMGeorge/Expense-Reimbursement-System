import { useEffect } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import M from 'materialize-css';

interface CreateReimbursementFormModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: () => void;
  amount: number;
  setAmount: (value: number) => void;
  description: string;
  setDescription: (value: string) => void;
}

const CreateReimbursementFormModal: React.FC<CreateReimbursementFormModalProps> = ({
  isOpen,
  handleClose,
  handleSave,
  amount,
  setAmount,
  description,
  setDescription,
}) => {

  useEffect(() => {
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      M.Modal.init(modalElement, {});
    }
  }, []);

  const handleSaveButtonClick = () => {
    handleSave();
    handleClose();
  };

  return (
    <div id="createReimbursementModal" className="modal">
      <div className="modal-content">
        <h4>Create Reimbursement</h4>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          required
        />
      </div>
      <div className="modal-footer" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Button
          handleClick={handleSaveButtonClick}
          className="btn green waves-effect waves-light"
          isActive={description.length > 0 && amount !== undefined && amount > 0}
        >
          Create
        </Button>
        <Button
          handleClick={handleClose}
          className="btn red waves-effect waves-light modal-close"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export { CreateReimbursementFormModal };
