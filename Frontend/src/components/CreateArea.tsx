import { useState } from "react";
import Menu from "../components/Menu"
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
        console.log(formData);
        try {
            const response = await fetch("http://localhost:8080/areas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Área creada con éxito");
                toast.success("Area creada con exito")

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
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-lg border border-gray-300">
            <ToastContainer />
            <Menu/>
            <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800 uppercase tracking-wide">
                Formulario para Agregar Área
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
                    <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Información del Área</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="areaName"
                            placeholder="Nombre del área"
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 font-bold uppercase transition duration-300"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}
