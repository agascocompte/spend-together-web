// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { signInWithGoogle as googleSignIn } from "../services/authService";

interface AuthContextType {
  user: any; // Define el tipo de usuario según tus necesidades
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signInWithGoogle = async () => {
    const userData = await googleSignIn();
    setUser(userData);
    // Aquí podrías redireccionar o gestionar estados adicionales
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
