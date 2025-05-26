import { useEffect, useState } from "react";
import type { OrderCompleted } from "../types";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function OrdersCompleted() {
  const [ordersCompleted, setOrdersCompleted] = useState<OrderCompleted[] | null>([]);

  useEffect(() => {
    getOrdersCompleted();
  }, []);

  const navigate = useNavigate()

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
      console.log(data);
      setOrdersCompleted(data.responseEntity.body);
    } catch (error) {
      console.error("Error en el servidor al querer obtener los datos");
    }
  };

  return (
    <div className="container mx-auto p-6 relative">
      <Menu />
      <h1
        className="text-2xl mb-6 text-center text-blue-900 drop-shadow-lg"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Mantenimientos Completados
      </h1>

      {!ordersCompleted || ordersCompleted.length === 0 ? (
        <p
          className="text-center text-black text-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Cargando...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordersCompleted.map((order) => (
            <div
              key={order.id}
              className="bg-yellow-200 border-4 border-black shadow-[4px_4px_0_#333] p-4 text-xs text-black"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <p><strong>🛠️ Orden:</strong> {order.id}</p>
              <p><strong>📅 Area:</strong> {order.area}</p>
              <p><strong>📝 Descripción:</strong> {order.serviceDescription}</p>
              <button 
                className=" p-2 border-2 bg-cyan-600 hover:bg-cyan-400" 
                onClick={() => navigate(`/detalle/${order.id}`)}
              >Detalle</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
