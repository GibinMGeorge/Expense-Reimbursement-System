import { Button } from "@/components/Button";
import Logo from "@/assets/logo.svg?react";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <Logo style={{ height: "80px", width: "80px", marginBottom: "1rem", color: "#2563eb" }} />
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>
          ReimburseMate
        </h1>
        <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
          Manage your reimbursements with ease.
        </p>
      </header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button to="/login">Login</Button>
        <Button to="/register">Register</Button>
      </div>
    </PageWrapper>
  );
};

export { HomePage };
