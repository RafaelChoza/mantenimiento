import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md p-4 rounded-lg mb-6 flex flex-wrap justify-center gap-4">
      <Link
        to="/mantenimiento"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition block sm:inline-block"
      >
        🏠 Menú Principal
      </Link>
      <Link
        to="/mantenimiento/orders"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition block sm:inline-block"
      >
        📜 Órdenes Abiertas
      </Link>
      <Link
        to="/mantenimiento/create-area"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition block sm:inline-block"
      >
        🏢 Crear Área
      </Link>
      <Link
        to="/mantenimiento/create-order"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition block sm:inline-block"
      >
        🏢 Crear Orden
      </Link>
      <Link
        to="/mantenimiento/area-list"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition block sm:inline-block"
      >
        📋 Lista de Áreas
      </Link>
      <Link
        to="/mantenimiento/create-tech"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition block sm:inline-block"
      >
        🔧 Crear Técnico
      </Link>
      <Link
        to="/mantenimiento/tech-list"
        className="text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition block sm:inline-block"
      >
        👨‍🔧 Lista de Técnicos
      </Link>
    </nav>
  );
}
