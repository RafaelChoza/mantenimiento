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
        className="bg-red-400 cursor-pointer border-4 border-black text-black px-4 py-2 text-xs hover:bg-red-500 transition-all shadow-[4px_4px_0_#333]"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        🚪 Cerrar Sesión
      </button>
    </div>
  );
}
