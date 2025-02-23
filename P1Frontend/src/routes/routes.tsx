import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/public/LoginPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { Layout } from '../components/layout/Layout';
import { LogoutPage } from '../pages/LogoutPage';
import { UserLayout } from '../components/layout/UserLayout';
import { UserRole } from '../interfaces/UserRole';
import { EmployeeReimbursements } from '../pages/employee/EmployeeReimbursements';
import { ManagerReimbursements } from '../pages/manager/ManageReimbursements';
import { ManagerUsers } from '../pages/manager/ManageUsers';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/logout', element: <LogoutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/employee',
    element: <UserLayout role={UserRole.USER} />,
    children: [
      { path: '', element: <Navigate to="/employee/reimbursements" /> },
      { path: 'reimbursements', element: <EmployeeReimbursements /> },
    ],
  },
  {
    path: 'manager',
    element: <UserLayout role={UserRole.MANAGER} />,
    children: [
      { path: '', element: <Navigate to="/manager/reimbursements" /> },
      { path: 'reimbursements', element: <ManagerReimbursements /> },
      { path: 'users', element: <ManagerUsers /> },
    ],
  },
]);

export { router };