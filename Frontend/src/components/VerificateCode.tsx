import React, { useState, useRef } from "react";

export default function VerificateCode() {
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value;
        if (!/^\d?$/.test(val)) return; // Solo dígitos o vacío

        const newCode = [...code];
        newCode[index] = val;
        setCode(newCode);

        if (val && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log("Código ingresado:", verificationCode);
        // Aquí puedes agregar lógica para enviar el código al backend
    };

    return (
        <div className="min-h-screen bg-blue-900 text-white font-mono flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-300 text-black border-4 border-black shadow-[4px_4px_0_#000] p-6 rounded-lg w-full max-w-sm"
            >
                <h1 className="text-center text-black text-sm mb-6 font-bold">
                    🔢 INGRESA EL CÓDIGO DE VERIFICACIÓN
                </h1>

                <div className="flex justify-between space-x-4 mb-6">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-black font-bold border-4 border-black rounded shadow-[4px_4px_0_#000] bg-yellow-50"
                            value={digit}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            ref={(el) => {
                                inputsRef.current[idx] = el;
                            }}
                            inputMode="numeric"
                            pattern="\d*"
                            autoComplete="one-time-code"
                            aria-label={`Dígito ${idx + 1}`}
                        />
                    ))}

                </div>

                <button
                    type="submit"
                    className="w-full bg-green-400 border-4 border-black text-black p-3 text-xs hover:bg-green-500 transition-all shadow-[4px_4px_0_#000]"
                >
                    VALIDAR CÓDIGO
                </button>
            </form>
        </div>
    );
}
