import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
