import React from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import { darkenColor } from "../utils";

const Categories: React.FC = () => {
  const { categories, error } = useCategoriesContext();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3 className="text-xl font-bold">Gestionar Categorías</h3>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border-2 rounded-sm p-2 my-1 text-white"
          style={{
            backgroundColor: cat.color,
            borderColor: darkenColor(cat.color, 5),
          }}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
