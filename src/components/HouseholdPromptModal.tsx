import React, { useState } from "react";
import { useHousehold } from "../context/HouseholdContext";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  onClose: (shouldNavigate: boolean) => void;
}

const HouseholdPromptModal: React.FC<Props> = ({ userId, onClose }) => {
  const { createNewHousehold, joinHousehold } = useHousehold();
  const [joinId, setJoinId] = useState("");

  const handleCreate = async () => {
    await createNewHousehold(userId);
    toast.success("Grupo creado");
    onClose(true); // ✅ sí navegar
  };

  const handleJoin = async () => {
    if (!joinId.trim()) {
      toast.error("Introduce un ID válido");
      return;
    }
    try {
      await joinHousehold(userId, joinId.trim());
      toast.success("Unido al grupo");
      onClose(true); // ✅ sí navegar
    } catch {
      toast.error("ID no válido");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4">Configurar grupo</h2>
        <p className="text-sm mb-4">
          No tienes un grupo. ¿Quieres crear uno o unirte a uno existente?
        </p>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="ID del grupo (para unirse)"
            value={joinId}
            onChange={(e) => setJoinId(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => onClose(false)} // ❌ no navegar
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleJoin}
          >
            Unirse
          </button>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={handleCreate}
          >
            Crear nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseholdPromptModal;
