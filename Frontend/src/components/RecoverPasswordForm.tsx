import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export default function RecoverPasswordForm() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Datos antes de enviar:", { username, newPassword, newPassword2 });
      const response = await fetch("http://localhost:8080/email/actualizar-contrasena-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword, newPassword2 }),
      });


      if (!response.ok) {
        throw new Error("Error al restablecer contraseña");
      }

      toast.success("Contraseña restablecida con éxito");

      // 🚀 Navegar a la página de inicio de sesión después de cambiar la contraseña
      navigate("/login");

    } catch (err: any) {
      toast.error(err.message || "Error al restablecer contraseña");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 rounded-lg w-full max-w-md">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🔑 RESTABLECER CONTRASEÑA
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </section>

          <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-purple-700 mb-4 font-bold">
              INGRESA TU NUEVA CONTRASEÑA
            </h2>
            <input
              className="border-2 border-black p-2 bg-yellow-50 text-black text-xs w-full"
              type="password"
              name="password"
              placeholder="Escribe tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </section>

          <section className="border-4 border-black bg-white p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-purple-700 mb-4 font-bold">
              CONFIRMA TU NUEVA CONTRASEÑA
            </h2>
            <input
              className="border-2 border-black p-2 bg-yellow-50 text-black text-xs w-full"
              type="password"
              name="password2"
              placeholder="Confirma tu nueva contraseña"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </section>

          <button
            type="submit"
            className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
          >
            RESTABLECER CONTRASEÑA
          </button>
        </form>
      </div>
    </div>
  );
}
