import { useEffect, useState } from "react";
import type { Area } from "../types";
import Menu from "../components/Menu";

export default function AreaList() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingArea, setEditingArea] = useState<Area | null>(null);

  useEffect(() => {
    getAreas();
  }, []);

  const getAreas = async () => {
    setCargando(true);
    try {
      const response = await fetch("http://localhost:8080/areas");
      const data = await response.json();
      console.log(data);
      setAreas(data.responseEntity?.body || []);
    } catch (error) {
      console.error("Error de la red al obtener las áreas", error);
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (area: Area) => {
    console.log("Editar área:", area);
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
        },
        body: JSON.stringify(editingArea),
      });

      if (response.ok) {
        setAreas((prevAreas) => prevAreas.map((area) => (area.id === editingArea.id ? editingArea : area)));
        console.log("Área actualizada");
        setEditingArea(null);
      } else {
        console.log("Error al actualizar el área");
      }
    } catch (error) {
      console.error("Error de red al actualizar el área", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/areas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
        console.log(`Área ${id} eliminada con éxito`);
      } else {
        console.log(`Error al eliminar el área ${id}`);
      }
    } catch (error) {
      console.error("Error de la red al eliminar el área", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
      <Menu/>
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-800 uppercase">🏢 Lista de Áreas</h1>

      {/* Modal de edición con estilos actualizados */}
      {editingArea && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Editar Área</h2>
            <form onSubmit={handleUpdateArea} className="space-y-4">
              <input
                type="text"
                name="nameProcess"
                value={editingArea.areaName}
                onChange={handleInputChange}
                placeholder="Nombre de la Operación"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingArea(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p className="ml-2 text-blue-600 text-sm font-semibold">Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {areas.map((area) => (
            <div key={area.id} className="bg-white p-3 rounded-md shadow-sm border-l-2 border-blue-500 hover:shadow-md transition-all">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                📌 Área #{area.id}
              </h2>
              <hr className="mb-2 border-blue-300" />

              <div className="grid grid-cols-1 gap-1 text-xs text-gray-800">
                <p className="bg-gray-100 p-1 rounded-md shadow-xs">
                  <strong className="text-blue-600">Nombre:</strong> {area.areaName}
                </p>
              </div>

              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleEdit(area)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(area.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
