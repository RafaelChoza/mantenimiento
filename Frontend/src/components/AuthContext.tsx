import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { MyToken, AuthContextType } from "../types";


const AuthContext = createContext<AuthContextType>({ role: null, username: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<MyToken>(token);
      setRole(decoded.role);
      setUsername(decoded.sub);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
