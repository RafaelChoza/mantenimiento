import { useEffect, useState } from "react";
import type { Area, MantenimientoOrden, Tech } from "../types";
import Menu from "../components/Menu"
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState<MantenimientoOrden[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingOrder, setEditingOrder] = useState<MantenimientoOrden | null>(null)
  const [areas, setAreas] = useState<Area[]>([])
  const [techs, setTechs] = useState<Tech[]>([])

  useEffect(() => {
    getOrders();
    getAreas();
    getTechs();
  }, []);

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
      console.log(data)

      if (data.success && editingOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === editingOrder.id ? editingOrder : order
          )
        );
        console.log("Orden actualizada");
        toast.success("La orden fue actualizada correctamente");
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
      const response = await fetch("http://localhost:8080/mantenimiento", {
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
  if (id === undefined) {
    console.error("ID no definido");
    return;
  }

  if (!window.confirm('¿Marcar este servicio como completado?')) return;
  try {
    const response = await fetch(`http://localhost:8080/mantenimiento/${id}/completado`, {
      method: "POST",
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if(!response.ok){throw new Error("Error al enviar los datos")};
    setOrders((prev) => prev.filter((mantto) => mantto.id != id))
  } catch (error) {
    console.error("Error", error)
  }
}


  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-yellow-100 border-4 border-black rounded-lg shadow-[6px_6px_0_#333] p-6 w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <h2
              className="text-xs text-blue-700 mb-4"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              Editar Orden #{editingOrder.id}
            </h2>
            <form onSubmit={handleUpdateOrder} className="space-y-10" style={{ fontFamily: '"Press Start 2P", cursive' }}>

              {/* Sección Solicitante */}
              <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#333]">
                <h2
                  className="text-xs text-blue-700 mb-4"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                  Exclusivo Solicitante
                </h2>
                <div className="grid grid-cols-2 gap-4 text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="text"
                    name="requestorName"
                    value={editingOrder.requestorName}
                    placeholder="Nombre del solicitante"
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="text"
                    name="requestorLastName"
                    value={editingOrder.requestorLastName}
                    placeholder="Apellido del solicitante"
                    onChange={handleInputChange}
                  />
                  <select
                    className="border-2 border-black p-2 bg-yellow-50"
                    name="area"
                    value={editingOrder.area}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Seleccionar Área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.areaName}>
                        {area.areaName}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="text"
                    name="idMachine"
                    value={editingOrder.idMachine}
                    placeholder="ID Máquina"
                    onChange={handleInputChange}
                  />
                  <label className="flex items-center space-x-2 col-span-2">
                    <input
                      type="checkbox"
                      name="stoppedMachine"
                      checked={!!editingOrder?.stoppedMachine}
                      onChange={handleInputChange}
                    />
                    <span>Máquina detenida</span>
                  </label>
                  <label className="flex items-center space-x-2 col-span-2">
                    <input
                      type="checkbox"
                      name="attentionRequired"
                      checked={!!editingOrder?.attentionRequired}
                      onChange={handleInputChange}
                    />
                    <span>Requiere atención inmediata</span>
                  </label>
                  <textarea
                    className="border-2 border-black p-2 bg-yellow-50 col-span-2"
                    name="serviceDescription"
                    value={editingOrder.serviceDescription}
                    placeholder="Descripción del servicio"
                    onChange={handleInputChange}
                  />
                </div>
              </section>


              {/* Sección Supervisor */}
              <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#333]">
                <h2
                  className="text-xs text-green-700 mb-4"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                  Exclusivo Supervisor de Mantenimiento
                </h2>
                <div className="grid grid-cols-2 gap-4 text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="date"
                    name="receptionDate"
                    value={editingOrder.receptionDate}
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="time"
                    name="receptionTime"
                    value={editingOrder.receptionTime}
                    placeholder="Hora de recepción"
                    onChange={handleInputChange}
                  />
                  <select
                    className="border-2 border-black p-2 bg-yellow-50"
                    name="personnelAsigned"
                    value={editingOrder.personnelAsigned}
                    onChange={handleInputChange}
                  >
                    <option value={editingOrder.personnelAsigned} disabled>
                      Seleccionar Técnico
                    </option>
                    {techs.map((tech) => (
                      <option key={tech.idTecnico} value={`${tech.nombreTecnico} ${tech.apellidoTecnico}`}>
                        {tech.nombreTecnico} - {tech.apellidoTecnico}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="date"
                    name="programmedDate"
                    value={editingOrder.programmedDate}
                    onChange={handleInputChange}
                  />
                  <textarea
                    className="border-2 border-black p-2 bg-yellow-50 col-span-2"
                    name="observations"
                    value={editingOrder.observations}
                    placeholder="Observaciones encontradas"
                    onChange={handleInputChange}
                  />
                  <textarea
                    className="border-2 border-black p-2 bg-yellow-50 col-span-2"
                    name="problemCauseSolution"
                    value={editingOrder.problemCauseSolution}
                    placeholder="Problema, causa y solución"
                    onChange={handleInputChange}
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
              <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#333]">
                <h2
                  className="text-xs text-purple-700 mb-4"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                  Técnico Asignado
                </h2>
                <div className="grid grid-cols-2 gap-4 text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="number"
                    name="usedParts"
                    value={editingOrder.usedParts}
                    placeholder="Partes usadas"
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="text"
                    name="partNumber"
                    value={editingOrder.partNumber}
                    placeholder="Número de parte"
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="text"
                    name="descriptionPart"
                    value={editingOrder.descriptionPart}
                    placeholder="Descripción de la parte"
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
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
                    className="border-2 border-black p-2 bg-yellow-50 col-span-2"
                    name="comments"
                    value={editingOrder.comments}
                    placeholder="Comentarios"
                    onChange={handleInputChange}
                  />
                  <input
                    className="border-2 border-black p-2 bg-yellow-50"
                    type="date"
                    name="closeDate"
                    value={editingOrder.closeDate}
                    onChange={handleInputChange}
                  />
                </div>
              </section>


              <button
                type="submit"
                className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#333]"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                Enviar Orden
              </button>
            </form>

          </div>
        </div>
      )}


      <Menu />
      <h1
        className="text-center text-yellow-700 text-sm mb-6"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        📌 Órdenes de Mantenimiento
      </h1>

      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p
            className="ml-2 text-blue-600 text-xs"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            Cargando...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-yellow-50 border-4 border-black p-4 rounded shadow-[4px_4px_0_#333] transition-all"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <h2 className="text-xs text-blue-700 mb-2 flex items-center">
                🔧 Orden #{order.id}
                <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"
                  }`}>
                  {order.attentionRequired ? "Urgente" : "Normal"}
                </span>
              </h2>
              <hr className="mb-2 border-black" />

              <div className="grid grid-cols-1 gap-2 text-xs text-black">
                {Object.entries(order).map(([key, value]) => (
                  <p
                    key={key}
                    className="bg-white border-2 border-black p-2 rounded shadow-sm"
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
                  className="bg-blue-400 border-4 border-black text-black px-3 py-2 text-xs hover:bg-blue-500 transition-all shadow-[3px_3px_0_#333]"
                >
                  Editar
                </button>
                <button
                  className="bg-green-400 border-4 border-black text-black px-3 py-2 text-xs hover:bg-green-500 transition-all shadow-[3px_3px_0_#333]"
                  onClick={() => manttoCompletar(order.id)}
                >
                  Completado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
