import toast from "react-hot-toast";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { addCategory, updateCategory } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";
import { Category } from "../models/Category";
import { CATEGORY_ICON_OPTIONS } from "../utils/icons";

interface Props {
  householdId: string;
  onClose: () => void;
  editingCategory?: Category | null;
}

const AddCategoryModal: React.FC<Props> = ({
  householdId,
  onClose,
  editingCategory,
}) => {
  const { user } = useAuth();
  const [name, setName] = useState(editingCategory?.name || "");
  const [color, setColor] = useState(editingCategory?.color || "#4F46E5");
  const [icon, setIcon] = useState(editingCategory?.icon || "shopping_cart");

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (editingCategory) {
        await updateCategory({
          ...editingCategory,
          name,
          color,
          icon,
        });
        toast.success("Categoría actualizada");
      } else {
        await addCategory({
          name,
          color,
          icon,
          householdId,
        });
        toast.success("¡Categoría añadida con éxito!");
      }
      onClose();
    } catch (err) {
      toast.error("Error al guardar la categoría");
    }
  };

  const selectedIcon =
    CATEGORY_ICON_OPTIONS.find((item) => item.name === icon) ??
    CATEGORY_ICON_OPTIONS.find((item) => item.name === "default");

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1c]/70 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/30 ring-1 ring-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          {editingCategory ? "Editar categoría" : "Añadir nueva categoría"}
        </h2>

        <input
          className="w-full mb-4 p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Color</label>
        <input
          className="w-full mb-4 p-2 h-12 rounded-lg border border-white/30 bg-white/10"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label className="block mb-2 font-medium">Icono</label>
        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto mb-4 border border-white/30 p-2 rounded-lg bg-white/10">
          {CATEGORY_ICON_OPTIONS.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`p-2 rounded-lg border transition ${
                icon === item.name
                  ? "bg-white/30 border-white"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
              onClick={() => setIcon(item.name)}
            >
              {React.cloneElement(item.icon, { style: { color: "#ffffffcc" } })}
            </button>
          ))}
        </div>

        {/* Previsualización */}
        <div className="mt-4 mb-6">
          <p className="font-medium mb-1">Previsualización:</p>
          <div
            className="p-4 rounded-xl text-white text-center shadow-lg"
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

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white shadow cursor-pointer"
            disabled={!name}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default AddCategoryModal;
