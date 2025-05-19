import React, { useEffect, useState } from "react";
import type { Tech, Area, MantenimientoOrden } from "../types";
import Menu from "../components/Menu"
import { toast, ToastContainer } from "react-toastify";

const MantenimientoOrdenForm: React.FC = () => {
  const [formData, setFormData] = useState<MantenimientoOrden>({
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    stoppedMachine: false,
    attentionRequired: false,
    serviceDescription: "",
    receptionDate: "",
    receptionTime: "",
    personnelAsigned: "",
    programmedDate: "",
    observations: "",
    problemaCausaSolucion: "",
    serviceSolution: "",
    equipmentDisposal: false,
    notificateCalibration: false,
    usedParts: 0,
    partNumber: "",
    descriptionPart: "",
    partOrigin: "",
    coversInstalled: false,
    interlocksTested: false,
    guardsInstalled: false,
    completeRevision: false,
    cleanArea: false,
    electricityConnected: false,
    waterAirGasConnected: false,
    taggedProperly: false,
    comments: "",
    closeDate: "",
  });

  const [techs, setTechs] = useState<Tech[]>([]);
  const [areas, setAreas] = useState<Area[]>([])

  useEffect(() => {
    getTechs();
    getAreas();
  }, []);

  const getTechs = async () => {
    try {
      const response = await fetch("http://localhost:8080/tecnicos");
      const data = await response.json();
      setTechs(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const getAreas = async () => {
    try {
      const response = await fetch("http://localhost:8080/areas");
      const data = await response.json();
      console.log(data);
      setAreas(data.responseEntity.body)
    } catch (error) {
      console.error("Error al obtener los datos", error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (target as HTMLInputElement).checked
        : type === "number"
          ? Number(value)
          : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    try {
      const response = await fetch("http://localhost:8080/mantenimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        console.log("Datos de orden de mantenimiento enviados a la base de datos con éxito")
        toast.success("Orden creada con exito")
      } else {
        console.log("Error al enviar los datos de la orden de mantenimiento")
      }
    } catch (error) {
      console.error("Error de red al enviar la orden de mantenimiento", error)
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-lg border border-gray-300">
      <ToastContainer />
      <Menu />
      <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800 uppercase tracking-wide">Orden de Mantenimiento Correctivo</h1>
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Sección Solicitante */}
        <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Exclusivo Solicitante</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="requestorName" placeholder="Nombre del solicitante" onChange={handleChange} />
            <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="requestorLastName" placeholder="Apellido del solicitante" onChange={handleChange} />
            <select className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" name="area" value={formData.area} onChange={handleChange}>
              <option value="" disabled>Seleccionar Área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.areaName}>{area.areaName}</option>
              ))}
            </select>
            <input className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400" type="text" name="idMachine" placeholder="ID Máquina" onChange={handleChange} />
            <label className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" name="stoppedMachine" onChange={handleChange} />
              <span>Máquina detenida</span>
            </label>
            <label className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" name="attentionRequired" onChange={handleChange} />
              <span>Requiere atención inmediata</span>
            </label>
            <textarea className="border border-blue-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-blue-400" name="serviceDescription" placeholder="Descripción del servicio" onChange={handleChange} />
          </div>
        </section>

        {/* Sección Supervisor */}
        <section className="border-l-4 border-green-400 bg-white p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold uppercase mb-4 text-green-700">Exclusivo Supervisor de Mantenimiento</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="date" name="receptionDate" onChange={handleChange} />
            <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="text" name="receptionTime" placeholder="Hora de recepción" onChange={handleChange} />
            <select className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" name="personnelAsigned" value={formData.personnelAsigned} onChange={handleChange}>
              <option value="" disabled>Seleccionar Técnico</option>
              {techs.map((tech) => (
                <option key={tech.idTecnico} value={`${tech.nombreTecnico} ${tech.apellidoTecnico}`}>
                  {tech.nombreTecnico} - {tech.apellidoTecnico}
                </option>
              ))}
            </select>
            <input className="border border-green-300 p-2 rounded focus:ring-2 focus:ring-green-400" type="date" name="programmedDate" onChange={handleChange} />
            Observaciones
            <textarea className="border border-green-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-green-400" name="observations" placeholder="Escribe las obeservaciones encontradas" onChange={handleChange} />

            Problema-Causa-Solución
            <textarea name="problemCauseSolution" className="border border-green-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-green-400" placeholder="Escribir el problema, la causa y la solución" onChange={handleChange} />


            <label className="flex items-center space-x-2">
              <span>¿Equipo para desecho?</span>
              <input type="checkbox" name="equipmentDisposal" onChange={handleChange} />
            </label>

            <label className="flex items-center space-x-2">
              <span>¿Requiere aviso a caliración y MP?</span>
              <input type="checkbox" name="notificateCalibration" onChange={handleChange} />
            </label>

            

          </div>
        </section>

        {/* Sección Técnico */}
        <section className="border-l-4 border-purple-400 bg-white p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold uppercase mb-4 text-purple-700">Técnico Asignado</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "coversInstalled", label: "Cubiertas instaladas" },
              { name: "interlocksTested", label: "Interlocks probados" },
              { name: "guardsInstalled", label: "Guardas instaladas" },
              { name: "electricityConnected", label: "Electricidad conectada" },
              { name: "completeRevision", label: "Revisión completa del equipo" },
              { name: "cleanArea", label: "Limpieza del área" },
              { name: "waterAirGasConnected", label: "Aire, Agua y/o gas conectados" },
              { name: "taggedProperly", label: "Etiquetado y señalización de Equipo" },
            ].map((item) => (
              <label key={item.name} className="flex items-center space-x-2">
                <input type="checkbox" name={item.name} onChange={handleChange} checked={formData[item.name as keyof MantenimientoOrden] as boolean} />
                
                <span>{item.label}</span>
              </label>
            ))}
            <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="number" name="usedParts" value={formData.usedParts} placeholder="Partes usadas" onChange={handleChange} />
            <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="partNumber" value={formData.partNumber} placeholder="Número de parte" onChange={handleChange} />
            <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="descriptionPart" value={formData.descriptionPart} placeholder="Descripción de la parte" onChange={handleChange} />
            <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="text" name="partOrigin" value={formData.partOrigin} placeholder="Origen de la parte" onChange={handleChange} />
            <textarea className="border border-purple-300 p-2 rounded col-span-2 focus:ring-2 focus:ring-purple-400" name="comments" value={formData.comments} placeholder="Comentarios" onChange={handleChange} />
            <input className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-400" type="date" name="closeDate" value={formData.closeDate} onChange={handleChange} />
          </div>
        </section>

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 font-bold uppercase transition duration-300">
          Enviar Orden
        </button>
      </form>
    </div>
  );

}

export default MantenimientoOrdenForm;
