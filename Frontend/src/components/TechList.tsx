import { useEffect, useState } from "react";
import type { Tech } from "../types";
import Menu from "../components/Menu";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';

export default function TechList() {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingTech, setEditingTech] = useState<Tech | null>(null)

  useEffect(() => {
    getTechs();
  }, []);

  const getTechs = async () => {
    setCargando(true);
    try {
      const response = await fetch("http://localhost:8080/tecnicos");
      const data = await response.json();
      console.log("Datos recibidos:", data);
      setTechs(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener los datos de los técnicos", error);
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (tech: Tech) => {
    console.log("Editar tecnico: ", tech)
    setEditingTech(tech)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTech) {
      setEditingTech({
        ...editingTech,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleUpdateTech = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tecnicos/${editingTech?.idTecnico}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTech),
      })

      const data = await response.json()
      console.log(data)

      if (data.success) {
        setTechs((prevTech) => prevTech.map((tech) => tech.idTecnico === editingTech?.idTecnico ? editingTech : tech))
        console.log("Tecnico actualizado")
        toast.success(`El técnico ha sido editado correctamente`)
      } else {
        console.log("Error al aditar el tenico ", data.message)
        toast.error(data.message || "Error al enviar los datos actualzidos del técnico")
      }
    } catch (error) {
      console.error("Error de red al editar el tecnico")
    }
  }

  const onDelete = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show',
        icon: 'swal2-icon-show'
      }
    })
    if (!confirmDelete.isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:8080/tecnicos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTechs(prev => prev.filter(tech => tech.idTecnico !== id));

        Swal.fire("Eliminado", `El técnico ${id} ha sido eliminada`, "success")

        toast.success(`El técnico ${id} ha sido eliminado correctamente`);
      } else {
        Swal.fire("Error", `No se pudo eliminar el técnico ${id}`, "error");
      }
    } catch (error) {
      console.error("Hubo un error de red al querer eliminar al técnico", error);
      Swal.fire("Error", "Hubo un problema de red al intentar eliminar el técnico", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
      <ToastContainer/>
      <Menu />
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-800 uppercase">
        👨‍🔧 Lista de Técnicos
      </h1>

      {/* Modal de edición con estilos actualizados */}
      {editingTech && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Editar Área</h2>
            <form onSubmit={handleUpdateTech} className="space-y-4">
              <input
                type="text"
                name="nombreTecnico"
                value={editingTech.nombreTecnico}
                onChange={handleInputChange}
                placeholder="Nombre del tecnico"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <input
                type="text"
                name="apellidoTecnico"
                value={editingTech.apellidoTecnico}
                onChange={handleInputChange}
                placeholder="Apellido del Tecnico"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <input
                type="email"
                name="correo"
                value={editingTech.correo}
                onChange={handleInputChange}
                placeholder="Apellido del Tecnico"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <input
                type="number"
                name="numNomina"
                value={editingTech.numNomina}
                onChange={handleInputChange}
                placeholder="Apellido del Tecnico"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <input
                type="date"
                name="fechaAlta"
                value={editingTech.fechaAlta}
                onChange={handleInputChange}
                placeholder="Apellido del Tecnico"
                className="w-full p-2 rounded-md bg-gray-100 border border-blue-400 text-gray-800"
              />
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
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
          {techs.map(tech => {
            console.log("Técnico actual:", tech); // 👈 Aquí puedes ver si tech.id existe

            return (
              <div
                key={tech.idTecnico}
                className="bg-white p-3 rounded-md shadow-sm border-l-2 border-blue-500 hover:shadow-md transition-all"
              >
                <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                  🆔 Técnico {tech.idTecnico}
                </h2>

                <hr className="mb-2 border-blue-300" />

                <div className="grid grid-cols-2 gap-1 text-xs text-gray-800">
                  {Object.entries(tech).map(([key, value]) => (
                    <p key={key} className="bg-gray-100 p-1 rounded-md shadow-xs">
                      <strong className="text-blue-600">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </strong>{" "}
                      {value?.toString() || "N/A"}
                    </p>
                  ))}
                </div>

                <div className="mt-2 flex justify-between">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                    onClick={() => handleEdit(tech)}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(tech.idTecnico)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
