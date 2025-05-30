import React, { useEffect, useState } from "react";
import type { Tech, Area, MantenimientoOrden } from "../types";
import Menu from "../components/Menu"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const MantenimientoOrdenForm: React.FC = () => {
  const [formData, setFormData] = useState<MantenimientoOrden>({
    requestorName: "",
    requestorLastName: "",
    area: "",
    idMachine: "",
    stoppedMachine: false,
    attentionRequired: false,
    serviceDateTime: new Date().toISOString().replace("T", " ").slice(0, 19),
    serviceDescription: "",
    receptionDate: "",
    receptionTime: "",
    personnelAsigned: "",
    programmedDate: "",
    observations: "",
    problemCauseSolution: "",
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

  const { role} = useAuth();

  const [techs, setTechs] = useState<Tech[]>([]);
  const [areas, setAreas] = useState<Area[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    getTechs();
    getAreas();
  }, []);

  const getTechs = async () => {
    try {
      const response = await fetch("http://localhost:8080/tecnicos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setTechs(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const getAreas = async () => {
    try {
      const response = await fetch("http://localhost:8080/areas", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        console.log("Datos de orden de mantenimiento enviados a la base de datos con éxito")
        toast.success("Orden creada con exito")

        setTimeout(() => {
          navigate("/mantenimiento/orden-list");
        }, 5000);
      } else {
        console.log("Error al enviar los datos de la orden de mantenimiento")
      }
    } catch (error) {
      console.error("Error de red al enviar la orden de mantenimiento", error)
    }
  };

  return (
  <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
    <div className="bg-gray-300 border-4 border-black shadow-[4px_4px_0_#000] p-4 rounded-lg mb-6 max-w-5xl mx-auto">
      <ToastContainer />
      <Menu />
      <h1 className="text-center text-yellow-700 text-xs mb-4">
        🛠️ Orden de Mantenimiento Correctivo
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección Solicitante */}
        <section className="bg-white border-2 border-black text-black p-4 text-xs hover:bg-yellow-300 transition-all shadow-[2px_2px_0_#000] rounded">
          <h2 className="text-blue-700 mb-2">Exclusivo Solicitante</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="requestorName" placeholder="Nombre del solicitante" onChange={handleChange} />
            <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="requestorLastName" placeholder="Apellido del solicitante" onChange={handleChange} />
            <select className="border-2 border-black p-2 bg-yellow-50" name="area" value={formData.area} onChange={handleChange}>
              <option value="" disabled>Seleccionar Área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.areaName}>{area.areaName}</option>
              ))}
            </select>
            <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="idMachine" placeholder="ID Máquina" onChange={handleChange} />
            <label className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" name="stoppedMachine" onChange={handleChange} />
              <span>Máquina detenida</span>
            </label>
            <label className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" name="attentionRequired" onChange={handleChange} />
              <span>Requiere atención inmediata</span>
            </label>
            <textarea className="border-2 border-black p-2 bg-yellow-50 col-span-2" name="serviceDescription" placeholder="Descripción del servicio" onChange={handleChange} />
          </div>
        </section>

        {role != "USER" && (
          <>
            {/* Sección Supervisor */}
            <section className="bg-white border-2 border-black text-black p-4 text-xs hover:bg-yellow-300 transition-all shadow-[2px_2px_0_#000] rounded">
              <h2 className="text-green-700 mb-2">Exclusivo Supervisor de Mantenimiento</h2>
              <div className="grid grid-cols-2 gap-4">
                <input className="border-2 border-black p-2 bg-yellow-50" type="date" name="receptionDate" onChange={handleChange} />
                <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="receptionTime" placeholder="Hora de recepción" onChange={handleChange} />
                <select className="border-2 border-black p-2 bg-yellow-50" name="personnelAsigned" value={formData.personnelAsigned} onChange={handleChange}>
                  <option value="" disabled>Seleccionar Técnico</option>
                  {techs.map((tech) => (
                    <option key={tech.idTecnico} value={`${tech.nombreTecnico} ${tech.apellidoTecnico}`}>
                      {tech.nombreTecnico} - {tech.apellidoTecnico}
                    </option>
                  ))}
                </select>
                <input className="border-2 border-black p-2 bg-yellow-50" type="date" name="programmedDate" onChange={handleChange} />
                <textarea className="border-2 border-black p-2 bg-yellow-50 col-span-2" name="observations" placeholder="Observaciones encontradas" onChange={handleChange} />
                <textarea className="border-2 border-black p-2 bg-yellow-50 col-span-2" name="problemCauseSolution" placeholder="Problema, causa y solución" onChange={handleChange} />
                <label className="flex items-center space-x-2">
                  <span>¿Equipo para desecho?</span>
                  <input type="checkbox" name="equipmentDisposal" onChange={handleChange} />
                </label>
                <label className="flex items-center space-x-2">
                  <span>¿Requiere aviso a calibración y MP?</span>
                  <input type="checkbox" name="notificateCalibration" onChange={handleChange} />
                </label>
              </div>
            </section>

            {/* Sección Técnico */}
            <section className="bg-white border-2 border-black text-black p-4 text-xs hover:bg-yellow-300 transition-all shadow-[2px_2px_0_#000] rounded">
              <h2 className="text-purple-700 mb-2">Técnico Asignado</h2>
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
                <input className="border-2 border-black p-2 bg-yellow-50" type="number" name="usedParts" value={formData.usedParts} placeholder="Partes usadas" onChange={handleChange} />
                <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="partNumber" value={formData.partNumber} placeholder="Número de parte" onChange={handleChange} />
                <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="descriptionPart" value={formData.descriptionPart} placeholder="Descripción de la parte" onChange={handleChange} />
                <input className="border-2 border-black p-2 bg-yellow-50" type="text" name="partOrigin" value={formData.partOrigin} placeholder="Origen de la parte" onChange={handleChange} />
                <textarea className="border-2 border-black p-2 bg-yellow-50 col-span-2" name="comments" value={formData.comments} placeholder="Comentarios" onChange={handleChange} />
                <input className="border-2 border-black p-2 bg-yellow-50" type="date" name="closeDate" value={formData.closeDate} onChange={handleChange} />
              </div>
            </section>
          </>
        )}

        <button className="w-full bg-white border-2 border-black text-black px-4 py-2 text-xs hover:bg-yellow-300 transition-all shadow-[2px_2px_0_#000]">
          Enviar Orden
        </button>
      </form>
    </div>
  </div>
);
}

export default MantenimientoOrdenForm;
