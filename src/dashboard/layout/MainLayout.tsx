import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/layout.css";

const MainLayout = () => {
  return (
    <div className="nex-layout">
      <Sidebar />
      <div className="nex-main">
        <Topbar />
        <main className="nex-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
