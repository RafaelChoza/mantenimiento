import { useState } from "react";
import Menu from "../components/Menu";
import { toast, ToastContainer } from "react-toastify";

const UploadCSV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Por favor, selecciona un archivo");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8080/api/csv/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            const data = await response.text();
            toast.success(data);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            toast.error("Error al subir el archivo");
        }
    };

    return (
        <div className="min-h-screen bg-blue-900 text-white font-mono p-6">
            <ToastContainer />
            <Menu />
            <div className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 max-w-4xl mx-auto rounded-lg">
                <h1 className="text-center text-black text-sm mb-6 font-bold">
                    📁 SUBIR ARCHIVO CSV
                </h1>

                <section className="border-4 border-black bg-gray-400 p-6 rounded shadow-[4px_4px_0_#000]">
                    <h2 className="text-xs text-blue-700 mb-4 font-bold">
                        SELECCIONA UN ARCHIVO
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            className="border-2 border-black p-2 bg-blue-700 text-white text-xs"
                            type="file"
                            accept=".csv"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>
                </section>

                <button
                    onClick={handleUpload}
                    className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
                >
                    SUBIR ARCHIVO
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
