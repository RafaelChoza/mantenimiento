import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";

export default function Principal() {
  const { role, username } = useAuth();
  const navigate = useNavigate();

  const buttonClass =
    "relative flex items-center justify-center h-20 bg-gray-300 text-black text-xs p-6 border-2 border-black shadow-[2px_2px_0_#000] hover:bg-yellow-300 hover:shadow-[1px_1px_0_#000] transition-transform duration-200 transform hover:scale-105 text-center font-mono";

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <div className="absolute top-4 right-4 sm:right-6 bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] px-3 py-2 text-[10px] sm:text-xs text-right z-10 max-w-[80vw] sm:max-w-none">
        {username && <div className="truncate">👤 {username}</div>}
        {role && <div className="truncate">🔐 {role}</div>}
        <div>
          <button
            className="text-blue-800 underline hover:scale-105 cursor-pointer"
            onClick={() => navigate("change-password")}
          >
            Cambiar Contraseña
          </button>
        </div>
        <div className="mt-2">
          <Logout />
        </div>
      </div>

      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl mb-10 text-center text-black font-bold">
          MENÚ PRINCIPAL
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <Link to="/mantenimiento/orders" className={buttonClass}>
            Mantenimiento Abiertos
            <div className="absolute top-2 right-4 text-black text-lg">🔧</div>
          </Link>

          <Link
            to="/mantenimiento/create-order"
            className={buttonClass.replace("bg-gray-300", "bg-green-300")}
          >
            Generar Orden de Mantenimiento
            <div className="absolute top-2 right-4 text-black text-lg">📝</div>
          </Link>

          <Link
            to="/mantenimiento-completado"
            className={buttonClass.replace("bg-gray-300", "bg-fuchsia-500")}
          >
            Mantenimientos Cerrados
            <div className="absolute top-2 right-4 text-black text-lg">📍</div>
          </Link>

          {role !== "USER" && (
            <>
              <Link
                to="/mantenimiento/create-tech"
                className={buttonClass.replace("bg-gray-300", "bg-red-300")}
              >
                Agregar Técnico
                <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
              </Link>

              <Link
                to="/mantenimiento/tech-list"
                className={buttonClass.replace("bg-gray-300", "bg-sky-300")}
              >
                Lista de Técnicos
                <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
              </Link>

              {role === "SUPERUSER" && (
                <>
                  <Link
                    to="/mantenimiento/create-area"
                    className={buttonClass.replace("bg-gray-300", "bg-purple-300")}
                  >
                    Agregar Área
                    <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                  </Link>

                  <Link
                    to="/mantenimiento/area-list"
                    className={buttonClass.replace("bg-gray-300", "bg-teal-300")}
                  >
                    Lista de Áreas
                    <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                  </Link>

                  <Link
                    to="/mantenimiento/users"
                    className={buttonClass.replace("bg-gray-300", "bg-orange-300")}
                  >
                    Lista de Usuarios
                    <div className="absolute top-2 right-4 text-black text-lg">📍</div>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
