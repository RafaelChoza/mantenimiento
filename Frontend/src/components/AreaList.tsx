import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Area } from "../types";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";

export default function AreaList() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingArea, setEditingArea] = useState<Area | null>(null);

  useEffect(() => {
    getAreas();
  }, []);

  const getAreas = async () => {
    setCargando(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/areas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAreas(data.responseEntity?.body || []);
    } catch (error) {
      console.error("Error de la red al obtener las áreas", error);
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (area: Area) => {
    setEditingArea(area);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingArea) {
      setEditingArea({
        ...editingArea,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea) return;

    try {
      const response = await fetch(`http://localhost:8080/areas/${editingArea.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editingArea),
      });

      if (response.ok) {
        setAreas((prev) => prev.map((a) => (a.id === editingArea.id ? editingArea : a)));
        toast.success("Área actualizada con éxito");
        setEditingArea(null);
      } else {
        console.log("Error al actualizar el área");
      }
    } catch (error) {
      console.error("Error de red al actualizar el área", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/areas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setAreas((prev) => prev.filter((a) => a.id !== id));
        toast.success("Área eliminada con éxito");
      } else {
        Swal.fire("Error", `No se pudo eliminar el área ${id}`, "error");
      }
    } catch (error) {
      console.error("Error de red al eliminar el área", error);
      Swal.fire("Error", "Hubo un problema de red al intentar eliminar el área", "error");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <ToastContainer />
      <Menu />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-6xl mx-auto">
        <h1 className="text-center text-black text-lg mb-6 font-bold">
          🏢 LISTA DE ÁREAS
        </h1>

        {editingArea && (
          <div className="fixed inset-0 bg-blue-900 bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-gray-300 p-6 border-4 border-black shadow-[4px_4px_0_#000] rounded-lg max-w-md w-full text-black">
              <h2 className="text-center text-black text-sm mb-4 font-bold">
                ✏️ EDITAR ÁREA
              </h2>
              <form onSubmit={handleUpdateArea} className="space-y-4">
                <input
                  type="text"
                  name="areaName"
                  value={editingArea.areaName}
                  onChange={handleInputChange}
                  placeholder="Nombre del Área"
                  className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingArea(null)}
                    className="bg-gray-400 border-2 border-black text-white px-4 py-2 text-xs hover:bg-gray-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-400 border-2 border-black text-black px-4 py-2 text-xs hover:bg-green-500"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {cargando ? (
          <div className="flex justify-center items-center h-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-yellow-500"></div>
            <p className="ml-2 text-black text-xs">Cargando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {areas.map((area) => (
              <div
                key={area.id}
                className="bg-white p-4 border-4 border-black shadow-[4px_4px_0_#000] rounded-md text-black"
              >
                <h2 className="text-xs mb-2 font-bold">📌 Área #{area.id}</h2>
                <p className="bg-yellow-50 p-2 border border-black text-xs mb-2">
                  <strong>Nombre:</strong> {area.areaName}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(area)}
                    className="bg-green-400 border-2 border-black text-black px-2 py-1 text-xs hover:bg-green-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
                    className="bg-red-400 border-2 border-black text-black px-2 py-1 text-xs hover:bg-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
