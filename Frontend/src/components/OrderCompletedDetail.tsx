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
    <div className="container mx-auto p-6">
      <h1
        className="text-2xl mb-6 text-center text-blue-900 drop-shadow-lg"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Detalle del Mantenimiento
      </h1>

      {detail ? (
        <div
          className="bg-yellow-200 border-4 border-black shadow-[4px_4px_0_#333] p-6 text-xs text-black max-w-xl mx-auto"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <p className="mb-2"><strong>🆔 ID:</strong> {detail.id}</p>
          <p className="mb-2"><strong>📅 Fecha de servicio:</strong> {detail.serviceDateTime}</p>
          <p className="mb-2"><strong>🕒 Hora de servicio:</strong> {detail.serviceTime}</p>
          <p className="mb-2"><strong>👤 Nombre del solicitante:</strong> {detail.requestorName} {detail.requestorLastName}</p>
          <p className="mb-2"><strong>🏢 Área:</strong> {detail.area}</p>
          <p className="mb-2"><strong>📦 ID de máquina:</strong> {detail.idMachine}</p>
          <p className="mb-2"><strong>⚠️ Máquina detenida:</strong> {detail.stoppedMachine ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📝 Descripción:</strong> {detail.serviceDescription}</p>
          <p className="mb-2"><strong>Atención requerida:</strong> {detail.attentionRequired ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📆 Fecha de recepción:</strong> {detail.receptionDate}</p>
          <p className="mb-2"><strong>🕒 Hora de recepción:</strong> {detail.receptionTime}</p>
          <p className="mb-2"><strong>👥 Personal asignado:</strong> {detail.personnelAssigned}</p>
          <p className="mb-2"><strong>📅 Fecha programada:</strong> {detail.programmedDate}</p>
          <p className="mb-2"><strong>💬 Observaciones:</strong> {detail.observations}</p>
          <p className="mb-2"><strong>📝 Causa y solución del problema:</strong> {detail.problemCauseSolution}</p>
          <p className="mb-2"><strong>📦 Equipo dispuesto:</strong> {detail.equipmentDisposal ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📝 Notificación de calibración:</strong> {detail.notificateCalibration ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📦 Partes utilizadas:</strong> {detail.usedParts}</p>
          <p className="mb-2"><strong>📝 Número de parte:</strong> {detail.partNumber}</p>
          <p className="mb-2"><strong>📝 Descripción de la parte:</strong> {detail.descriptionPart}</p>
          <p className="mb-2"><strong>📦 Origen de la parte:</strong> {detail.partOrigin}</p>
          <p className="mb-2"><strong>🛠️ Cubiertas instaladas:</strong> {detail.coversInstalled ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>🔒 Interlocks probados:</strong> {detail.interlocksTested ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>🛠️ Guardas instaladas:</strong> {detail.guardsInstalled ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>💡 Electricidad conectada:</strong> {detail.electricityConnected ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📝 Revisión completa:</strong> {detail.completeRevision ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>🧹 Área limpia:</strong> {detail.cleanArea ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>💧 Agua/Aire/Gas conectado:</strong> {detail.waterAirGasConnected ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>📝 Etiquetado adecuado:</strong> {detail.taggedProperly ? "Sí" : "No"}</p>
          <p className="mb-2"><strong>💬 Comentarios:</strong> {detail.comments}</p>
          <p className="mb-2"><strong>📆 Fecha de cierre:</strong> {detail.closeDate}</p>
          <p className="mb-2"><strong>📆 Fecha de transferencia:</strong> {detail.fechaTransferencia}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-400 text-white border-2 border-black"
          >
            🔙 Volver
          </button>
        </div>
      ) : (
        <p
          className="text-center text-black text-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Cargando detalle...
        </p>
      )}
    </div>
  );
}
