import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "../models/Expense";
import { PeriodFilter } from "./ExpenseFilters";
import { isTimestamp } from "../utils/expenseFilters";
import { capitalize } from "../utils/format";

interface BarChartByDateProps {
  expenses: Expense[];
  period: PeriodFilter;
  startDate?: string;
  endDate?: string;
}

const getLabelForDate = (date: Date, period: PeriodFilter): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };

  switch (period) {
    case "day":
      return date.toLocaleDateString("es-ES", options);
    case "week":
      return date.toLocaleDateString("es-ES", { weekday: "short", ...options });
    case "month":
      const weekStart = new Date(date);
      const diff = (weekStart.getDay() + 6) % 7;
      weekStart.setDate(weekStart.getDate() - diff);
      return `Semana del ${weekStart.toLocaleDateString("es-ES", options)}`;
    case "year":
      return capitalize(date.toLocaleDateString("es-ES", { month: "long" }));
    default:
      return date.toLocaleDateString("es-ES", options);
  }
};

const BarChartByDate: React.FC<BarChartByDateProps> = ({
  expenses,
  period,
}) => {
  const dataMap: Record<string, number> = {};

  for (const expense of expenses) {
    const date = isTimestamp(expense.date)
      ? expense.date.toDate()
      : new Date(expense.date);
    const label = getLabelForDate(date, period);

    dataMap[label] = (dataMap[label] ?? 0) + expense.amount;
  }

  const data = Object.entries(dataMap).map(([label, total]) => ({
    name: capitalize(label),
    total,
  }));

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Gastos por fecha</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}€`, "Total"]}
          />{" "}
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartByDate;
