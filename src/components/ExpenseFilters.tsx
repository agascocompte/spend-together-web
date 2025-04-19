import React, { useState, useEffect } from "react";

export type PeriodFilter = "day" | "week" | "month" | "year" | "custom";
export type SortOption =
  | "date_asc"
  | "date_desc"
  | "category"
  | "price_asc"
  | "price_desc";

interface Props {
  onFilterChange: (filters: {
    period: PeriodFilter;
    startDate?: string;
    endDate?: string;
    sortBy: SortOption;
  }) => void;
}

const ExpenseFilters: React.FC<Props> = ({ onFilterChange }) => {
  const [period, setPeriod] = useState<PeriodFilter>("month");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("date_desc");

  useEffect(() => {
    onFilterChange({ period, startDate, endDate, sortBy });
  }, [period, startDate, endDate, sortBy]);

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
      <div className="flex flex-col">
        <label className="font-medium mb-1">Periodo</label>
        <select
          className="p-2 border rounded"
          value={period}
          onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
        >
          <option value="day">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
          <option value="custom">Personalizado</option>
        </select>
      </div>

      {period === "custom" && (
        <>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Desde</label>
            <input
              type="date"
              className="p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Hasta</label>
            <input
              type="date"
              className="p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="flex flex-col">
        <label className="font-medium mb-1">Ordenar por</label>
        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="date_desc">Fecha descendente</option>
          <option value="date_asc">Fecha ascendente</option>
          <option value="category">Nombre de categoría</option>
          <option value="price_asc">Precio ascendente</option>
          <option value="price_desc">Precio descendente</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilters;
