import React, { useState } from "react";
import { useHousehold } from "../context/HouseholdContext";
import { useCategoriesContext } from "../context/CategoriesContext";
import { useExpensesContext } from "../context/ExpensesContent";
import AddExpenseModal from "./AddExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { Expense } from "../models/Expense";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseFilters, { PeriodFilter, SortOption } from "./ExpenseFilters";
import { getIconForCategory } from "../utils/icons";
import {
  filterByDate,
  formatDate,
  groupExpenses,
  sortExpenses,
} from "../utils/expenseFilters";

const Expenses: React.FC = () => {
  const { householdId } = useHousehold();
  const { expenses } = useExpensesContext();
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

  const visibleExpenses = expenses
    .filter((e) =>
      filterByDate(e, filters.period, filters.startDate, filters.endDate)
    )
    .sort((a, b) => sortExpenses(a, b, filters.sortBy, getCategoryName));

  const groupedExpenses = groupExpenses(visibleExpenses, filters.period);

  const totalGeneral = visibleExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Gastos</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          + Añadir Gasto
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <ExpenseFilters onFilterChange={setFilters} />
        <div className="bg-gray-100 rounded-full px-6 py-2 text-lg font-bold text-gray-800 shadow whitespace-nowrap">
          Total general: {totalGeneral.toFixed(2)}€
        </div>
      </div>

      {Object.entries(groupedExpenses).map(
        ([sectionTitle, expensesInGroup]) => {
          const totalAmount = expensesInGroup.reduce(
            (sum, exp) => sum + exp.amount,
            0
          );

          return (
            <div key={sectionTitle}>
              {/* Separador */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300 opacity-40"></div>
                <span className="px-4 py-1 text-sm font-semibold text-gray-700 bg-white rounded shadow mx-2">
                  {sectionTitle}
                </span>
                <div className="flex-grow border-t border-gray-300 opacity-40"></div>
              </div>

              {/* Gastos del grupo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {expensesInGroup.map((expense) => (
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
                            categories.find((c) => c.id === expense.categoryId)
                              ?.icon ?? "default"
                          ),
                          { style: { fontSize: 24, color: "white" } }
                        )}
                        <span className="font-semibold text-lg">
                          {getCategoryName(expense.categoryId)}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm mb-1">
                      {formatDate(expense.date)}
                    </div>

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

              {/* Total del grupo */}
              <div className="flex justify-center mt-4 mb-4">
                <div className="bg-gray-100 px-6 py-2 rounded-full shadow text-gray-800 text-2xl font-semibold">
                  Total: {totalAmount.toFixed(2)}€
                </div>
              </div>
            </div>
          );
        }
      )}

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
