import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHousehold } from "../context/HouseholdContext";
import HouseholdPromptModal from "../components/HouseholdPromptModal";

const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { fetchHousehold } = useHousehold();
  const [showModal, setShowModal] = useState(false);
  const uidRef = useRef<string | null>(null); // 👈 guardamos uid temporalmente

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const uid = user.uid;

      uidRef.current = uid;
      const foundHouseholdId = await fetchHousehold(uid); // ahora retorna string | null

      if (!foundHouseholdId) {
        setShowModal(true);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error);
    }
  };

  return (
    <div className="h-screen flex flex-row">
      <div className="flex-2 flex flex-col items-center justify-center text-white p-8 bg-gradient-to-br from-purple-700 to-purple-500">
        <img src="icon_white.svg" alt="Logo" className="w-96 h-96 mb-8" />
        <h1 className="text-5xl font-bold mb-4">Spend Together</h1>
        <p className="text-lg">
          Organiza tus gastos con facilidad y colabora en grupo
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Iniciar sesión
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Bienvenid@, inicia sesión para continuar
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="
                flex items-center
                bg-blue-500
                text-white
                border-3 border-transparent
                rounded-md
                shadow                
                m-auto
                pr-2
                font-medium
                transition-all duration-200
                hover:border-3 hover:border-blue-300/50 hover:bg-blue-500/95
                cursor-pointer"
          >
            <img
              className="w-10 h-10 mr-2 bg-white rounded"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
            />
            <span className="text-white font-medium">
              Iniciar sesión con Google
            </span>
          </button>
        </div>
      </div>
      {showModal && uidRef.current && (
        <HouseholdPromptModal
          userId={uidRef.current}
          onClose={(shouldNavigate) => {
            setShowModal(false);
            if (shouldNavigate) {
              navigate("/home");
            }
          }}
        />
      )}
    </div>
  );
};

export default LoginPage;
