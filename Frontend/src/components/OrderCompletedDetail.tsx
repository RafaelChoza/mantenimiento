import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { OrderCompleted } from "../types";

export default function OrderCompletedDetail() {
  const [detail, setDetail] = useState<OrderCompleted | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getOrderCompletedById(Number(id));
  }, [id]);

  const getOrderCompletedById = async (id: OrderCompleted["id"]) => {
    try {
      const response = await fetch(`http://localhost:8080/mantenimiento/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error al querer obtener los datos");
      const data = await response.json();
      setDetail(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  };

  return (
  <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
    <h1 className="text-center text-sm mb-6 font-bold text-white">
      🛠️ DETALLE DEL MANTENIMIENTO
    </h1>

    {detail ? (
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 text-xs max-w-3xl mx-auto rounded-lg">
        {[
          { label: "🆔 ID", value: detail.id },
          { label: "📅 Fecha de servicio", value: detail.serviceDateTime },
          { label: "🕒 Hora de servicio", value: detail.serviceTime },
          { label: "👤 Nombre del solicitante", value: `${detail.requestorName} ${detail.requestorLastName}` },
          { label: "🏢 Área", value: detail.area },
          { label: "📦 ID de máquina", value: detail.idMachine },
          { label: "⚠️ Máquina detenida", value: detail.stoppedMachine ? "Sí" : "No" },
          { label: "📝 Descripción", value: detail.serviceDescription },
          { label: "Atención requerida", value: detail.attentionRequired ? "Sí" : "No" },
          { label: "📆 Fecha de recepción", value: detail.receptionDate },
          { label: "🕒 Hora de recepción", value: detail.receptionTime },
          { label: "👥 Personal asignado", value: detail.personnelAssigned },
          { label: "📅 Fecha programada", value: detail.programmedDate },
          { label: "💬 Observaciones", value: detail.observations },
          { label: "📝 Causa y solución del problema", value: detail.problemCauseSolution },
          { label: "📦 Equipo dispuesto", value: detail.equipmentDisposal ? "Sí" : "No" },
          { label: "📝 Notificación de calibración", value: detail.notificateCalibration ? "Sí" : "No" },
          { label: "📦 Partes utilizadas", value: detail.usedParts },
          { label: "📝 Número de parte", value: detail.partNumber },
          { label: "📝 Descripción de la parte", value: detail.descriptionPart },
          { label: "📦 Origen de la parte", value: detail.partOrigin },
          { label: "🛠️ Cubiertas instaladas", value: detail.coversInstalled ? "Sí" : "No" },
          { label: "🔒 Interlocks probados", value: detail.interlocksTested ? "Sí" : "No" },
          { label: "🛠️ Guardas instaladas", value: detail.guardsInstalled ? "Sí" : "No" },
          { label: "💡 Electricidad conectada", value: detail.electricityConnected ? "Sí" : "No" },
          { label: "📝 Revisión completa", value: detail.completeRevision ? "Sí" : "No" },
          { label: "🧹 Área limpia", value: detail.cleanArea ? "Sí" : "No" },
          { label: "💧 Agua/Aire/Gas conectado", value: detail.waterAirGasConnected ? "Sí" : "No" },
          { label: "📝 Etiquetado adecuado", value: detail.taggedProperly ? "Sí" : "No" },
          { label: "💬 Comentarios", value: detail.comments },
          { label: "📆 Fecha de cierre", value: detail.closeDate },
          { label: "📆 Fecha de transferencia", value: detail.fechaTransferencia },
        ].map((item, index) => (
          <p key={index} className="mb-2">
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black border-2 border-black shadow-[2px_2px_0_#000]"
        >
          🔙 VOLVER
        </button>
      </div>
    ) : (
      <p className="text-center text-xs font-bold text-white">CARGANDO DETALLE...</p>
    )}
  </div>
);

}
