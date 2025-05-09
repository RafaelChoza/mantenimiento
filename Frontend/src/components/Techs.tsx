import { useEffect, useState } from "react";
import type { Tech } from "../types";

export default function Techs() {
    const [techs, setTechs] = useState<Tech[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        getTechs();
    }, []);

    const getTechs = async () => {
        setCargando(true);
        try {
            const response = await fetch("http://localhost:8080/tecnicos");
            const data = await response.json();
            console.log("Datos obtenidos:", data);
            setTechs(data.responseEntity?.body || []);
        } catch (error) {
            console.error("Error al obtener los datos", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <h1>Listado de técnicos</h1>

            {cargando ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                    <p className="ml-4 text-blue-500">Cargando...</p>
                </div>
            ) : (
                <ul>
                    {techs.map((tech) => (
                        <li key={tech.id}>
                            {tech.nombreTecnico} {tech.apellidoTecnico} - {tech.correo} - {tech.numNomina} - {tech.fechaAlta}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
