// src/components/LineChartByDate.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "../models/Expense";
import { PeriodFilter } from "../utils/expenseFilters";
import { isTimestamp } from "../utils/expenseFilters";
import { capitalize } from "../utils/format";

interface LineChartByDateProps {
  expenses: Expense[];
  period: PeriodFilter;
}

const formatKey = (date: Date, period: PeriodFilter) => {
  const options: Intl.DateTimeFormatOptions =
    period === "year"
      ? { year: "numeric", month: "long" }
      : period === "month"
      ? { month: "short", day: "2-digit" }
      : period === "week"
      ? { weekday: "short", day: "2-digit", month: "short" }
      : { day: "2-digit", month: "short" };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
};

const LineChartByDate: React.FC<LineChartByDateProps> = ({
  expenses,
  period,
}) => {
  const grouped: Record<string, { total: number; date: Date }> = {};

  for (const expense of expenses) {
    const date = isTimestamp(expense.date)
      ? expense.date.toDate()
      : new Date(expense.date);
    const key = capitalize(formatKey(date, period));

    if (!grouped[key]) {
      grouped[key] = { total: 0, date };
    }
    grouped[key].total += expense.amount;
  }

  const data = Object.entries(grouped)
    .map(([label, { total, date }]) => ({ label, total, date }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Evolución de gastos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}€`, "Total"]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartByDate;
