import React, { useEffect, useState } from "react";
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
  const [showModalform, setShowModalForm] = useState<boolean>(false)
  const [ordersFiltered, setOrdersFiltered] = useState<OrderCompleted[]>([])
  const [formData, setFormData] = useState({
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    serviceDateTime: ""
  })

  const initialState = {
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    serviceDateTime: ""
  }

  useEffect(() => {
    getOrdersCompleted();
  }, [page, size]);

  const getOrdersCompleted = async () => {
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento-completado?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de mantenimientos completados");
      }

      const data = await response.json();
      setOrdersCompleted(data.responseEntity.body.content);
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

  const handleChangeFilterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmitFilter = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento-completado/filtrar?requestorName=${formData.requestorName}&requestorLastName=${formData.requestorLastName}&area=${formData.area}&idMachine=${formData.idMachine}&serviceDateTime=${formData.serviceDateTime}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(!response) {
        alert("Error al recibir los datos del servidor")
      }
      const data = await response.json()
      setShowModalForm(false)
      setFormData(initialState)
      setOrdersFiltered(data)
    } catch (error) {
      
    }
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
          className="m-3 p-2 border-2 bg-amber-400 hover:bg-amber-600 shadow-[4px_4px_0_#000]"
          onClick={() => setShowModalForm(true)}
        >
          Filtrar Ordenes Completadas
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

      <div>
        {showModalform && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-300 border-4 border-black rounded-lg shadow-[6px_6px_0_#333] p-6 w-full max-w-xl overflow-y-auto max-h-[90vh]">
              <button
                className="text-red-700 my-2 font-bold hover:scale-110"
                onClick={() => setShowModalForm(false)}
              >
                X <span className="text-black">Cerrar</span>
              </button>
              <h2 className="text-xs text-blue-700 mb-4">Formulario para Filtrar</h2>
              <p className="text-xs text-black mb-4">Solo escribe los criterios que quieras filtrar</p>
              <form onSubmit={handleSubmitFilter} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="border-2 border-black p-2 bg-blue-700"
                    placeholder="Nombre del requisitor"
                    onChange={handleChangeFilterForm}
                    value={formData.requestorName}
                    name="requestorName"
                  />
                  <input
                    type="text"
                    className="border-2 border-black p-2 bg-blue-700"
                    placeholder="Apellido del requisitor"
                    onChange={handleChangeFilterForm}
                    value={formData.requestorLastName}
                    name="requestorLastName"
                  />
                  <input
                    type="text"
                    className="border-2 border-black p-2 bg-blue-700"
                    placeholder="Área a filtrar"
                    onChange={handleChangeFilterForm}
                    value={formData.area}
                    name="area"
                  />
                  <input
                    type="text"
                    className="border-2 border-black p-2 bg-blue-700"
                    placeholder="ID del equipo"
                    onChange={handleChangeFilterForm}
                    value={formData.idMachine}
                    name="idMachine"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="border-2 bg-amber-400 hover:bg-amber-600 p-2 shadow-[4px_4px_0_#000]"
                  >
                    Filtrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
