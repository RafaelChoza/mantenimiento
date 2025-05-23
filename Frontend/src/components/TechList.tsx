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
  <div className="max-w-6xl mx-auto p-6 bg-blue-100 border-4 border-black shadow-[6px_6px_0_#333] rounded-lg">
    <ToastContainer />
    <Menu />
    <h1
      className="text-center text-blue-700 text-sm mb-6"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      👨‍🔧 Lista de Técnicos
    </h1>

    {editingTech && (
      <div className="fixed inset-0 bg-blue-100 bg-opacity-90 flex justify-center items-center z-50">
        <div className="bg-white p-6 border-4 border-black rounded-lg shadow-[6px_6px_0_#333] max-w-md w-full">
          <h2
            className="text-xs text-blue-700 mb-4 text-center"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            ✏️ Editar Técnico
          </h2>
          <form onSubmit={handleUpdateTech} className="space-y-4">
            <input
              type="text"
              name="nombreTecnico"
              value={editingTech.nombreTecnico}
              onChange={handleInputChange}
              placeholder="Nombre del técnico"
              className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <input
              type="text"
              name="apellidoTecnico"
              value={editingTech.apellidoTecnico}
              onChange={handleInputChange}
              placeholder="Apellido del técnico"
              className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <input
              type="email"
              name="correo"
              value={editingTech.correo}
              onChange={handleInputChange}
              placeholder="Correo"
              className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <input
              type="number"
              name="numNomina"
              value={editingTech.numNomina}
              onChange={handleInputChange}
              placeholder="Número de nómina"
              className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <input
              type="date"
              name="fechaAlta"
              value={editingTech.fechaAlta}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-black bg-yellow-50 text-black text-xs"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setEditingTech(null)}
                className="bg-red-400 border-4 border-black text-black px-4 py-2 text-xs hover:bg-red-500 transition-all shadow-[4px_4px_0_#333]"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-400 border-4 border-black text-black px-4 py-2 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#333]"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-black"></div>
        <p className="ml-2 text-blue-700 text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
          Cargando...
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {techs.map((tech) => (
          <div
            key={tech.idTecnico}
            className="bg-white p-4 border-4 border-black rounded shadow-[4px_4px_0_#333] hover:shadow-[6px_6px_0_#333] transition-all"
          >
            <h2
              className="text-xs text-blue-700 mb-2"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              🆔 Técnico {tech.idTecnico}
            </h2>
            <hr className="mb-2 border-black" />
            <div className="grid grid-cols-1 gap-1 text-xs text-black">
              {Object.entries(tech).map(([key, value]) => (
                <p
                  key={key}
                  className="bg-blue-50 border border-black p-1 rounded shadow-sm"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                  <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong> {value?.toString() || "N/A"}
                </p>
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <button
                className="bg-yellow-300 border-4 border-black text-black px-3 py-1 text-xs hover:bg-yellow-400 transition-all shadow-[3px_3px_0_#333]"
                onClick={() => handleEdit(tech)}
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(tech.idTecnico)}
                className="bg-red-400 border-4 border-black text-black px-3 py-1 text-xs hover:bg-red-500 transition-all shadow-[3px_3px_0_#333]"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
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
