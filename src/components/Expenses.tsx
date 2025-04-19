import React, { useState } from "react";
import { useHousehold } from "../context/HouseholdContext";
import { useCategoriesContext } from "../context/CategoriesContext";
import AddExpenseModal from "./AddExpenseModal";
import { Expense } from "../models/Expense";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useExpensesContext } from "../context/ExpensesContent";
import { getIconForCategory } from "../utils";
import DeleteExpenseModal from "./DeleteExpenseModal";

const Expenses: React.FC = () => {
  const { householdId } = useHousehold();
  const { expenses, error } = useExpensesContext();
  const { categories } = useCategoriesContext();

  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const formatDate = (date: any) => {
    const parsed = date?.toDate ? date.toDate() : new Date(date);
    return parsed.toLocaleDateString();
  };

  const getCategoryStyle = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return {
      backgroundColor: cat?.color || "#e5e7eb",
      borderColor: cat?.color || "#e5e7eb",
      color: "#fff",
    };
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sin categoría";
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Gastos</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          + Añadir Gasto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="relative group border-2 rounded-sm p-4 my-1 text-white transition-all overflow-hidden flex flex-col justify-between"
            style={getCategoryStyle(expense.categoryId)}
          >
            {/* Overlay al pasar ratón */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm pointer-events-none" />

            {/* Contenido principal */}
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {React.cloneElement(
                  getIconForCategory(
                    categories.find((c) => c.id === expense.categoryId)?.icon ??
                      "default"
                  ),
                  { style: { fontSize: 24, color: "white" } }
                )}
                <span className="font-semibold text-lg">
                  {getCategoryName(expense.categoryId)}
                </span>
              </div>
            </div>

            <div className="text-sm mb-1">{formatDate(expense.date)}</div>

            <div className="flex justify-between items-end">
              <div className="text-sm italic">
                {expense.description || (
                  <span className="opacity-50">Sin descripción</span>
                )}
              </div>
              <div className="text-2xl font-bold whitespace-nowrap ml-4">
                €{expense.amount.toFixed(2)}
              </div>
            </div>

            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button
                title="Editar"
                className="w-8 h-8 bg-white text-gray-800 flex items-center justify-center rounded-md shadow hover:scale-105 hover:bg-gray-100 transition transform cursor-pointer"
                onClick={() => handleEdit(expense)}
              >
                <EditIcon fontSize="small" />
              </button>

              <button
                title="Borrar"
                className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-md shadow hover:scale-105 hover:bg-red-600 transition transform cursor-pointer"
                onClick={() => setExpenseToDelete(expense)}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && householdId && (
        <AddExpenseModal
          householdId={householdId}
          onClose={() => {
            setShowModal(false);
            setEditingExpense(null);
          }}
          editingExpense={editingExpense}
        />
      )}

      {expenseToDelete && (
        <DeleteExpenseModal
          expense={expenseToDelete}
          onClose={() => setExpenseToDelete(null)}
        />
      )}
    </div>
  );
};

export default Expenses;
