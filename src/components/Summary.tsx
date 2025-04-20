import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCategoriesContext } from "../context/CategoriesContext";
import { useExpensesContext } from "../context/ExpensesContent";
import ExpenseFilters, { PeriodFilter, SortOption } from "./ExpenseFilters";
import { sortExpenses, filterExpensesByDate } from "../utils/expenseFilters";

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

  const total = Object.values(dataMap).reduce((sum, value) => sum + value, 0);

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
        <>
          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            {/* Pie chart */}
            <div className="flex justify-center w-full lg:w-1/2">
              <PieChart width={650} height={400}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Leyenda al lado */}
            <div className="w-full lg:w-1/2 max-h-[400px] overflow-y-auto pr-4">
              {pieData.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 px-4 py-2 rounded"
                  style={{ backgroundColor: entry.color, color: "white" }}
                >
                  <span className="font-semibold">{entry.name}</span>
                  <span className="text-xl font-bold">
                    {entry.value.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total global centrado debajo */}
          <div className="mt-10 text-center">
            <div className="inline-block bg-gray-100 rounded-full px-6 py-3 text-2xl font-bold text-gray-800 shadow">
              Total: {total.toFixed(2)} €
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
