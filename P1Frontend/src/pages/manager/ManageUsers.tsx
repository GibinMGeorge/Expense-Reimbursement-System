import { UserList } from '../../components/users/Userlist';
import { UserResponse } from '../../interfaces/user';
import { getUsers } from '../../services/userService';
import { useEffect, useState } from 'react';

const ManagerUsers: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const fetchData = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error: any) {
      // TODO: Add type guard
      console.log(error.message);
    }
  };

  // TODO: Add isLoading
  useEffect(() => {
    fetchData();
  }, []);

  const handleUserDeleted = () => {
    fetchData();
  };

  return (
    <div className="container section">
      {/* Styled Header Panel */}
      <div className="card-panel green lighten-4 center-align">
      <h1 className="black-text text-darken-3" style={{ fontWeight: "bold", fontSize: "2rem" }}>Manage Users</h1>
      </div>
  
      {/* User List Section */}
      {users && users.length > 0 ? (
        <UserList users={users} handleRowDeleted={handleUserDeleted} />
      ) : (
        <p className="flow-text center-align grey-text text-darken-1">
          No Users found.
        </p>
      )}
    </div>
  );
  
};

export { ManagerUsers };