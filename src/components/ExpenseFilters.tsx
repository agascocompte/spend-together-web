import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

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

const periodOptions: { value: PeriodFilter; label: string }[] = [
  { value: "day", label: "Hoy" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: "Este mes" },
  { value: "year", label: "Este año" },
  { value: "custom", label: "Personalizado" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "date_desc", label: "Fecha descendente" },
  { value: "date_asc", label: "Fecha ascendente" },
  { value: "category", label: "Nombre de categoría" },
  { value: "price_asc", label: "Precio ascendente" },
  { value: "price_desc", label: "Precio descendente" },
];

const ExpenseFilters: React.FC<Props> = ({ onFilterChange }) => {
  const [period, setPeriod] = useState<PeriodFilter>("month");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("date_desc");

  useEffect(() => {
    onFilterChange({ period, startDate, endDate, sortBy });
  }, [period, startDate, endDate, sortBy]);

  const renderListbox = <T extends string>(
    label: string,
    value: T,
    setValue: (val: T) => void,
    options: { value: T; label: string }[]
  ) => (
    <div className="flex flex-col min-w-[250px]">
      <label className="font-medium mb-1">{label}</label>
      <Listbox value={value} onChange={setValue}>
        <div className="relative">
          <Listbox.Button className="w-full p-2 rounded border bg-white text-black flex justify-between items-center min-w-[250px]">
            {options.find((opt) => opt.value === value)?.label}
            <ChevronUpDownIcon className="w-5 h-5 ml-2 text-gray-500" />
          </Listbox.Button>
          <Listbox.Options
            className="
              absolute mt-1 w-full rounded-lg shadow-xl z-10 
              border border-white/20 backdrop-blur-md bg-white/90
              overflow-y-auto max-h-60 transition-all
              text-black text-sm
            "
          >
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active }) =>
                  `px-4 py-2 cursor-pointer truncate ${
                    active
                      ? "bg-purple-100 text-purple-900"
                      : "hover:bg-white/40"
                  }`
                }
              >
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
      {renderListbox("Periodo", period, setPeriod, periodOptions)}

      {period === "custom" && (
        <>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Desde</label>
            <input
              type="date"
              className="p-2 border rounded min-w-[250px]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Hasta</label>
            <input
              type="date"
              className="p-2 border rounded min-w-[250px]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </>
      )}

      {renderListbox("Ordenar por", sortBy, setSortBy, sortOptions)}
    </div>
  );
};

export default ExpenseFilters;
