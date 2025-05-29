import { useEffect, useState } from "react";
import type { OrderCompleted } from "../types";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function OrdersCompleted() {
  const [ordersCompleted, setOrdersCompleted] = useState<OrderCompleted[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrdersCompleted();
  }, []);

  const getOrdersCompleted = async () => {
    try {
      const response = await fetch("http://localhost:8080/mantenimiento-completado", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos de mantenimientos completados");
      }
      const data = await response.json();
      setOrdersCompleted(data.responseEntity.body);
    } catch (error) {
      console.error("Error en el servidor al querer obtener los datos");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <Menu />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-6xl mx-auto rounded-lg">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🛠️ MANTENIMIENTOS COMPLETADOS
        </h1>

        {!ordersCompleted || ordersCompleted.length === 0 ? (
          <p className="text-center text-black text-xs font-bold">CARGANDO...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersCompleted.map((order) => (
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
      </div>
    </div>
  );
}
