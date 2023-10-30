import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import EnquiriesPage from "./pages/EnquiriesPage";
import FAQPage from "./pages/FAQPage";

const App = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <Router>
      {authState.user ? (
        <MainLayout>
          <Routes>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/services" element={<ServicesPage />} />
            <Route path="/admin/portfolio" element={<PortfolioPage />} />
            <Route path="/admin/contact" element={<EnquiriesPage />} />
            <Route path="/admin/faq" element={<FAQPage />} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
