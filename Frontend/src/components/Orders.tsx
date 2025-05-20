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
      const response = await fetch("http://localhost:8080/mantenimiento");
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
      const response = await fetch("http://localhost:8080/areas");
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
      const response = await fetch("http://localhost:8080/tecnicos")
      const data = await response.json()
      setTechs(data.responseEntity.body)
    } catch (error) {
      console.error("Error al obtener los datos", error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Editar Orden #{editingOrder.id}</h2>
            <form onSubmit={handleUpdateOrder} className="space-y-10">

              {/* Sección Solicitante */}
              <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
                <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Exclusivo Solicitante</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="requestorName" value={editingOrder.requestorName} placeholder="Nombre del solicitante" onChange={handleInputChange} />
                  <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="requestorLastName" value={editingOrder.requestorLastName} placeholder="Apellido del solicitante" onChange={handleInputChange} />
                  <select
                    className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                    name="area"
                    value={editingOrder.area}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Seleccionar Área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.areaName}>{area.areaName}</option>
                    ))}
                  </select>

                  <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="idMachine" value={editingOrder.idMachine} placeholder="ID Máquina" onChange={handleInputChange} />
                  <label className="flex items-center space-x-2 col-span-2">
                    <input type="checkbox" name="stoppedMachine" checked={!!editingOrder?.stoppedMachine} onChange={handleInputChange} />
                    <span>Máquina detenida</span>
                  </label>
                  <label className="flex items-center space-x-2 col-span-2">
                    <input type="checkbox" name="attentionRequired" checked={!!editingOrder?.attentionRequired} onChange={handleInputChange} />
                    <span>Requiere atención inmediata</span>
                  </label>
                  <textarea className="border border-blue-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-blue-400" name="serviceDescription" value={editingOrder.serviceDescription} placeholder="Descripción del servicio" onChange={handleInputChange} />
                </div>
              </section>

              {/* Sección Supervisor */}
              <section className="border-l-4 border-green-400 bg-white p-6 rounded shadow-sm">
                <h2 className="text-xl font-semibold uppercase mb-4 text-green-700">Exclusivo Supervisor de Mantenimiento</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="date" name="receptionDate" value={editingOrder.receptionDate} onChange={handleInputChange} />
                  <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="time" name="receptionTime" value={editingOrder.receptionTime} placeholder="Hora de recepción" onChange={handleInputChange} />
                  <select className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" name="personnelAsigned" value={editingOrder.personnelAsigned} onChange={handleInputChange}>
                    <option value={editingOrder.personnelAsigned} disabled>Seleccionar Técnico</option>
                    {techs.map((tech) => (
                      <option key={tech.idTecnico} value={`${tech.nombreTecnico} ${tech.apellidoTecnico}`}>
                        {tech.nombreTecnico} - {tech.apellidoTecnico}
                      </option>
                    ))}
                  </select>
                  <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="date" name="programmedDate" value={editingOrder.programmedDate} onChange={handleInputChange} />
                  <textarea className="border border-green-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-green-400" name="observations" value={editingOrder.observations} placeholder="Observaciones encontradas" onChange={handleInputChange} />
                  <textarea name="problemCauseSolution" className="border border-green-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-green-400" value={editingOrder.problemCauseSolution} placeholder="Problema, causa y solución" onChange={handleInputChange} />
                  <label className="flex items-center space-x-2">
                    <span>¿Equipo para desecho?</span>
                    <input type="checkbox" checked={editingOrder?.equipmentDisposal} name="equipmentDisposal" onChange={handleInputChange} />
                  </label>
                  <label className="flex items-center space-x-2">
                    <span>¿Requiere aviso a calibración y MP?</span>
                    <input type="checkbox" name="notificateCalibration" checked={editingOrder?.notificateCalibration} onChange={handleInputChange} />
                  </label>
                </div>
              </section>

              {/* Sección Técnico */}
              <section className="border-l-4 border-purple-400 bg-white p-6 rounded shadow-sm">
                <h2 className="text-xl font-semibold uppercase mb-4 text-purple-700">Técnico Asignado</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="number" name="usedParts" value={editingOrder.usedParts} placeholder="Partes usadas" onChange={handleInputChange} />
                  <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="partNumber" value={editingOrder.partNumber} placeholder="Número de parte" onChange={handleInputChange} />
                  <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="descriptionPart" value={editingOrder.descriptionPart} placeholder="Descripción de la parte" onChange={handleInputChange} />
                  <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="partOrigin" value={editingOrder.partOrigin} placeholder="Origen de la parte" onChange={handleInputChange} />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="coversInstalled" checked={editingOrder?.coversInstalled} onChange={handleInputChange} />
                    <span>Cubiertas instaladas</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="interlocksTested" checked={editingOrder?.interlocksTested} onChange={handleInputChange} />
                    <span>Interlocks probados</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="guardsInstalled" checked={editingOrder?.guardsInstalled} onChange={handleInputChange} />
                    <span>Guardas instaladas</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="completeRevision" checked={editingOrder?.completeRevision} onChange={handleInputChange} />
                    <span>Revisión completa del equipo</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="cleanArea" checked={editingOrder?.cleanArea} onChange={handleInputChange} />
                    <span>Limpieza del área</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="electricityConnected" checked={editingOrder?.electricityConnected} onChange={handleInputChange} />
                    <span>Electricidad conectada</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="waterAirGasConnected" checked={editingOrder?.waterAirGasConnected} onChange={handleInputChange} />
                    <span>Aire, agua y/o gas conectados</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="taggedProperly" checked={editingOrder?.taggedProperly} onChange={handleInputChange} />
                    <span>Etiquetado y señalización de equipo</span>
                  </label>
                  <textarea className="border border-purple-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-purple-400" name="comments" value={editingOrder.comments} placeholder="Comentarios" onChange={handleInputChange} />
                  <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="date" name="closeDate" onChange={handleInputChange} />
                </div>
              </section>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 font-bold uppercase transition duration-300">
                Enviar Orden
              </button>
            </form>

          </div>
        </div>
      )}


      <Menu />
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-800 uppercase">📌 Órdenes de Mantenimiento</h1>

      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p className="ml-2 text-blue-600 text-sm font-semibold">Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-3 rounded-md shadow-sm border-l-2 border-blue-500 hover:shadow-md transition-all">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                🔧 Orden #{order.id}
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"
                  }`}>
                  {order.attentionRequired ? "Urgente" : "Normal"}
                </span>

              </h2>
              <hr className="mb-2 border-blue-300" />

              <div className="grid grid-cols-2 gap-1 text-xs text-gray-800">
                {Object.entries(order).map(([key, value]) => (
                  <p key={key} className="bg-gray-100 p-1 rounded-md shadow-xs">
                    <strong className="text-blue-600">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong> {value?.toString() || "N/A"}
                  </p>
                ))}



              </div>
              <br />
              <div className="flex justify-center space-x-4">
                <button onClick={() => handleEdit(order)} className="p-2 bg-blue-600 font-bold text-white rounded-sm w-32 hover:scale-95">Editar</button>
                <button className="p-2 bg-green-600 font-bold text-white rounded-sm w-32 hover:scale-95">Completado</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
