import React, { useState } from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import AddCategoryModal from "./AddCategoryModal";
import { useHousehold } from "../context/HouseholdContext";
import { Category } from "../models/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { darkenColor } from "../utils/colors";
import { getIconForCategory } from "../utils/icons";

const Categories: React.FC = () => {
  const { categories, error } = useCategoriesContext();
  const { householdId } = useHousehold();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteClick = (cat: Category) => {
    setCategoryToDelete(cat);
  };

  if (error) return <p className="text-white">Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Categorías</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition cursor-pointer"
        >
          + Añadir Categoría
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[...categories]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((cat) => {
            const baseColor = cat.color;
            const darkColor = darkenColor(baseColor, 15);

            return (
              <div
                key={cat.id}
                className="relative group rounded-2xl p-4 text-white text-center transition-all overflow-hidden shadow-xl backdrop-blur-md hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}, ${darkColor})`,
                  border: `1px solid ${darkenColor(baseColor, 30)}`,
                }}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />

                {/* Icono */}
                <div className="mb-2">
                  {React.cloneElement(getIconForCategory(cat.icon), {
                    className: "mx-auto",
                    style: {
                      color: "white",
                      fontSize: "64px",
                    },
                  })}
                </div>

                <h1 className="text-lg font-bold mb-1">{cat.name}</h1>

                {/* Botones flotantes */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button
                    title="Editar"
                    className="w-8 h-8 bg-white text-gray-800 flex items-center justify-center rounded-md shadow hover:scale-105 hover:bg-gray-100 transition transform cursor-pointer"
                    onClick={() => handleEdit(cat)}
                  >
                    <EditIcon fontSize="small" />
                  </button>

                  <button
                    title="Borrar"
                    className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-md shadow hover:scale-105 hover:bg-red-600 transition transform cursor-pointer"
                    onClick={() => handleDeleteClick(cat)}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {showModal && householdId && (
        <AddCategoryModal
          householdId={householdId}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
          editingCategory={editingCategory}
        />
      )}

      {categoryToDelete && (
        <DeleteCategoryModal
          category={categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
        />
      )}
    </div>
  );
};

export default Categories;
