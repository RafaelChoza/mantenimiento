import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Principal() {
  return (
    
    <div className="container mx-auto p-6">
      <Logout />
      <h1 className="text-5xl font-extrabold mb-10 text-center text-blue-700 drop-shadow-lg">
        Menú Principal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <Link
          to="/mantenimiento/orders"
          className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Mantenimiento Abiertos
          <div className="absolute top-2 right-4 text-white text-lg">🔧</div>
        </Link>
        <Link
          to="/mantenimiento/create-order"
          className="relative flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Generar Orden de Mantenimiento
          <div className="absolute top-2 right-4 text-white text-lg">📝</div>
        </Link>
        <Link
          to="/mantenimiento/create-tech"
          className="relative flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Agregar Técnico
          <div className="absolute top-2 right-4 text-white text-lg">👨‍🔧</div>
        </Link>
        <Link
          to="/mantenimiento/tech-list"
          className="relative flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-700 hover:to-sky-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Lista de Técnicos
          <div className="absolute top-2 right-4 text-white text-lg">👨‍🔧</div>
        </Link>
        <Link
          to="/mantenimiento/create-area"
          className="relative flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Agregar Área
          <div className="absolute top-2 right-4 text-white text-lg">📍</div>
        </Link>
        <Link
          to="/mantenimiento/area-list"
          className="relative flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-700 hover:to-teal-900 text-white font-bold text-2xl p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 text-center"
        >
          Lista de Áreas
          <div className="absolute top-2 right-4 text-white text-lg">📍</div>
        </Link>
      </div>
    </div>
  );
}
