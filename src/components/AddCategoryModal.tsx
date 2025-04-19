import toast from "react-hot-toast";
import React, { useState } from "react";
import { addCategory } from "../services/categoryService";
import { CATEGORY_ICON_OPTIONS } from "../utils";
import { useAuth } from "../context/AuthContext";

interface Props {
  householdId: string;
  onClose: () => void;
}

const AddCategoryModal: React.FC<Props> = ({ householdId, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4F46E5"); // color por defecto
  const [icon, setIcon] = useState("FaShoppingCart");

  const handleSubmit = async () => {
    if (!user) return;

    await addCategory({
      name,
      color,
      icon,
      householdId,
    });

    toast.success("¡Categoría añadida con éxito!");
    onClose();
  };

  const selectedIcon =
    CATEGORY_ICON_OPTIONS.find((item) => item.name === icon) ??
    CATEGORY_ICON_OPTIONS.find((item) => item.name === "default");

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Añadir nueva categoría</h2>

        <input
          className="w-full mb-2 p-2 border"
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block mb-2 font-medium">Color</label>
        <input
          className="w-full mb-4 p-2 h-12 rounded border"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label className="block mb-2 font-medium">Icono</label>
        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto mb-4 border p-2 rounded">
          {CATEGORY_ICON_OPTIONS.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`p-2 rounded border ${
                icon === item.name ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
              onClick={() => setIcon(item.name)}
            >
              {React.cloneElement(item.icon, { fontSize: "medium" })}
            </button>
          ))}
        </div>

        {/* Previsualización */}
        <div className="mt-4 mb-6">
          <p className="font-medium mb-1">Previsualización:</p>
          <div
            className="p-4 rounded text-white text-center shadow"
            style={{ backgroundColor: color }}
          >
            <div className="mb-2">
              {React.cloneElement(selectedIcon!.icon, {
                fontSize: "large",
                style: { color: "#ffffffcc" },
              })}
            </div>
            <h1 className="text-lg font-bold">
              {name || "Nombre de categoría"}
            </h1>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
            disabled={!name}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
