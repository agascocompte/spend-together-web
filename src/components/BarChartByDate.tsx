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
import { useCategoriesContext } from "../context/CategoriesContext";
import { darkenColor } from "../utils/colors";

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
    case "month": {
      const weekStart = new Date(date);
      const diff = (weekStart.getDay() + 6) % 7;
      weekStart.setDate(weekStart.getDate() - diff);
      return `Semana del ${weekStart.toLocaleDateString("es-ES", options)}`;
    }
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
  const { categories } = useCategoriesContext();

  // Agrupamos gastos por fecha y categoría
  const grouped: Record<string, { [categoryId: string]: number; label: any }> =
    {};

  for (const expense of expenses) {
    const date = isTimestamp(expense.date)
      ? expense.date.toDate()
      : new Date(expense.date);
    const label: any = capitalize(getLabelForDate(date, period));
    const categoryId = expense.categoryId;

    if (!grouped[label]) {
      grouped[label] = { label };
    }

    grouped[label][categoryId] =
      (grouped[label][categoryId] ?? 0) + expense.amount;
  }

  const data = Object.values(grouped);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6 text-white text-center">
        Gastos por fecha
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} className="[&>svg>path]:fill-transparent">
          {/* Gradientes por categoría */}
          <defs>
            {categories.map((cat) => {
              const id = `bar-gradient-${cat.id.replace(/\s+/g, "-")}`;
              const dark = darkenColor(cat.color, 15);
              return (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={cat.color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={dark} stopOpacity={1} />
                </linearGradient>
              );
            })}
          </defs>

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
            formatter={(value: number, name: string) => {
              const catName =
                categories.find((c) => c.id === name)?.name || name;
              return [`${value.toFixed(2)}€`, catName];
            }}
            labelFormatter={(label) => (
              <span style={{ fontWeight: "bold" }}>{label}</span>
            )}
          />

          {categories.map((cat) => {
            return (
              <Bar
                key={cat.id}
                dataKey={cat.id}
                stackId="a"
                fill={`url(#bar-gradient-${cat.id.replace(/\s+/g, "-")})`}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;

                  const activeCategories = categories
                    .filter((c) => payload[c.id] > 0)
                    .map((c) => c.id);

                  const isTop =
                    activeCategories[activeCategories.length - 1] === cat.id;
                  const r = isTop ? 8 : 0;

                  const path = `
                    M${x},${y + height}
                    V${y + r}
                    Q${x},${y} ${x + r},${y}
                    H${x + width - r}
                    Q${x + width},${y} ${x + width},${y + r}
                    V${y + height}
                    Z
                  `;

                  return (
                    <path
                      d={path}
                      fill={`url(#bar-gradient-${cat.id.replace(/\s+/g, "-")})`}
                    />
                  );
                }}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartByDate;
