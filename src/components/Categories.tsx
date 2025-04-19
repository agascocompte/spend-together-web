import React, { useState } from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import { darkenColor, getIconForCategory } from "../utils";
import AddCategoryModal from "./AddCategoryModal";
import { useHousehold } from "../context/HouseholdContext";

const Categories: React.FC = () => {
  const { categories, error } = useCategoriesContext();
  const { householdId } = useHousehold();
  const [showModal, setShowModal] = useState(false);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Gestionar Categorías</h3>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition-colors"
      >
        + Añadir Categoría
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border-2 rounded-sm p-2 my-1 text-white text-center"
            style={{
              backgroundColor: cat.color,
              borderColor: darkenColor(cat.color, 5),
            }}
          >
            <div>
              {React.cloneElement(getIconForCategory(cat.icon), {
                className: "mx-auto",
                style: { color: darkenColor(cat.color, 20), fontSize: "64px" },
              })}
            </div>
            <h1 className="text-lg font-bold">{cat.name}</h1>
          </div>
        ))}
      </div>

      {showModal && householdId && (
        <AddCategoryModal
          householdId={householdId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Categories;
