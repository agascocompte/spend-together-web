import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebaseApp from "../firebase";
import {
  signInWithGoogle as googleSignIn,
  signOutUser as firebaseSignOutUser,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<User>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {
    throw new Error("signInWithGoogle no implementado");
  },
  signOutUser: async () => {
    throw new Error("signOutUser no implementado");
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  const signInWithGoogle = async (): Promise<User> => {
    const userCredential = await googleSignIn(); // asegúrate de que esto devuelva UserCredential
    const currentUser = userCredential;
    setUser(currentUser);
    return currentUser;
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
