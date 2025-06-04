import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/email/send?to=${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al enviar solicitud de recuperación");
      }

      toast.success("Correo de recuperación enviado");
    } catch (err: any) {
      toast.error(err.message || "Error al enviar solicitud");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 rounded-lg w-full max-w-md">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🔑 RECUPERACIÓN DE CONTRASEÑA
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-purple-700 mb-4 font-bold">
              INGRESA TU CORREO ELECTRÓNICO
            </h2>

            <input
              className="border-2 border-black p-2 bg-yellow-50 text-black text-xs w-full"
              type="email"
              name="email"
              placeholder="Escribe tu correo"
              onChange={handleChange}
              required
            />
          </section>

          <button
            type="submit"
            className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
          >
            ENVIAR
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-black">
          <p className="mb-2 font-bold">¿YA TIENES UNA CUENTA?</p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 border-4 border-black rounded hover:bg-blue-700 transition-all shadow-[4px_4px_0_#000]"
          >
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
    </div>
  );
}
