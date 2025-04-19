import React, { useState } from "react";
import { useHousehold } from "../context/HouseholdContext";
import { useCategoriesContext } from "../context/CategoriesContext";
import { useExpensesContext } from "../context/ExpensesContent";
import AddExpenseModal from "./AddExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { getIconForCategory } from "../utils";
import { Expense } from "../models/Expense";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseFilters, { PeriodFilter, SortOption } from "./ExpenseFilters";

const Expenses: React.FC = () => {
  const { householdId } = useHousehold();
  const { expenses, error } = useExpensesContext();
  const { categories } = useCategoriesContext();

  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<{
    period: PeriodFilter;
    startDate?: string;
    endDate?: string;
    sortBy: SortOption;
  }>({
    period: "month",
    sortBy: "date_desc",
  });

  function isTimestamp(obj: any): obj is { toDate: () => Date } {
    return obj && typeof obj.toDate === "function";
  }

  const formatDate = (date: any) => {
    const parsed = isTimestamp(date) ? date.toDate() : new Date(date);

    const formatted = new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsed);

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
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

  const filterByDate = (expense: Expense) => {
    const date = isTimestamp(expense.date)
      ? expense.date.toDate()
      : new Date(expense.date);
    const now = new Date();

    switch (filters.period) {
      case "day":
        return date.toDateString() === now.toDateString();
      case "week": {
        const dayOfWeek = now.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - diffToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return date >= startOfWeek && date <= endOfWeek;
      }
      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      case "year":
        return date.getFullYear() === now.getFullYear();
      case "custom":
        if (!filters.startDate || !filters.endDate) return true;
        const start = new Date(filters.startDate);
        const end = new Date(filters.endDate);
        return date >= start && date <= end;
      default:
        return true;
    }
  };

  const sortExpenses = (a: Expense, b: Expense) => {
    const getDate = (d: any): Date =>
      isTimestamp(d) ? d.toDate() : new Date(d);

    switch (filters.sortBy) {
      case "date_asc":
        return getDate(a.date).getTime() - getDate(b.date).getTime();
      case "date_desc":
        return getDate(b.date).getTime() - getDate(a.date).getTime();
      case "price_asc":
        return a.amount - b.amount;
      case "price_desc":
        return b.amount - a.amount;
      case "category":
        const nameA = getCategoryName(a.categoryId).toLowerCase();
        const nameB = getCategoryName(b.categoryId).toLowerCase();
        return nameA.localeCompare(nameB);
      default:
        return 0;
    }
  };

  const visibleExpenses = expenses.filter(filterByDate).sort(sortExpenses);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowModal(true);
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

      <ExpenseFilters onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleExpenses.map((expense) => (
          <div
            key={expense.id}
            className="relative group border-2 rounded-sm p-4 my-1 text-white transition-all overflow-hidden flex flex-col justify-between"
            style={getCategoryStyle(expense.categoryId)}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm pointer-events-none" />

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

            <div className="flex justify-between items-center">
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
