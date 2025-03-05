import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase";
import {
  signInWithGoogle as googleSignIn,
  signOutUser as firebaseSignOutUser,
} from "../services/authService";

interface AuthContextType {
  user: any; // Define el tipo de usuario
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  const signInWithGoogle = async () => {
    const userData = await googleSignIn();
    setUser(userData);
  };

  const signOutUser = async () => {
    await firebaseSignOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
