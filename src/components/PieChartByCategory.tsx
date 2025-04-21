import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { darkenColor } from "../utils/colors";

interface PieChartByCategoryProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PieChartByCategory: React.FC<PieChartByCategoryProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <>
      <h3 className="text-xl font-semibold mb-6 text-white text-center">
        Gastos por categoría
      </h3>

      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        {/* Pie chart */}
        <div className="flex justify-center w-full lg:w-1/2">
          <PieChart width={650} height={400}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={entry.color} />
                  <stop
                    offset="100%"
                    stopColor={darkenColor(entry.color, 20)}
                  />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              activeIndex={activeIndex}
              activeShape={{ outerRadius: 140 } as any}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              label={(props) => {
                const { name, percent, cx, cy, midAngle, outerRadius, index } =
                  props;
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 10;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const color = data[index].color;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={color}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-sm font-medium"
                  >
                    {`${name} ${(percent * 100).toFixed(1)}%`}
                  </text>
                );
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index})`}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                border: "none",
                color: "#333",
                fontWeight: 500,
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(2)}€`,
                name,
              ]}
            />
          </PieChart>
        </div>

        {/* Leyenda al lado */}
        <div className="w-full lg:w-1/2 max-h-[400px] overflow-y-auto pr-4 space-y-2">
          {data.map((entry, index) => {
            const dark = darkenColor(entry.color, 20);
            return (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 rounded-lg shadow text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${entry.color}, ${dark})`,
                }}
              >
                <span className="font-medium tracking-wide">{entry.name}</span>
                <span className="text-xl font-bold">
                  {entry.value.toFixed(2)}€
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PieChartByCategory;
