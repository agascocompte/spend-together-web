import React from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import { darkenColor, getIconForCategory } from "../utils";

const Categories: React.FC = () => {
  const { categories, error } = useCategoriesContext();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3 className="text-xl font-bold">Gestionar Categorías</h3>
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
};

export default Categories;
