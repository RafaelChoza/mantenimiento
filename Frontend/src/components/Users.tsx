import { useEffect, useState } from "react";
import type { RegisterUser } from "../types";
import Menu from "./Menu";

export default function Users() {
  const [users, setUsers] = useState<RegisterUser[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setCargando(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/mantenimiento/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Datos obtenidos:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mx-auto p-6 relative">
      <Menu />
      <h1
        className="text-2xl mb-6 text-center text-blue-900 drop-shadow-lg"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Lista de Usuarios
      </h1>

      {cargando ? (
        <p
          className="text-center text-black text-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Cargando...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-green-200 border-4 border-black shadow-[4px_4px_0_#333] p-4 text-xs text-black"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <p><strong>👤 Usuario:</strong> {user.username}</p>
              <p><strong>📛 Nombre:</strong> {user.firstname} {user.lastname}</p>
              <p><strong>🌍 País:</strong> {user.country}</p>
              <p><strong>🛡️ Rol:</strong> {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
