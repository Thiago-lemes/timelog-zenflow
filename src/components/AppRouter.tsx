import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Activities } from "@/pages/Activities";
import { Register } from "@/pages/Register";
import { History } from "@/pages/History";
import { Login } from "@/pages/Login";
import NotFound from "@/pages/NotFound";

export const AppRouter = () => {
  console.log('AppRouter is rendering');
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};