import { useEffect, useState } from "react";
import type { OrderCompleted } from "../types";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function OrdersCompleted() {
  const [ordersCompleted, setOrdersCompleted] = useState<OrderCompleted[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getOrdersCompleted();
  }, [page, size]);

  const getOrdersCompleted = async () => {
    console.log(page, size)
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento-completado?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de mantenimientos completados");
      }

      const data = await response.json();
      setOrdersCompleted(data.responseEntity.body.content);
      console.log(data.responseEntity.body.totalPages)
      setTotalPages(data.responseEntity.body.totalPages);
    } catch (error) {
      console.error("Error en el servidor al querer obtener los datos");
    }
  };

  const filteredOrders = ordersCompleted?.filter(order => {
    const description = order.serviceDescription ?? "";
    const area = order.area ?? "";
    const id = order.id?.toString() ?? "";

    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      description.toLowerCase().includes(lowerSearchTerm) ||
      area.toLowerCase().includes(lowerSearchTerm) ||
      id.includes(lowerSearchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <Menu />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-6xl mx-auto rounded-lg">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🛠️ MANTENIMIENTOS COMPLETADOS
        </h1>

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por área o descripción..."
          className="mb-6 p-2 w-full text-black border-2 border-black rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {!ordersCompleted || ordersCompleted.length === 0 ? (
          <p className="text-center text-black text-xs font-bold">CARGANDO...</p>
        ) : filteredOrders && filteredOrders.length === 0 ? (
          <p className="text-center text-black text-xs font-bold">No se encontraron resultados</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders?.map((order) => (
              <div
                key={order.id}
                className="bg-white border-4 border-black shadow-[4px_4px_0_#000] p-4 text-xs text-black rounded"
              >
                <p><strong>🆔 ORDEN:</strong> {order.id}</p>
                <p><strong>🏢 ÁREA:</strong> {order.area}</p>
                <p><strong>📝 DESCRIPCIÓN:</strong> {order.serviceDescription}</p>
                <button
                  className="mt-2 bg-cyan-400 hover:bg-cyan-300 border-2 border-black px-3 py-1 text-xs shadow-[2px_2px_0_#000]"
                  onClick={() => navigate(`/detalle/${order.id}`)}
                >
                  DETALLE
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Controles de paginación */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black border-2 border-black"
          >
            ⬅️ Anterior
          </button>
          <span>Página {page + 1} de {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black border-2 border-black"
          >
            ➡️ Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
