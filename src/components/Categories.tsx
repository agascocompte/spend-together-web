import { useEffect } from "react";
import useCategories from "../hooks/useCategories";
import { useHousehold } from "../context/HouseholdContext";

const Categories: React.FC = () => {
  const { householdId } = useHousehold();
  const { categories, error } = useCategories(householdId ?? "");

  useEffect(() => {
    console.log("Categorías:", categories);
  }, [categories]);
  return (
    <div>
      <h3 className="text-xl font-bold">Gestionar Categorías</h3>
      <p>Lista de categorías...</p>
    </div>
  );
};

export default Categories;
