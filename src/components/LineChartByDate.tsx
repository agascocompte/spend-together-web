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
      <h3 className="text-xl font-semibold mb-6 text-white text-center">
        Evolución de gastos
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" stroke="#ffffff" tick={{ fill: "#ffffff" }} />
          <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              border: "none",
              color: "#333",
              fontWeight: 500,
            }}
            formatter={(value: number) => [`${value.toFixed(2)}€`, "Total"]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{ r: 5, stroke: "white", strokeWidth: 2, fill: "#a78bfa" }}
            activeDot={{
              r: 7,
              stroke: "white",
              strokeWidth: 2,
              fill: "#7c3aed",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartByDate;
