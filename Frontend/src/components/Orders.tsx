import { useEffect, useState } from "react";
import type { Order } from "../types";
import Menu from "../components/Menu"
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  useEffect(() => {
    getOrders();
  }, []);

  const handleEdit = (order: Order) => {
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

      if(data.success) {
        setOrders((prevOrders) => prevOrders.map((order) => order.id === editingOrder?.id ? editingOrder : order))
        console.log("Orden actualizada")
        toast.success("La orden fue actualziada correctamente")
      } else {
        console.log("Error al querer editar al técnico")
        toast.error("Error al querer editar al técnico")
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

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
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
