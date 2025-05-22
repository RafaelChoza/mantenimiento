import React, { useState } from "react"
import type { RegisterUser } from "../types"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import Login from "./Login";


export default function UserRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterUser>({
    username: "",
    password: "",
    password_verification: "",
    firstname: "",
    lastname: "",
    country: ""
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    if (formData.password !== formData.password_verification) {
      toast.error("Fallo en la confirmación de Password")
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        // Se obtiene y parsea el error JSON devuelto por el GlobalExceptionHandler
        const errorData = await response.json();
        console.error("Error del backend:", errorData.message);
        toast.error(errorData.message || "Error en la solicitud al servidor");
        return;
      }

      const data = await response.json();

      console.log("Registro existoso", data)
      if (data.token) {
        console.log("Los datos fueron enviados con exito")
        toast.success("Registro de usuario realizado con exito")
        setTimeout(() => {
          navigate("/login");
        }, 5000);

      } else {
        console.log("Error al enviar los datos a la base de datos", data.message)
        toast.error(data.message || "Error al enviar los datos a la base de datos")
      }
    } catch (error) {
      console.error("Error de red al enviar los datos de registro de usuario", error);
      toast.error("Error de red al enviar los datos de registro de usuario")
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-lg border border-gray-300">
      <ToastContainer />
      <Link className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:scale-105" to="/login" >Login</Link>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800 uppercase tracking-wide">
        Registro de Usuario
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Información del Usuario</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="block text-black font-bold">
              Correo electrónico del usuario
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="email"
                name="username"
                placeholder="Debe ser un correo electrónico"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-black font-bold">
              Contraseña
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="password"
                name="password"
                placeholder="Contraseña del usuario"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-black font-bold">
              Confirmar contraseña
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="password"
                name="password_verification"
                placeholder="Vuelva a escribir la contraseña"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-black font-bold">
              Nombre
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="text"
                name="firstname"
                placeholder="Nombre del usuario"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-black font-bold">
              Apellido
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="text"
                name="lastname"
                placeholder="Apellido del usuario"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-black font-bold">
              País
              <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
                type="text"
                name="country"
                placeholder="País del usuario"
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 font-bold uppercase transition duration-300"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
