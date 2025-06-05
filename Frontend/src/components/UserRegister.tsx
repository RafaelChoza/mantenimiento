import React, { useState } from "react";
import type { RegisterUser } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterUser>({
    id: 0,
    username: "",
    password: "",
    password_verification: "",
    firstname: "",
    lastname: "",
    country: "",
    role: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.password_verification) {
      toast.error("Fallo en la confirmación de Password");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error en la solicitud al servidor");
        return;
      }

      const data = await response.json();

      if (data.token) {
        toast.success("Registro de usuario realizado con éxito");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(data.message || "Error al enviar los datos a la base de datos");
      }
    } catch (error) {
      toast.error("Error de red al enviar los datos de registro de usuario");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 rounded-lg w-full max-w-3xl">
        <Link
          to="/login"
          className="inline-block mb-4 bg-blue-400 border-4 border-black text-black px-4 py-2 text-xs hover:bg-blue-500 transition-all shadow-[4px_4px_0_#000]"
        >
          VOLVER AL LOGIN
        </Link>
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🧑‍💻 REGISTRO DE USUARIO
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-blue-700 mb-4 font-bold">
              INFORMACIÓN DEL USUARIO
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "username", type: "email", placeholder: "Correo electrónico" },
                { name: "password", type: "password", placeholder: "Contraseña" },
                { name: "password_verification", type: "password", placeholder: "Confirmar contraseña" },
                { name: "firstname", type: "text", placeholder: "Nombre" },
                { name: "lastname", type: "text", placeholder: "Apellido" },
                { name: "country", type: "text", placeholder: "País" },
              ].map((field) => (
                <input
                  key={field.name}
                  className="border-2 border-black p-2 bg-yellow-50 text-black text-xs"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  required
                />
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
          >
            REGISTRAR USUARIO
          </button>
        </form>
      </div>
    </div>
  );
}
