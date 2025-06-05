import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import type { MantenimientoOrden } from "../types";

export default function OrderPerAssigned() {
    const { username, role } = useAuth(); // Asegúrate de que `role` esté disponible en tu contexto
    const [ordersAssigned, setOrderAssigned] = useState<MantenimientoOrden[]>([]);

    useEffect(() => {
        if (username) {
            getAssignedOrders(username);
        }
    }, [username]);

    const getAssignedOrders = async (username: string) => {
        try {
            const response = await fetch("http://localhost:8080/mantenimiento/asignadas", {
                headers: {
                    'username': username,
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Error al recibir los datos de la base de datos");
            }
            const data = await response.json();
            setOrderAssigned(data.responseEntity.body);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (order: MantenimientoOrden) => {
        // Lógica para editar
        console.log("Editar orden:", order);
    };

    const manttoCompletar = (id: number) => {
        // Lógica para marcar como completado
        console.log("Completar orden:", id);
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Órdenes de Mantenimiento Asignadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {ordersAssigned.map(order => (
                    <div
                        key={order.id}
                        className="bg-yellow-50 border-4 border-black p-4 rounded shadow-[4px_4px_0_#333] transition-all"
                    >
                        <h2 className="text-xs text-blue-700 mb-2 flex items-center">
                            🔧 Orden #{order.id}
                            <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"}`}>
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
                                className={`bg-green-400 border-4 border-black text-black px-3 py-2 text-xs transition-all shadow-[3px_3px_0_#333] ${role === "USER" ? "cursor-not-allowed bg-green-300" : "hover:bg-green-500"}`}
                                onClick={() => {
                                    if (order.id !== undefined) {
                                        manttoCompletar(order.id);
                                    }
                                }}
                                disabled={role === "USER"}
                            >
                                Completado
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
