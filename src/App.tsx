import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inventory from "./pages/Inventory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* ✅ Default page (Inventory) */}
          <Route index element={<Navigate to="/inventory" replace />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/wishlists" element={<Inventory showWishlists />} />
          {/* 🚫 Redirect all invalid routes back to default */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
