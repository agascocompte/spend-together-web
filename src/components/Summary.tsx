import React, { useState } from "react";
import { useCategoriesContext } from "../context/CategoriesContext";
import { useExpensesContext } from "../context/ExpensesContent";
import ExpenseFilters, { PeriodFilter, SortOption } from "./ExpenseFilters";
import { sortExpenses, filterExpensesByDate } from "../utils/expenseFilters";
import PieChartByCategory from "./PieChartByCategory";
import BarChartByDate from "./BarChartByDate";
import LineChartByDate from "./LineChartByDate";

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

  const totalGeneral = pieData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Resumen</h2>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <ExpenseFilters onFilterChange={setFilters} />
        <div className="bg-white text-purple-700 rounded-full px-6 py-2 text-lg font-bold shadow whitespace-nowrap">
          Total general: {totalGeneral.toFixed(2)}€
        </div>
      </div>

      {pieData.length === 0 ? (
        <p className="mt-6 text-white">No hay datos para mostrar.</p>
      ) : (
        <div className="space-y-16">
          <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md">
            <PieChartByCategory data={pieData} />
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md">
            <BarChartByDate
              expenses={sorted}
              period={filters.period}
              startDate={filters.startDate}
              endDate={filters.endDate}
            />
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md">
            <LineChartByDate expenses={filtered} period={filters.period} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
