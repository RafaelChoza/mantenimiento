import React, { useEffect, useState } from "react";
import type { OrderCompleted } from "../types";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function OrdersCompleted() {
  const [ordersCompleted, setOrdersCompleted] = useState<OrderCompleted[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const [showModalform, setShowModalForm] = useState<boolean>(false);
  const [ordersFiltered, setOrdersFiltered] = useState<OrderCompleted[]>([]);
  const [formData, setFormData] = useState({
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    serviceDateTime: "",
  });

  const initialState = {
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    serviceDateTime: "",
  };

  useEffect(() => {
    getOrdersCompleted();
  }, [page, size]);

  const getOrdersCompleted = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/mantenimiento-completado?page=${page}&size=${size}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

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

  const handleChangeFilterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lso parametros enviados son: ", formData)
    try {
      const response = await fetch(
        `http://localhost:8080/mantenimiento-completado/filtrar?requestorName=${formData.requestorName}&requestorLastName=${formData.requestorLastName}&area=${formData.area}&idMachine=${formData.idMachine}&serviceDateTime=${formData.serviceDateTime}&page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response) {
        alert("Error al recibir los datos del servidor");
      }
      const data = await response.json();
      console.log(data)
      setShowModalForm(false);
      setFormData(initialState);
      setOrdersFiltered(data.responseEntity.body.content);
    } catch (error) {
      console.error("Error al filtrar los datos");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <Menu />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-5xl mx-auto rounded-lg">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🧾 MANTENIMIENTOS COMPLETADOS
        </h1>

        <div className="mb-4 flex justify-end space-x-2">
          <button
            onClick={() => setShowModalForm(true)}
            className="bg-green-500 hover:bg-green-400 text-white text-xs px-4 py-1 border-2 border-black shadow-[2px_2px_0_#000]"
          >
            🔍 FILTRAR
          </button>
          {ordersFiltered.length > 0 && (
            <button
              onClick={() => setOrdersFiltered([])}
              className="bg-red-500 hover:bg-red-400 text-white text-xs px-4 py-1 border-2 border-black shadow-[2px_2px_0_#000]"
            >
              ❌ QUITAR FILTRO
            </button>
          )}
        </div>

        {!ordersCompleted || ordersCompleted.length === 0 ? (
          <div className="flex justify-center items-center h-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-black"></div>
            <p className="ml-2 text-black text-xs font-bold">CARGANDO...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(ordersFiltered.length > 0 ? ordersFiltered : ordersCompleted).map((order) => (
              <div
                key={order.id}
                className="bg-white p-3 border-4 border-black rounded shadow-[4px_4px_0_#000] text-black"
              >
                <h2 className="text-xs font-bold text-blue-700 mb-2">
                  🛠️ ORDEN {order.id}
                </h2>
                <div className="grid grid-cols-1 text-[10px] gap-1">
                  <p className="bg-yellow-50 border border-black p-1 rounded">
                    <strong>📍 ÁREA:</strong> {order.area}
                  </p>
                  <p className="bg-yellow-50 border border-black p-1 rounded">
                    <strong>📝 DESCRIPCIÓN:</strong> {order.serviceDescription}
                  </p>
                </div>
                <div className="mt-2 flex justify-center">
                  <button
                    className="bg-cyan-700 hover:bg-cyan-400 border-2 border-black text-white text-xs px-4 py-1 shadow-[2px_2px_0_#000]"
                    onClick={() => navigate(`/detalle/${order.id}`)}
                  >
                    DETALLE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {ordersCompleted.length > 0 && ordersFiltered.length === 0 && (
          <div className="flex justify-center items-center mt-6 space-x-4 text-sm">
            <button
              className="px-3 py-1 bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0_#000] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              ⬅️ Anterior
            </button>
            <span className="text-black font-bold">
              Página {page + 1} de {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0_#000] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
            >
              Siguiente ➡️
            </button>
          </div>
        )}
      </div>

      {showModalform && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 border-4 border-black rounded shadow-[4px_4px_0_#000] w-full max-w-md text-black">
            <h2 className="text-xs font-bold mb-4 text-center">🔍 FILTRAR MANTENIMIENTOS</h2>
            <form onSubmit={handleSubmitFilter} className="space-y-3 text-xs">
              <input
                type="text"
                name="requestorName"
                value={formData.requestorName}
                onChange={handleChangeFilterForm}
                placeholder="Nombre del solicitante"
                className="w-full p-1 border border-black rounded"
              />
              <input
                type="text"
                name="requestorLastName"
                value={formData.requestorLastName}
                onChange={handleChangeFilterForm}
                placeholder="Apellido del solicitante"
                className="w-full p-1 border border-black rounded"
              />
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChangeFilterForm}
                placeholder="Área"
                className="w-full p-1 border border-black rounded"
              />
              <input
                type="text"
                name="idMachine"
                value={formData.idMachine}
                onChange={handleChangeFilterForm}
                placeholder="ID Máquina"
                className="w-full p-1 border border-black rounded"
              />
              <input
                type="datetime-local"
                name="serviceDateTime"
                value={formData.serviceDateTime}
                onChange={handleChangeFilterForm}
                className="w-full p-1 border border-black rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModalForm(false);
                    setFormData(initialState);
                  }}
                  className="px-3 py-1 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0_#000]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white border-2 border-black shadow-[2px_2px_0_#000]"
                >
                  Aplicar Filtro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
