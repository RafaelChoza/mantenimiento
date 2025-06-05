import { createContext, useContext, useState } from "react";
import type { EmailContextType } from "../types";

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
    const [email, setEmail] = useState<string>("");

    return (
        <EmailContext.Provider value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmail() {
    const context = useContext(EmailContext);
    if (!context) {
        throw new Error("useEmail debe usarse dentro de un EmailProvider");
    }
    return context;
}
