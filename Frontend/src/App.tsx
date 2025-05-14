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
        <Route path="/" element={<Principal />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/create-area" element={<CreateArea />} />
        <Route path="/techs" element={<Techs />} />
        <Route path="/create-tech" element={<CreateTech />} />
        <Route path="/tech-list" element={<TechList />} />
        <Route path="/area-list" element={<AreaList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;