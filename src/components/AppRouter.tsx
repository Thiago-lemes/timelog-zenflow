import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Activities } from "@/pages/Activities";
import { Register } from "@/pages/Register";
import { History } from "@/pages/History";
import { Login } from "@/pages/Login";
import { Settings } from "@/pages/Settings";
import { CashFlow } from "@/pages/CashFlow";
import { Goals } from "@/pages/Goals";
import NotFound from "@/pages/NotFound";

export const AppRouter = () => {
  console.log('AppRouter is rendering');
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/activities" element={<Layout><Activities /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/history" element={<Layout><History /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />
      <Route path="/cashflow" element={<Layout><CashFlow /></Layout>} />
      <Route path="/goals" element={<Layout><Goals /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};