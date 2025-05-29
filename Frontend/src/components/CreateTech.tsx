import { useState } from "react";
import type { Tech } from "../types";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateTech() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Tech, "idTecnico">>({
    nombreTecnico: "",
    apellidoTecnico: "",
    correo: "",
    numNomina: 0,
    fechaAlta: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "numNomina" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/tecnicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Técnico creado con éxito");
        setTimeout(() => {
          navigate("/mantenimiento/tech-list");
        }, 5000);
      } else {
        toast.error(data.message || "Error al enviar los datos del técnico");
      }
    } catch (error) {
      console.error("Error de red al enviar los datos del técnico", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <ToastContainer />
      <Menu />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-5xl mx-auto rounded-lg">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          👨‍🔧 FORMULARIO PARA CREAR TÉCNICO
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-blue-700 mb-4 font-bold">
              INFORMACIÓN DEL TÉCNICO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                type="text"
                name="nombreTecnico"
                placeholder="Nombre del técnico"
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                type="text"
                name="apellidoTecnico"
                placeholder="Apellido del técnico"
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                type="number"
                name="numNomina"
                placeholder="Número de nómina"
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                type="date"
                name="fechaAlta"
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
          >
            GUARDAR TÉCNICO
          </button>
        </form>
      </div>
    </div>
  );
}
