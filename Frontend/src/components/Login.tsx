import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data.token)
      window.location.href = "/mantenimiento";
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-800 uppercase tracking-wide">
        Administración de Mantenimientos Correctivos
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded hover:from-blue-700 hover:to-purple-700 font-semibold transition duration-300"
        >
          Entrar
        </button>
      </form>
      <div className="p-3 bg-white m-5 rounded-xl flex flex-col">
        <p className="font-bold">¿No estas registrado?</p>
        <Link className="text-center bg-blue-600 rounded-2xl hover:scale-105 m-2 text-white font-bold" to="/user-register">Registrate</Link>
      </div>
    </div>
  );
}
