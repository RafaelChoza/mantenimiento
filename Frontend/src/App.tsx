import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";
import Techs from "./components/Techs";
import Login from "./components/Login";
import Principal from "./components/Principal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Principal />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/techs" element={<Techs />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;