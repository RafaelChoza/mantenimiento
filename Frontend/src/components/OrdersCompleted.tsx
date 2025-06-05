import { useEffect, useState } from "react";
import type { OrderCompleted } from "../types";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function OrdersCompleted() {
  const [ordersCompleted, setOrdersCompleted] = useState<OrderCompleted[] | null>([]);
  const [searchTerm, setSearchTerm] = useState("");  // <-- estado para la búsqueda
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

  // Filtrar las órdenes en base a la búsqueda (buscando en descripción y área)
  const filteredOrders = ordersCompleted?.filter(order => {
    const description = order.serviceDescription ?? "";
    const area = order.area ?? "";
    const id = order.id?.toString() ?? "";

    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      description.toLowerCase().includes(lowerSearchTerm) ||
      area.toLowerCase().includes(lowerSearchTerm) ||
      id.includes(lowerSearchTerm)  // id es string, comparar directamente
    );
  });

  function convertToCSV(data: OrderCompleted[]) {
    if (!data.length) return "";

    // Extraer los encabezados (keys) del primer objeto
    const headers = Object.keys(data[0]);

    // Crear filas CSV: encabezados + datos
    const csvRows = [
      headers.join(","), // encabezados separados por coma
      ...data.map(row =>
        headers.map(fieldName => {
          // Asegurarse que cada campo se convierta a string y escape comillas dobles
          const escaped = String(row[fieldName as keyof OrderCompleted] ?? "")
            .replace(/"/g, '""'); // escapar comillas dobles para CSV
          return `"${escaped}"`; // poner entre comillas dobles
        }).join(",")
      )
    ];

    return csvRows.join("\r\n");
  }

  function downloadCSV(data: OrderCompleted[], filename = "ordenes_completadas.csv") {
    const csv = convertToCSV(data);
    if (!csv) {
      alert("No hay datos para descargar");
      return;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }



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

        <button
          className="mb-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => downloadCSV(filteredOrders ?? [])}
        >
          Descargar CSV
        </button>


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
      </div>
    </div>
  );
}
