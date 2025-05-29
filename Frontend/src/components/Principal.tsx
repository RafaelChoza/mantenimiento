import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";

export default function Principal() {
  const { role, username } = useAuth();

  const navigate = useNavigate()

  const buttonClass =
    "relative flex items-center justify-center h-20 bg-yellow-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center";
  const fontStyle = { fontFamily: '"Press Start 2P", cursive' };

  return (
    <div className="container mx-auto p-6">
      <div
        className="absolute top-4 right-4 sm:right-6 bg-white border-4 border-black shadow-[4px_4px_0_#333] px-3 py-2 text-[10px] sm:text-xs text-black text-right z-10 max-w-[80vw] sm:max-w-none"
        style={fontStyle}
      >
        {username && <div className="truncate">👤 {username}</div>}
        {role && <div className="truncate">🔐 {role}</div>}
        <div>
          <button className="text-blue-600 underline hover:scale-105 cursor-pointer" onClick={() => navigate("change-password")}>
            Cambiar Contraseña
          </button>
        </div>
        <div className="mt-2">
          <Logout />
        </div>
      </div>

      <h1
        className="text-3xl mb-10 text-center text-blue-900 drop-shadow-lg"
        style={fontStyle}
      >
        Menú Principal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <Link to="/mantenimiento/orders" className={buttonClass} style={fontStyle}>
          Mantenimiento Abiertos
          <div className="absolute top-2 right-4 text-black text-lg">🔧</div>
        </Link>

        <Link to="/mantenimiento/create-order" className={buttonClass.replace("bg-yellow-400", "bg-green-400")} style={fontStyle}>
          Generar Orden de Mantenimiento
          <div className="absolute top-2 right-4 text-black text-lg">📝</div>
        </Link>

        <Link to="/mantenimiento-completado" className={buttonClass.replace("bg-yellow-400", "bg-fuchsia-700")} style={fontStyle}>
          Mantenimientos Cerrados
          <div className="absolute top-2 right-4 text-black text-lg">📍</div>
        </Link>

        {role !== "USER" && (
          <>
            <Link to="/mantenimiento/create-tech" className={buttonClass.replace("bg-yellow-400", "bg-red-400")} style={fontStyle}>
              Agregar Técnico
              <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
            </Link>

            <Link to="/mantenimiento/tech-list" className={buttonClass.replace("bg-yellow-400", "bg-sky-400")} style={fontStyle}>
              Lista de Técnicos
              <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
            </Link>

            {role === "SUPERUSER" && (
              <div>
                <Link to="/mantenimiento/create-area" className={buttonClass.replace("bg-yellow-400", "bg-purple-400")} style={fontStyle}>
                  Agregar Área
                  <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                </Link>

                <Link to="/mantenimiento/area-list" className={buttonClass.replace("bg-yellow-400", "bg-teal-400")} style={fontStyle}>
                  Lista de Áreas
                  <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                </Link>
                <Link to="/mantenimiento/users" className={buttonClass.replace("bg-yellow-400", "bg-orange-600")} style={fontStyle}>
                  Lista de Usuarios
                  <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                </Link>
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}
