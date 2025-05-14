import { useEffect, useState } from "react";
import type { Tech } from "../types";

export default function TechList() {
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
      console.log(data);
      setTechs(data.responseEntity.body);
    } catch (error) {
      console.error("Error al obtener los datos de los técnicos", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-800 uppercase">👨‍🔧 Lista de Técnicos</h1>

      {cargando ? (
        <div className="flex justify-center items-center h-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p className="ml-2 text-blue-600 text-sm font-semibold">Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {techs.map(tech => (
            <div key={tech.id} className="bg-white p-3 rounded-md shadow-sm border-l-2 border-blue-500 hover:shadow-md transition-all">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                🆔 Técnico #{tech.id}
              </h2>
              <hr className="mb-2 border-blue-300" />

              <div className="grid grid-cols-2 gap-1 text-xs text-gray-800">
                {Object.entries(tech).map(([key, value]) => (
                  <p key={key} className="bg-gray-100 p-1 rounded-md shadow-xs">
                    <strong className="text-blue-600">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong> {value?.toString() || "N/A"}
                  </p>
                ))}
              </div>

              <div className="mt-2 flex justify-between">
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

