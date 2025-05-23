import { useState } from "react";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateArea() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ area: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Área creada con éxito");
        setTimeout(() => {
          navigate("/mantenimiento/area-list");
        }, 5000);
      } else {
        console.log("Error al crear el área");
      }
    } catch (error) {
      console.error("Error de red al enviar los datos del área", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-yellow-100 border-4 border-black shadow-[6px_6px_0_#333] rounded-lg">
      <ToastContainer />
      <Menu />
      <h1
        className="text-center text-yellow-700 text-sm mb-6"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        🏢 Formulario para Agregar Área
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#333]">
          <h2
            className="text-xs text-blue-700 mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            Información del Área
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
              type="text"
              name="areaName"
              placeholder="Nombre del área"
              onChange={handleChange}
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#333]"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
