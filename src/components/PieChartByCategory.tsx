import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface PieChartByCategoryProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PieChartByCategory: React.FC<PieChartByCategoryProps> = ({ data }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Gastos por categoría</h3>

      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        {/* Pie chart */}
        <div className="flex justify-center w-full lg:w-1/2">
          <PieChart width={650} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
            >
              {data.map((entry, index) => (
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
          {data.map((entry, index) => (
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
    </>
  );
};

export default PieChartByCategory;
