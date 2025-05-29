import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Principal from "./components/Principal";
import CreateTech from "./components/CreateTech";
import TechList from "./components/TechList";
import AreaList from "./components/AreaList";
import CreateArea from "./components/CreateArea";
import UserRegister from "./components/UserRegister";
import Users from "./components/Users";
import OrdersCompleted from "./components/OrdersCompleted";
import OrderCompletedDetail from "./components/OrderCompletedDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mantenimiento" element={<ProtectedRoute><Principal /></ProtectedRoute>} />
        <Route path="/mantenimiento/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/mantenimiento/create-order" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
        <Route path="/mantenimiento/create-area" element={<ProtectedRoute><CreateArea /></ProtectedRoute>} />
        <Route path="/mantenimiento/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/mantenimiento/create-tech" element={<ProtectedRoute><CreateTech /></ProtectedRoute>} />
        <Route path="/mantenimiento/tech-list" element={<ProtectedRoute><TechList /></ProtectedRoute>} />
        <Route path="/mantenimiento/area-list" element={<ProtectedRoute><AreaList /></ProtectedRoute>} />
        <Route path="/user-register" element={<ProtectedRoute><UserRegister /></ProtectedRoute>} />
        <Route path="/mantenimiento-completado" element={<ProtectedRoute><OrdersCompleted /></ProtectedRoute>} />
        <Route path="/detalle/:id" element={<ProtectedRoute><OrderCompletedDetail /></ProtectedRoute>} />
        <Route path="/mantenimiento/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;