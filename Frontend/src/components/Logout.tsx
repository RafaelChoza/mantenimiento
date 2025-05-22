import { useNavigate } from "react-router-dom";

export default function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


    return (
        <div>
            <button 
                onClick={handleLogout}
                className="bg-red-700 text-white font-bold p-2 rounded-2xl hover:scale-105"
            >Cerrar Sesion</button>
        </div>
    )
}
