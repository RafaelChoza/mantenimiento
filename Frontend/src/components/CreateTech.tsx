import { useState } from "react";
import type { Tech } from "../types"
import Menu from "../components/Menu"
import { toast, ToastContainer } from "react-toastify";



export default function CreateTech() {
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
        console.log(formData);
        try {
            const response = await fetch("http://localhost:8080/tecnicos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log("Datos del técnico enviados con éxito")
                toast.success("Tecnico creado con exito")
            } else {
                console.log("Error al enviar los datos del técnico")
            }
        } catch (error) {
            console.error("Error de red al enviar los datos del técnico", error)
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-lg border border-gray-300">
            <ToastContainer />
            <Menu/>
            <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800 uppercase tracking-wide">
                Formulario para crear Técnico
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
                    <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Información del Técnico</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="nombreTecnico"
                            placeholder="Nombre del técnico"
                            onChange={handleChange}
                        />
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="apellidoTecnico"
                            placeholder="Apellido del técnico"
                            onChange={handleChange}
                        />
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                            onChange={handleChange}
                        />
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="number"
                            name="numNomina"
                            placeholder="Número de nómina"
                            onChange={handleChange}
                        />
                        <input
                            className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                            type="date"
                            name="fechaAlta"
                            placeholder="Fecha de alta"
                            onChange={handleChange}
                        />
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
    );
}

