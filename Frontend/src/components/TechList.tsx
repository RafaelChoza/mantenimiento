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
    const token = localStorage.getItem("token")
    try {
      const response = await fetch("http://localhost:8080/tecnicos", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`
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
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
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
  <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
    <ToastContainer />
    <Menu />
    <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-5xl mx-auto rounded-lg">
      <h1 className="text-center text-black text-sm mb-6 font-bold">
        👨‍🔧 LISTA DE TÉCNICOS
      </h1>

      {editingTech && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-95 flex justify-center items-center z-50">
          <div className="bg-gray-300 border-4 border-black p-6 rounded shadow-[4px_4px_0_#000] max-w-md w-full text-black">
            <h2 className="text-xs text-center font-bold mb-4">✏️ EDITAR TÉCNICO</h2>
            <form onSubmit={handleUpdateTech} className="space-y-4">
              <input
                type="text"
                name="nombreTecnico"
                value={editingTech.nombreTecnico}
                onChange={handleInputChange}
                placeholder="Nombre del técnico"
                className="w-full p-2 bg-yellow-50 border-2 border-black text-black text-xs"
              />
              <input
                type="text"
                name="apellidoTecnico"
                value={editingTech.apellidoTecnico}
                onChange={handleInputChange}
                placeholder="Apellido del técnico"
                className="w-full p-2 bg-yellow-50 border-2 border-black text-black text-xs"
              />
              <input
                type="email"
                name="correo"
                value={editingTech.correo}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
                className="w-full p-2 bg-yellow-50 border-2 border-black text-black text-xs"
              />
              <input
                type="number"
                name="numNomina"
                value={editingTech.numNomina}
                onChange={handleInputChange}
                placeholder="Número de nómina"
                className="w-full p-2 bg-yellow-50 border-2 border-black text-black text-xs"
              />
              <input
                type="date"
                name="fechaAlta"
                value={editingTech.fechaAlta}
                onChange={handleInputChange}
                className="w-full p-2 bg-yellow-50 border-2 border-black text-black text-xs"
              />
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="bg-red-400 hover:bg-red-500 border-2 border-black text-black py-2 px-4 text-xs shadow-[2px_2px_0_#000]"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 border-2 border-black text-black py-2 px-4 text-xs shadow-[2px_2px_0_#000]"
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-black"></div>
          <p className="ml-2 text-black text-xs font-bold">CARGANDO...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.idTecnico}
              className="bg-white p-3 border-4 border-black rounded shadow-[4px_4px_0_#000] text-black"
            >
              <h2 className="text-xs font-bold text-blue-700 mb-2">
                🆔 TÉCNICO {tech.idTecnico}
              </h2>
              <div className="grid grid-cols-1 text-[10px] gap-1">
                {Object.entries(tech).map(([key, value]) => (
                  <p
                    key={key}
                    className="bg-yellow-50 border border-black p-1 rounded"
                  >
                    <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong>{" "}
                    {value?.toString() || "N/A"}
                  </p>
                ))}
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleEdit(tech)}
                  className="bg-cyan-700 hover:bg-green-500 border-2 border-black text-white text-xs px-2 py-1 shadow-[2px_2px_0_#000]"
                >
                  EDITAR
                </button>
                <button
                  onClick={() => onDelete(tech.idTecnico)}
                  className="bg-gray-600 hover:bg-red-500 border-2 border-black text-white text-xs px-2 py-1 shadow-[2px_2px_0_#000]"
                >
                  ELIMINAR
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
