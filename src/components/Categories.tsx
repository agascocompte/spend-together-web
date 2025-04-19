import React, { useState } from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import { darkenColor, getIconForCategory } from "../utils";
import AddCategoryModal from "./AddCategoryModal";
import { useHousehold } from "../context/HouseholdContext";
import { Category } from "../models/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCategoryModal from "./DeleteCategoryModal";

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

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Categorías</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          + Añadir Categoría
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative group border-2 rounded-sm p-2 my-1 text-white text-center transition-all"
            style={{
              backgroundColor: cat.color,
              borderColor: darkenColor(cat.color, 5),
            }}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 rounded-sm transition-opacity pointer-events-none" />

            {/* Icono */}
            <div>
              {React.cloneElement(getIconForCategory(cat.icon), {
                className: "mx-auto",
                style: { color: darkenColor(cat.color, 20), fontSize: "64px" },
              })}
            </div>
            <h1 className="text-lg font-bold">{cat.name}</h1>

            {/* Botones flotantes */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
        ))}
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
