import { useEffect, useState } from "react";
import type { RegisterUser, RegisterUserUpdate, Role } from "../types";
import Menu from "./Menu";
import { toast, ToastContainer } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState<RegisterUser[]>([]);
  const [cargando, setCargando] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RegisterUser | null>(null);
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [formData, setFormData] = useState<RegisterUserUpdate>({
    firstname: selectedUser?.firstname ?? "",
    lastname: selectedUser?.lastname ?? "",
    country: selectedUser?.country ?? "",
    oldPassword: "",
    newPassword: "",
    newPassword_confirmation: ""
  })

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const getUsers = async () => {
    setCargando(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/mantenimiento/users", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Datos obtenidos:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    } finally {
      setCargando(false);
    }
  };

  const getRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/mantenimiento/roles", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) { throw new Error("Error al obtener los roles") }
      const data = await response.json();
      console.log(data)
      setRoles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (user: RegisterUser) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const openModalEdit = (user: RegisterUser) => {
    setSelectedUser(user);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setSelectedUser(null);
    setShowModalEdit(false);
  };

  const handleRoleChange = async (newRoleId: string) => {
    if (selectedUser) {
      try {
        const newRole = roles.find(role => role.id.toString() === newRoleId);
        if (!newRole) throw new Error("Rol no encontrado");
        const response = await fetch(`http://localhost:8080/mantenimiento/users/${selectedUser.id}/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ role: newRole.name })
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al actualizar el rol: ${errorText}`);
        }
        setUsers(prev => prev.map(user => user.id === selectedUser.id ? { ...user, role: newRole.name } as unknown as RegisterUser : user));
        closeModal();
      } catch (error) {
        console.error("Error al cambiar el rol:", error);
      }
    }
  };

  const handleOnChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstname: selectedUser.firstname,
        lastname: selectedUser.lastname,
        country: selectedUser.country,
        oldPassword: "",
        newPassword: "",
        newPassword_confirmation: ""
      });
    }
  }, [selectedUser]);

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Validaciones previas
  if (!formData.newPassword || !formData.newPassword_confirmation || !formData.oldPassword) {
    toast.error("Todos los campos son obligatorios.");
    return;
  }

  if (formData.newPassword !== formData.newPassword_confirmation) {
    toast.error("Fallo en la confirmación de Password");
    return;
  }

  if (formData.oldPassword === formData.newPassword) {
    toast.error("El nuevo password no puede ser igual al actual");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No se encontró el token de autenticación");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/update-password", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Validar la respuesta del servidor
    if (!response.ok) {
      try {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al enviar los datos al servidor");
      } catch {
        toast.error("Error desconocido en el servidor");
      }
      return;
    }

    // Mostrar mensaje de éxito
    toast.success("El password fue actualizado con éxito");
  } catch (error) {
    console.error("Error en la solicitud:", error);
    toast.error("Error inesperado");
  }
};


  return (
    <div className="container mx-auto p-6 relative">
      <Menu />
      <ToastContainer />
      <h1
        className="text-2xl mb-6 text-center text-blue-900 drop-shadow-lg"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Lista de Usuarios
      </h1>

      {cargando ? (
        <p
          className="text-center text-black text-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Cargando...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-green-200 border-4 border-black shadow-[4px_4px_0_#333] p-4 text-xs text-black"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <p><strong>👤 Usuario:</strong> {user.username}</p>
              <p><strong>📛 Nombre:</strong> {user.firstname} {user.lastname}</p>
              <p><strong>🌍 País:</strong> {user.country}</p>
              <p><strong>🛡️ Rol:</strong> {user.role}</p>
              <div>
                <button
                  className="m-2 border-2 border-black p-2 bg-pink-800 text-white hover:bg-pink-600"
                  onClick={() => openModal(user)}
                >
                  Cambiar Rol
                </button>
                <button
                  className="m-2 border-2 border-black p-2 bg-blue-600 text-white hover:bg-blue-900"
                  onClick={() => openModalEdit(user)}
                >
                  Editar Usuario
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-cyan-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-yellow-300 p-6 border-4 border-black shadow-lg text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
            <h2 className="text-lg mb-4">Cambiar Rol para {selectedUser.username}</h2>
            <ul className="mb-4">
              {roles.map((role) => (
                <li key={role.id}>
                  <button className="m-1 p-2 border-2 border-black bg-blue-500 text-white hover:bg-blue-700 text-base" onClick={() => handleRoleChange(role.id.toString())} >
                    {role.name}
                  </button>

                </li>
              ))}
            </ul>
            <button
              className="mt-2 p-2 border-2 border-black bg-red-500 text-white hover:bg-red-700"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showModalEdit && selectedUser && (
        <section>
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-green-200 border-4 border-black shadow-[4px_4px_0_#333] p-4 text-xs text-black"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <div>
                <div className="fixed inset-0 bg-cyan-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-indigo-300 p-6 border-4 border-black shadow-lg text-xs" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                    <h2 className="text-lg mb-4">Editar Usuario <strong className="text-red-800">{selectedUser.username}</strong> </h2>
                    <form onSubmit={handleSubmitUpdate} className="mb-4 flex flex-col">
                      <input onChange={handleOnChangeUpdate} name="firstname" type="text" value={formData.firstname} className="bg-white p-2 m-2 border-2" />
                      <input onChange={handleOnChangeUpdate} name="lastname" type="text" value={formData.lastname} className="bg-white p-2 m-2 border-2" />
                      <input onChange={handleOnChangeUpdate} name="country" type="text" value={formData.country} className="bg-white p-2 m-2 border-2" />
                      <input onChange={handleOnChangeUpdate} name="oldPassword" type="password" placeholder="contraseña actual" className="bg-white p-2 m-2 border-2" />
                      <input onChange={handleOnChangeUpdate} name="newPassword" type="password" placeholder="contraseña nueva" className="bg-white p-2 m-2 border-2" />
                      <input onChange={handleOnChangeUpdate} name="newPassword_confirmation" type="password" placeholder="repetir contraseña" className="bg-white p-2 m-2 border-2" />
                      <button className="border-2 p-2 bg-orange-500 text-white m-3 hover:bg-orange-700">
                        Enviar Cambios
                      </button>
                    </form>
                    <button
                      className="mt-2 p-2 border-2 border-black bg-red-500 text-white hover:bg-red-700"
                      onClick={closeModalEdit}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </section>

      )}
    </div>
  );
}
