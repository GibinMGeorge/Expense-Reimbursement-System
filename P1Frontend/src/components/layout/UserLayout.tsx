import { Link, Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer/Footer";
import Logo from "@/assets/logo.svg?react";
import { UserRole } from "@/interfaces/UserRole";
import { Button } from "@/components/ui/Button/Button";

interface UserLayoutProps {
  role: UserRole;
}

const UserLayout: React.FC<UserLayoutProps> = (role: UserLayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#f9fafb", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", padding: "16px 0" }}>
        <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center", flexDirection: "column" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Logo style={{ height: "40px", width: "40px", color: "#2563eb", display: "none" }} />
            <span style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginLeft: "10px" }}>
              ReimburseMate
            </span>
          </Link>
          <nav style={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
            <span style={{ fontSize: "1rem", color: "#111827" }}>
              Hello, <span style={{ fontStyle: "italic", color: "#2563eb" }}>{role.role}</span>
            </span>
            <Link
              to="/logout"
              style={{
                color: "#374151",
                textDecoration: "none",
                fontSize: "1rem",
                transition: "color 0.3s ease-in-out",
                marginTop: "8px",
              }}
              aria-label="Logout Page"
            >
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <main style={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center", padding: "24px" }}>
        {role.role === "MANAGER" && (
          <div style={{ padding: "16px", display: "flex", gap: "16px", marginBottom: "16px" }}>
            <Button to="/manager/reimbursements">Manage Reimbursements</Button>
            <Button to="/manager/users">Manage Users</Button>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { UserLayout };
