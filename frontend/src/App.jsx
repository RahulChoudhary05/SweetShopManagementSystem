import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./components/ui/toast"

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Dashboard } from "./pages/Dashboard"
import { Sweets } from "./pages/Sweets"
import { SweetDetail } from "./pages/SweetDetail"
import { Cart } from "./pages/Cart"
import { Admin } from "./pages/Admin"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* SHOP */}
          <Route path="/sweets" element={<Sweets />} />
          <Route path="/sweets/:id" element={<SweetDetail />} />
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN */}
          <Route path="/admin/*" element={<Admin />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastProvider />
      </Router>
    </AuthProvider>
  )
}

export default App
