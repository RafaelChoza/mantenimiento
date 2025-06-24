import { useEffect, useState } from "react"
import type { MantenimientoOrden } from "../types"
import { useAuth } from "./AuthContext";
import Menu from "./Menu";


export default function MyOrders() {
    const { role, username } = useAuth();
    const [cargando, setCargando] = useState(true);
    const [myOrders, setMyOrders] = useState<MantenimientoOrden[] | null>([])

    useEffect(() => {
        if (username) {
            getMyOrders();
        }
    }, [username]);

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
        } catch (error) {
            throw new Error("Error en el sevidor al querer recibir los datos")
        }
    }

    return (
        <div>
            <Menu />
            {cargando ? (
                <div className="flex justify-center items-center h-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                    <p
                        className="ml-2 text-blue-600 text-xs"
                    >
                        Cargando...
                    </p>
                </div>
            ) : (
                <div>
                    {myOrders?.length === 0 ? (
                        <h1>No tienes ordenes creadas</h1>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {myOrders?.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-yellow-50 border-4 border-black p-4 rounded shadow-[4px_4px_0_#333] transition-all"
                                >
                                    <h2 className="text-xs text-blue-700 mb-2 flex items-center">
                                        🔧 Orden #{order.id}
                                        <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${order.attentionRequired ? "bg-red-500 text-white" : "bg-green-400 text-white"
                                            }`}>
                                            {order.attentionRequired ? "Urgente" : "Normal"}
                                        </span>
                                    </h2>
                                    <hr className="mb-2 border-black" />

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1 text-xs text-black">
                                        {Object.entries(order).map(([key, value]) => (
                                            <p
                                                key={key}
                                                className="bg-white border-1 border-black px-1 rounded shadow-sm"
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
                                            //onClick={() => handleEdit(order)} // Asegúrate de pasar el argumento si se requiere
                                            className={`bg-blue-400 border-4 border-black text-black px-3 py-2 text-xs hover:bg-blue-500 transition-all shadow-[3px_3px_0_#333] ${role !== "SUPERUSER" && order.username !== username
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                                }`}
                                            disabled={role !== "SUPERUSER" && order.username !== username}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className={`bg-green-400 border-4 border-black text-black px-3 py-2 text-xs transition-all shadow-[3px_3px_0_#333] ${role === "USER" ? "cursor-not-allowed opacity-50 bg-green-300" : "hover:bg-green-500"}`}
                                            //onClick={() => manttoCompletar(order.id)}
                                            disabled={role === "USER"}
                                        >
                                            Completado
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
