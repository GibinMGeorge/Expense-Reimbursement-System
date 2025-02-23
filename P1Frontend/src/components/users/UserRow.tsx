import { UserResponse } from '../../interfaces/user';
import { UserRole } from "../../interfaces/UserRole";
import { Button } from '../Button';
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
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

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully!");
      if (handleRowDeleted) handleRowDeleted();
    } catch (error: any) {
      toast.error("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
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
          <div className="flex gap-4">
            {/* Promote only Employees */}
            {role === UserRole.USER && (
              <Button
                handleClick={() => setIsRoleChangeModalOpen(true)}
                className="w-12 h-12 flex items-center justify-center text-orange-600 hover:text-orange-100 bg-orange-100 hover:bg-orange-600 active:bg-orange-700"
                aria-label="Promote to Manager"
              >
                <ArrowPathIcon />
              </Button>
            )}

            {/* Delete only Employees */}
            {role === UserRole.USER && (
            <Button
            handleClick={() => setIsDeleteModalOpen(true)}
            className="btn red darken-2 waves-effect waves-light btn-small"
            aria-label="Delete User"
          >
            <i className="material-icons">remove_circle_outline</i>
          </Button>                              
            
            )}
          </div>
        </td>
      </tr>

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleDeleteUser={handleDeleteUser}
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