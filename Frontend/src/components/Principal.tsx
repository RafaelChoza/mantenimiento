import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { MyToken } from "../types";

export default function Principal() {

  const [role, setRole] = useState<MyToken['role'] | null>(null)
  const [username, setUsername] = useState<MyToken['sub'] | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode<MyToken>(token)
      if (decoded && decoded.role || decoded && decoded.sub) {
        setRole(decoded.role)
        setUsername(decoded.sub)
      }
    }
  }, [])

  useEffect(() => {
    console.log(role)
    console.log(username)
  })

  return (
    <div className="container mx-auto p-6">


      <div
        className="absolute top-4 right-4 sm:right-6 bg-white border-4 border-black shadow-[4px_4px_0_#333] px-3 py-2 text-[10px] sm:text-xs text-black text-right z-10 max-w-[80vw] sm:max-w-none"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        {username && <div className="truncate">👤 {username}</div>}
        {role && <div className="truncate">🔐 {role}</div>}
        <div className="mt-2">
          <Logout />
        </div>
      </div>



      <h1
        className="text-3xl mb-10 text-center text-blue-900 drop-shadow-lg"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Menú Principal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <Link
          to="/mantenimiento/orders"
          className="relative flex items-center justify-center bg-yellow-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Mantenimiento Abiertos
          <div className="absolute top-2 right-4 text-black text-lg">🔧</div>
        </Link>

        <Link
          to="/mantenimiento/create-order"
          className="relative flex items-center justify-center bg-green-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Generar Orden de Mantenimiento
          <div className="absolute top-2 right-4 text-black text-lg">📝</div>
        </Link>

        <Link
          to="/mantenimiento/create-tech"
          className="relative flex items-center justify-center bg-red-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Agregar Técnico
          <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
        </Link>

        <Link
          to="/mantenimiento/tech-list"
          className="relative flex items-center justify-center bg-sky-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Lista de Técnicos
          <div className="absolute top-2 right-4 text-black text-lg">👨‍🔧</div>
        </Link>

        <Link
          to="/mantenimiento/create-area"
          className="relative flex items-center justify-center bg-purple-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Agregar Área
          <div className="absolute top-2 right-4 text-black text-lg">📍</div>
        </Link>

        <Link
          to="/mantenimiento/area-list"
          className="relative flex items-center justify-center bg-teal-400 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Lista de Áreas
          <div className="absolute top-2 right-4 text-black text-lg">📍</div>
        </Link>
        <Link
          to="/mantenimiento/users"
          className="relative flex items-center justify-center bg-orange-600 text-black text-xs p-6 border-4 border-black shadow-[4px_4px_0_#333] hover:shadow-[2px_2px_0_#333] transition-transform duration-200 transform hover:scale-105 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Lista de Usuarios
          <div className="absolute top-2 right-4 text-black text-lg">📍</div>
        </Link>
      </div>
    </div>
  );
}
