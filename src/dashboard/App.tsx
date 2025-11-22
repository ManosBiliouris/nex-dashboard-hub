import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Scans from "./pages/Scans";
import Vulnerabilities from "./pages/Vulnerabilities";
import Settings from "./pages/Settings";
import AssetDetails from "./pages/AssetDetails"; // <-- ADD THIS

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="assets/:id" element={<AssetDetails />} /> {/* <-- NEW */}
          <Route path="scans" element={<Scans />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
