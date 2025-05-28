import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";

export default function Menu() {
  const { role } = useAuth();

  const allLinks = [
    { to: "/mantenimiento", label: "🏠 Menú Principal" },
    { to: "/mantenimiento/orders", label: "📜 Órdenes Abiertas" },
    { to: "/mantenimiento/create-order", label: "🛠️ Crear Orden" },
    { to: "/mantenimiento-completado", label: "✅ Manttos Completados" },
    { to: "/mantenimiento/create-tech", label: "🔧 Crear Técnico" },
    { to: "/mantenimiento/tech-list", label: "👨‍🔧 Lista de Técnicos" },
    { to: "/mantenimiento/create-area", label: "🏢 Crear Área" },
    { to: "/mantenimiento/area-list", label: "📋 Lista de Áreas" },
    { to: "/mantenimiento/users", label: "👨 Lista de Usuarios" },
  ];

  const visibleLinks = role === "USER" ? allLinks.slice(0, 4) : role === "SUPERUSER" ? allLinks : allLinks.slice(0,6);

  return (
    <nav className="bg-yellow-300 border-4 border-black shadow-[6px_6px_0_#333] p-4 rounded-lg mb-6 flex flex-wrap justify-center gap-4">
      {visibleLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="bg-white border-2 border-black text-black px-4 py-2 text-xs hover:bg-yellow-400 transition-all shadow-[3px_3px_0_#333]"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {link.label}
        </Link>
      ))}
      <Logout />
    </nav>
  );
}
