import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      toast.success("Inicio de sesión exitoso");
      setTimeout(() => {
        window.location.href = "/mantenimiento";
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-blue-100 border-4 border-black shadow-[6px_6px_0_#333] rounded-lg mt-10">
      <ToastContainer />
      <h1
        className="text-center text-blue-700 text-sm mb-6"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        🔐 Iniciar Sesión
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#333]">
          <h2
            className="text-xs text-purple-700 mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            Credenciales de Usuario
          </h2>

          {error && (
            <p className="text-red-600 text-xs mb-4 text-center font-bold">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4">
            <input
              className="border-2 border-black p-2 bg-blue-50 text-black text-xs"
              type="text"
              name="username"
              placeholder="Usuario"
              onChange={handleChange}
              required
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
            <input
              className="border-2 border-black p-2 bg-blue-50 text-black text-xs"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#333]"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-black">
        <p className="mb-2" style={{ fontFamily: '"Press Start 2P", cursive' }}>
          ¿No estás registrado?
        </p>
        <Link
          to="/user-register"
          className="inline-block bg-blue-600 text-white px-4 py-2 border-4 border-black rounded hover:bg-blue-700 transition-all shadow-[4px_4px_0_#333]"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
}
