import { UserResponse } from "../../interfaces/user";
import { UserRole } from "../../interfaces/UserRole";
import { useState } from "react";
import { UserRow } from "./UserRow";

interface UserListProps {
  users: UserResponse[];
  handleRowDeleted?: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, handleRowDeleted }) => {
  const [filterRole, setFilterRole] = useState<UserRole | "ALL">("ALL");

  const filteredUsers = users.filter(
    (user) => filterRole === "ALL" || user.role === filterRole
  );

  return (
    <div className="container">
      <table className="striped highlight centered responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as UserRole | "ALL")}
                className="browser-default"
              >
                <option value="ALL">Role</option>
                <option value={UserRole.USER}>Employee</option>
                <option value={UserRole.MANAGER}>Manager</option>
              </select>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} handleRowDeleted={handleRowDeleted} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="center-align grey-text">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { UserList };