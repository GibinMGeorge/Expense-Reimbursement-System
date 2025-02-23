import { PageWrapper } from "../../components/layout/PageWrapper";

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>
        Employee Reimbursement System (ERS)
        </h1>
        <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
          Manage your reimbursements.
        </p>
      </header>
    </PageWrapper>
  );
};

export { HomePage };
