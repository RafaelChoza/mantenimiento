import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const { username } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: username,
    oldPassword: "",
    newPassword: "",
    newPassword_confirmation: "",
  });

  useEffect(() => {
    if (username) {
      setFormData((prev) => ({ ...prev, username }));
    }
  }, [username]);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.oldPassword === formData.newPassword) {
      toast.error("La nueva contraseña no puede ser igual a la actual");
      return;
    }
    if (formData.newPassword !== formData.newPassword_confirmation) {
      toast.error("La nueva contraseña debe coincidir con la confirmación");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("El token está vacío");
        return;
      }

      const response = await fetch("http://localhost:8080/auth/update-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Contraseña actualizada correctamente");
        setTimeout(() => {
          navigate("/mantenimiento");
        }, 6000);
      } else {
        toast.error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error inesperado");
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
      <Menu />
      <ToastContainer />

      <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-3xl mx-auto rounded-lg">
        <h1 className="text-center text-black text-sm mb-6 font-bold">
          🔒 CAMBIO DE CONTRASEÑA
        </h1>

        <form onSubmit={handleSubmitPassword}>
          <section className="border-4 border-black bg-gray-400 p-6 rounded shadow-[4px_4px_0_#000]">
            <h2 className="text-xs text-blue-900 mb-4 font-bold">
              INFORMACIÓN DE SEGURIDAD
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "oldPassword", value: formData.oldPassword, type: "password", placeholder: "Contraseña actual" },
                { name: "newPassword", value: formData.newPassword, type: "password", placeholder: "Nueva contraseña" },
                { name: "newPassword_confirmation", value: formData.newPassword_confirmation, type: "password", placeholder: "Confirmar nueva contraseña" },
              ].map((field) => (
                <input
                  key={field.name}
                  className="border-2 border-black p-2 bg-blue-700 text-white text-xs"
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={handleChangePassword}
                  required
                />
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000] mt-6"
          >
            ACTUALIZAR CONTRASEÑA
          </button>
        </form>
      </div>
    </div>
  );
}
