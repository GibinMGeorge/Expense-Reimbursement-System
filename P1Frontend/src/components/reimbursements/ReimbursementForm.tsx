import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { ReimbursementResponse } from "@/interfaces/reimbursement";

interface ReimbursementFormModalProps {
  isOpen: boolean;
  isCreating?: boolean;
  handleClose: () => void;
  handleSave: () => void;
  reimbursement?: ReimbursementResponse;
}

const ReimbursementFormModal: React.FC<ReimbursementFormModalProps> = ({
  isOpen,
  isCreating = false,
  handleClose,
  handleSave,
  reimbursement,
}) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    if (!isCreating) {
      if (reimbursement) {
        setDescription(reimbursement.description);
        setAmount(reimbursement.amount);
      }
    } else {
      setDescription("");
    }
  }, [isCreating, reimbursement]);

  const handleSaveButtonClick = () => {
    handleSave();
    handleClose();
  };

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

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      className="modal-overlay"
      onClick={handleClickOutside}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>
          {isCreating ? "Create" : "Edit"} Reimbursement
        </h2>
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
        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginTop: "16px" }}>
          <Button
            handleClick={handleSaveButtonClick}
            isActive={description.length > 0 && amount !== undefined}
            style={{
              color: "#065f46",
              backgroundColor: "#d1fae5",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#065f46")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d1fae5")}
          >
            {isCreating ? "Create" : "Save"}
          </Button>
          <Button
            handleClick={handleClose}
            style={{
              color: "#b91c1c",
              backgroundColor: "#fee2e2",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ReimbursementFormModal };
