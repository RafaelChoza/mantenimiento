import { useEffect, useState } from "react";
import type { Area, MantenimientoOrden, Tech } from "../types";
import Menu from "../components/Menu"
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

export default function Orders() {
  const { role, username } = useAuth();
  const [orders, setOrders] = useState<MantenimientoOrden[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingOrder, setEditingOrder] = useState<MantenimientoOrden | null>(null)
  const [areas, setAreas] = useState<Area[]>([])
  const [techs, setTechs] = useState<Tech[]>([])
  const [myOrders, setMyOrders] = useState<MantenimientoOrden[]>([]);
  const [showMyOrders, setShowMyOrders] = useState(false)
  const [showOrders, setShowOrders] = useState(true)

  useEffect(() => {
    getOrders();
    getAreas();
    getTechs();
    getMyOrders();
  }, [])

  const handleEdit = (order: MantenimientoOrden) => {
    console.log("Editar Orden de mantenimiento")
    setEditingOrder(order)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;

    let value: string | boolean = "";

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    if (editingOrder) {
      setEditingOrder({
        ...editingOrder,
        [name]: value,
      });
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento/${editingOrder?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editingOrder)
      })

      const data = await response.json()

      if (data.success && editingOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === editingOrder.id ? editingOrder : order
          )
        );
        console.log("Orden actualizada");
        toast.success("La orden fue actualizada correctamente");
        setEditingOrder(null)
      } else {
        console.log("Error al querer editar al técnico");
        toast.error("Error al querer editar al técnico");
      }


    } catch (error) {
      console.error("Error de red al querer editar al técnico")
    }
  }

  const getOrders = async () => {
    setCargando(true);
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrders(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    } finally {
      setCargando(false);
    }
  };

  const getAreas = async () => {
    setCargando(true)
    try {
      const response = await fetch("http://localhost:8080/areas", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json()
      setAreas(data.responseEntity.body)
    } catch (error) {
      console.error("Error al obtener los datos", error)
    } finally {
      setCargando(false)
    }
  }

  const getTechs = async () => {
    setCargando(true)
    try {
      const response = await fetch("http://localhost:8080/tecnicos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json()
      setTechs(data.responseEntity.body)
    } catch (error) {
      console.error("Error al obtener los datos", error)
    } finally {
      setCargando(false)
    }
  }

  const manttoCompletar = async (id: MantenimientoOrden['id']) => {

    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro de marcar como COMPLETADA?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, COMPLETADA",
      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) return;

    if (id === undefined) {
      console.error("ID no definido");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento/${id}/completado`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (!response.ok) { throw new Error("Error al enviar los datos") };
      setOrders((prev) => prev.filter((mantto) => mantto.id != id))
    } catch (error) {
      console.error("Error", error)
    }
  }

  const filtrarOrdenes = () => {
    if (username) {
      const tecInfo = techs.filter((tech) => tech.correo === username);
      console.log("Info del técnico:", tecInfo);

      if (tecInfo.length > 0) {
        const nombreTec = tecInfo[0];
        const nombreApellido = `${nombreTec.nombreTecnico} ${nombreTec.apellidoTecnico}`;
        console.log("Nombre completo del técnico:", nombreApellido);

        const asignadas = orders.filter(order => order.personnelAsigned === nombreApellido);
        setOrders(asignadas);
      } else {
        setOrders([])
        console.warn("No se encontró un técnico con ese correo.");
        return
      }
    }
  }

  const getMyOrders = async () => {
    setCargando(true);
    try {

      if (!username) {
        console.error("Username es null o undefined.");
        return;
      }
      const response = await fetch("http://localhost:8080/mantenimiento/mis-ordenes", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "username": username
        }
      });
      if (!response.ok) {
        alert("Error al recibir las ordenes del usuario")
      }
      const data = await response.json()
      setMyOrders(data.responseEntity.body)
      setCargando(false)
      setShowOrders(false)
    } catch (error) {
      throw new Error("Error en el sevidor al querer recibir los datos")
    }
  }


  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

          <div className="bg-gray-300 border-4 border-black rounded-lg shadow-[6px_6px_0_#333] p-6 w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <button
              className="text-red-700 my-2 font-bold hover:scale-110"
              onClick={() => setEditingOrder(null)}
            >X <span className="text-black">Cerrar</span></button>
            <h2
              className="text-xs text-blue-700 mb-4"

            >
              Editar Orden #{editingOrder.id}
            </h2>
            <form onSubmit={handleUpdateOrder} className="space-y-10">
              {(role === "USER" || role === "ADMIN" || role === "SUPERUSER") && (
                <div>
                  {/* Sección Solicitante */}
                  <section className="border-4 border-black bg-gray-400 p-6 rounded shadow-[4px_4px_0_#333]">
                    <h2
                      className="text-xs text-blue-700 mb-4"

                    >
                      Exclusivo Solicitante
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <input
                        className="border-2 border-black p-2 bg-blue-700"
                        type="text"
                        name="requestorName"
                        value={editingOrder.requestorName}
                        placeholder="Nombre del solicitante"
                        onChange={handleInputChange}
                        disabled={role === "ADMIN"}
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700"
                        type="text"
                        name="requestorLastName"
                        value={editingOrder.requestorLastName}
                        placeholder="Apellido del solicitante"
                        onChange={handleInputChange}
                        disabled={role === "ADMIN"}
                      />
                      <select
                        className="border-2 border-black p-2 bg-blue-700"
                        name="area"
                        value={editingOrder.area}
                        onChange={handleInputChange}
                        disabled={role === "ADMIN"}
                      >
                        <option value="" disabled>Seleccionar Área</option>
                        {areas.map((area) => (
                          <option key={area.id} value={area.areaName}>
                            {area.areaName}
                          </option>
                        ))}
                      </select>
                      <input
                        className="border-2 border-black p-2 bg-blue-700"
                        type="text"
                        name="idMachine"
                        value={editingOrder.idMachine}
                        placeholder="ID Máquina"
                        onChange={handleInputChange}
                        disabled={role === "ADMIN"}
                      />
                      <label className="flex items-center space-x-2 col-span-2">
                        <input
                          type="checkbox"
                          name="stoppedMachine"
                          checked={!!editingOrder?.stoppedMachine}
                          onChange={handleInputChange}
                          disabled={role === "ADMIN"}
                        />
                        <span>Máquina detenida</span>
                      </label>
                      <label className="flex items-center space-x-2 col-span-2">
                        <input
                          type="checkbox"
                          name="attentionRequired"
                          checked={!!editingOrder?.attentionRequired}
                          onChange={handleInputChange}
                          disabled={role === "ADMIN"}
                        />
                        <span>Requiere atención inmediata</span>
                      </label>
                      <textarea
                        className="border-2 border-black p-2 bg-blue-700   col-span-2"
                        name="serviceDescription"
                        value={editingOrder.serviceDescription}
                        placeholder="Descripción del servicio"
                        onChange={handleInputChange}
                        disabled={role === "ADMIN"}
                      />
                    </div>
                  </section>
                </div>
              )}


              {role !== "USER" && (
                <div>
                  {/* Sección Supervisor */}
                  <section className="border-4 border-black bg-gray-400 p-6 rounded shadow-[4px_4px_0_#333]">
                    <h2
                      className="text-xs text-green-700 mb-4"

                    >
                      Exclusivo Supervisor de Mantenimiento
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="date"
                        name="receptionDate"
                        value={editingOrder.receptionDate}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="time"
                        name="receptionTime"
                        value={editingOrder.receptionTime}
                        placeholder="Hora de recepción"
                        onChange={handleInputChange}
                        required
                      />
                      <select
                        className="border-2 border-black p-2 bg-blue-700 "
                        name="personnelAsigned"
                        value={editingOrder.personnelAsigned}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          Seleccionar Técnico
                        </option>
                        {techs.map((tech) => (
                          <option key={tech.idTecnico} value={`${tech.nombreTecnico} ${tech.apellidoTecnico}`}>
                            {tech.nombreTecnico} - {tech.apellidoTecnico}
                          </option>
                        ))}
                      </select>
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="date"
                        name="programmedDate"
                        value={editingOrder.programmedDate}
                        onChange={handleInputChange}
                        required
                      />
                      <textarea
                        className="border-2 border-black p-2 bg-blue-700  col-span-2"
                        name="observations"
                        value={editingOrder.observations}
                        placeholder="Observaciones encontradas"
                        onChange={handleInputChange}
                        required
                      />
                      <textarea
                        className="border-2 border-black p-2 bg-blue-700  col-span-2"
                        name="problemCauseSolution"
                        value={editingOrder.problemCauseSolution}
                        placeholder="Problema, causa y solución"
                        onChange={handleInputChange}
                        required
                      />
                      <label className="flex items-center space-x-2">
                        <span>¿Equipo para desecho?</span>
                        <input
                          type="checkbox"
                          checked={editingOrder?.equipmentDisposal}
                          name="equipmentDisposal"
                          onChange={handleInputChange}
                        />
                      </label>
                      <label className="flex items-center space-x-2">
                        <span>¿Requiere aviso a calibración y MP?</span>
                        <input
                          type="checkbox"
                          name="notificateCalibration"
                          checked={editingOrder?.notificateCalibration}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </section>
                  {/* Sección Técnico */}
                  <section className="border-4 border-black bg-gray-400 p-6 rounded shadow-[4px_4px_0_#333]">
                    <h2
                      className="text-xs text-purple-700 mb-4"
                    >
                      Técnico Asignado
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="number"
                        name="usedParts"
                        value={editingOrder.usedParts}
                        placeholder="Partes usadas"
                        onChange={handleInputChange}
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="text"
                        name="partNumber"
                        value={editingOrder.partNumber}
                        placeholder="Número de parte"
                        onChange={handleInputChange}
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="text"
                        name="descriptionPart"
                        value={editingOrder.descriptionPart}
                        placeholder="Descripción de la parte"
                        onChange={handleInputChange}
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700 "
                        type="text"
                        name="partOrigin"
                        value={editingOrder.partOrigin}
                        placeholder="Origen de la parte"
                        onChange={handleInputChange}
                      />

                      {[
                        { name: "coversInstalled", label: "Cubiertas instaladas" },
                        { name: "interlocksTested", label: "Interlocks probados" },
                        { name: "guardsInstalled", label: "Guardas instaladas" },
                        { name: "completeRevision", label: "Revisión completa del equipo" },
                        { name: "cleanArea", label: "Limpieza del área" },
                        { name: "electricityConnected", label: "Electricidad conectada" },
                        { name: "waterAirGasConnected", label: "Aire, agua y/o gas conectados" },
                        { name: "taggedProperly", label: "Etiquetado y señalización de equipo" },
                      ].map((item) => (
                        <label key={item.name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name={item.name}
                            checked={editingOrder[item.name as keyof typeof editingOrder] as boolean}
                            onChange={handleInputChange}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}

                      <textarea
                        className="border-2 border-black p-2 bg-blue-700 text-white col-span-2"
                        name="comments"
                        value={editingOrder.comments}
                        placeholder="Comentarios"
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        className="border-2 border-black p-2 bg-blue-700 text-white"
                        type="date"
                        name="closeDate"
                        value={editingOrder.closeDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </section>
                </div>
              )}



              <button
                type="submit"
                className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#333]"

              >
                Enviar Cambios
              </button>
            </form>

          </div>
        </div>
      )}


      <Menu />
      <h1
        className="text-center text-yellow-300 text-sm mb-6"
      >
        📌 Órdenes de Mantenimiento
      </h1>

      <button
        onClick={filtrarOrdenes}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition hover:scale-105 mb-4"
      >
        Ver órdenes asignadas para {username}
      </button>

      <button
        onClick={() => {
          getMyOrders();
          setShowMyOrders(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50 mx-3"
        disabled={cargando}
      >
        {cargando ? "Cargando..." : "Obtener mis órdenes creadas"}
      </button>

      <button
        onClick={() => {
          setShowOrders(true);
        }}
        className="mb-4 px-4 py-2 bg-fuchsia-600 text-white rounded shadow hover:bg-fuchsia-700 disabled:opacity-50 mx-3"
        disabled={cargando}
      >
        {cargando ? "Cargando..." : "Ver todas las ordenes"}
      </button>


      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p className="ml-2 text-blue-600 text-xs">Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {showMyOrders && (
            myOrders.length === 0 ? (
              <h2>No tienes órdenes creadas</h2>
            ) : (
              myOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-yellow-50 border-4 border-black p-4 rounded shadow-[4px_4px_0_#333] transition-all"
                >
                  <h2 className="text-xs text-blue-700 mb-2 flex items-center">
                    🔧 Orden #{order.id}
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                      order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"
                    }`}>
                      {order.attentionRequired ? "Urgente" : "Normal"}
                    </span>
                  </h2>
                  <hr className="mb-2 border-black" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-1 text-xs text-black">
                    {Object.entries(order).map(([key, value]) => (
                      <p
                        key={key}
                        className="bg-white border border-black px-1 rounded shadow-sm"
                      >
                        <strong className="text-blue-600">
                          {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                        </strong>{" "}
                        {value?.toString() || "N/A"}
                      </p>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={() => handleEdit(order)}
                      className={`bg-blue-400 border-4 border-black text-black px-3 py-2 text-xs hover:bg-blue-500 transition-all shadow-[3px_3px_0_#333] ${
                        role !== "SUPERUSER" && order.username !== username
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={role !== "SUPERUSER" && order.username !== username}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => manttoCompletar(order.id)}
                      className={`bg-green-400 border-4 border-black text-black px-3 py-2 text-xs transition-all shadow-[3px_3px_0_#333] ${
                        role === "USER"
                          ? "cursor-not-allowed opacity-50 bg-green-300"
                          : "hover:bg-green-500"
                      }`}
                      disabled={role === "USER"}
                    >
                      Completado
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {/* Render global de órdenes (orders) si lo necesitas */}
          {showOrders && (
            orders.map(order => (
            <div
              key={order.id}
              className="bg-yellow-50 border-4 border-black p-4 rounded shadow-[4px_4px_0_#333] transition-all"
            >
              <h2 className="text-xs text-blue-700 mb-2 flex items-center">
                🔧 Orden #{order.id}
                <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                  order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"
                }`}>
                  {order.attentionRequired ? "Urgente" : "Normal"}
                </span>
              </h2>
              <hr className="mb-2 border-black" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-1 text-xs text-black">
                {Object.entries(order).map(([key, value]) => (
                  <p
                    key={key}
                    className="bg-white border border-black px-1 rounded shadow-sm"
                  >
                    <strong className="text-blue-600">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    </strong>{" "}
                    {value?.toString() || "N/A"}
                  </p>
                ))}
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(order)}
                  className={`bg-blue-400 border-4 border-black text-black px-3 py-2 text-xs hover:bg-blue-500 transition-all shadow-[3px_3px_0_#333] ${
                    role !== "SUPERUSER" && order.username !== username
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={role !== "SUPERUSER" && order.username !== username}
                >
                  Editar
                </button>

                <button
                  onClick={() => manttoCompletar(order.id)}
                  className={`bg-green-400 border-4 border-black text-black px-3 py-2 text-xs transition-all shadow-[3px_3px_0_#333] ${
                    role === "USER"
                      ? "cursor-not-allowed opacity-50 bg-green-300"
                      : "hover:bg-green-500"
                  }`}
                  disabled={role === "USER"}
                >
                  Completado
                </button>
              </div>
            </div>
          ))
          )}
          

        </div>
      )}
    </div>
  );
}
