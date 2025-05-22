import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";
import Techs from "./components/Techs";
import Login from "./components/Login";
import Principal from "./components/Principal";
import CreateTech from "./components/CreateTech";
import TechList from "./components/TechList";
import AreaList from "./components/AreaList";
import CreateArea from "./components/CreateArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mantenimiento" element={<Principal />} />
        <Route path="/mantenimiento/orders" element={<Orders />} />
        <Route path="/mantenimiento/create-order" element={<CreateOrder />} />
        <Route path="/mantenimiento/create-area" element={<CreateArea />} />
        <Route path="/mantenimiento/techs" element={<Techs />} />
        <Route path="/mantenimiento/create-tech" element={<CreateTech />} />
        <Route path="/mantenimiento/tech-list" element={<TechList />} />
        <Route path="/mantenimiento/area-list" element={<AreaList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;