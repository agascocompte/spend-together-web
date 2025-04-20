import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCategoriesContext } from "../context/CategoriesContext";
import { useExpensesContext } from "../context/ExpensesContent";
import ExpenseFilters, { PeriodFilter, SortOption } from "./ExpenseFilters";
import { sortExpenses, filterExpensesByDate } from "../utils/expenseFilters";
import PieChartByCategory from "./PieChartByCategory";

const Summary: React.FC = () => {
  const { expenses } = useExpensesContext();
  const { categories } = useCategoriesContext();

  const [filters, setFilters] = useState<{
    period: PeriodFilter;
    startDate?: string;
    endDate?: string;
    sortBy: SortOption;
  }>({
    period: "month",
    sortBy: "date_desc",
  });

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "Sin categoría";

  const filtered = filterExpensesByDate(
    expenses,
    filters.period,
    filters.startDate,
    filters.endDate
  );

  const sorted = [...filtered].sort((a, b) =>
    sortExpenses(a, b, filters.sortBy, getCategoryName)
  );

  const dataMap: Record<string, number> = {};
  for (const expense of sorted) {
    dataMap[expense.categoryId] =
      (dataMap[expense.categoryId] ?? 0) + expense.amount;
  }

  const pieData = Object.entries(dataMap).map(([categoryId, value]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      name: category?.name || "Sin categoría",
      value,
      color: category ? category.color : "#cccccc",
    };
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resumen</h2>
      <ExpenseFilters onFilterChange={setFilters} />

      {pieData.length === 0 ? (
        <p className="mt-6">No hay datos para mostrar.</p>
      ) : (
        <PieChartByCategory data={pieData} />
      )}
    </div>
  );
};

export default Summary;
