import { UserResponse } from '../../interfaces/user';
import { UserRole } from "../../interfaces/UserRole";
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { DeleteUserModal } from './DeleteUser';
import { ChangeUserRoleModal } from './UpdateUserRole';
import { deleteUser, updateUserRole } from '../../services/userService';
import toast from 'react-hot-toast';

interface UserRowProps {
  user: UserResponse;
  handleRowDeleted?: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, handleRowDeleted }) => {
  const { id, firstName, lastName, username, role } = user;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRoleChangeModalOpen, setIsRoleChangeModalOpen] = useState<boolean>(false);

    // Debug state changes
    useEffect(() => {
      console.log("🔥 isDeleteModalOpen changed:", isDeleteModalOpen);
    }, [isDeleteModalOpen]);

    const handleDeleteUser = async (userId: number) => {
      console.log("🛠 Attempting to delete user ID:", userId);
    
      if (!userId) {
        console.error("❌ User ID is undefined!");
        return;
      }
    
      try {
        console.log("🚀 Sending DELETE request...");
        const response = await deleteUser(userId);
    
        console.log("✅ Delete API Response:", response);
    
        if (handleRowDeleted) {
          console.log("🔄 Refreshing user list...");
          handleRowDeleted();
        }
    
        toast.success("User deleted successfully!");
      } catch (error: any) {
        console.error("❌ Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.");
      }
    
      setIsDeleteModalOpen(false);
    };
    
  

  const handleChangeRole = async () => {
    try {
      await updateUserRole(id, UserRole.MANAGER);
      toast.success("User promoted to Manager successfully!");
      if (handleRowDeleted) handleRowDeleted();
    } catch (error: any) {
      toast.error("Failed to update user role. Please try again.");
      console.error("Error updating user role:", error);
    }
    setIsRoleChangeModalOpen(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {firstName} {lastName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {username}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              role === UserRole.MANAGER
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {role}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="flex gap-4" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            {/* Promote only Employees */}
            {role === UserRole.USER && (
              <Button
                handleClick={() => setIsRoleChangeModalOpen(true)}
                className="btn blue darken-2 waves-effect waves-light btn-small"
                aria-label="Promote to Manager"
              >
                <i className="material-icons">swap_vert</i>
              </Button>
            )}

            {/* Delete only Employees */}
            {role === UserRole.USER && (
            <Button
            handleClick={() => {
              console.log("🛠 Delete button clicked for user ID:", id); // Debugging
              setIsDeleteModalOpen(true);
              setTimeout(() => {
                console.log("📌 Modal should still be open:", isDeleteModalOpen);
              }, 1000);
            }}
            className="btn red darken-2 waves-effect waves-light btn-small"
            aria-label="Delete User"
          >
            <i className="material-icons">clear</i>
          </Button>
                                       
            
            )}
          </div>
        </td>
      </tr>

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleDeleteUser={(userId) => handleDeleteUser(userId)} // ✅ Explicitly passing userId
        userId={id}
      />


      <ChangeUserRoleModal
        isOpen={isRoleChangeModalOpen}
        handleClose={() => setIsRoleChangeModalOpen(false)}
        handleChangeRole={handleChangeRole}
        newRole={UserRole.MANAGER}
        setNewRole={() => {}}
        userId={id}
      />
    </>
  );
};

export { UserRow };