import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { addExpense, updateExpense } from "../services/expenseService";
import { useCategoriesContext } from "../context/CategoriesContext";
import toast from "react-hot-toast";
import { Expense } from "../models/Expense";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { darkenColor } from "../utils/colors";
import { getIconForCategory } from "../utils/icons";

interface Props {
  householdId: string;
  onClose: () => void;
  editingExpense?: Expense | null;
}

const AddExpenseModal: React.FC<Props> = ({
  householdId,
  onClose,
  editingExpense,
}) => {
  const { user } = useAuth();
  const { categories } = useCategoriesContext();

  const [amount, setAmount] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  function isTimestamp(obj: any): obj is { toDate: () => Date } {
    return obj && typeof obj.toDate === "function";
  }

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setDescription(editingExpense.description || "");
      setCategoryId(editingExpense.categoryId);

      const parsedDate = isTimestamp(editingExpense.date)
        ? editingExpense.date.toDate()
        : editingExpense.date;

      setDate(parsedDate.toISOString().split("T")[0]);
    }
  }, [editingExpense]);

  const handleSubmit = async () => {
    if (!user) return;

    const parsedAmount = parseFloat(amount);

    if (!categoryId || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    if (!categoryId || parsedAmount <= 0) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    try {
      if (editingExpense) {
        await updateExpense({
          ...editingExpense,
          amount: parsedAmount,
          categoryId,
          description,
          date: new Date(date),
          householdId,
        });
        toast.success("Gasto actualizado");
      } else {
        await addExpense({
          amount: parsedAmount,
          categoryId,
          description,
          date: new Date(date),
          householdId,
        });
        toast.success("¡Gasto añadido!");
      }
      onClose();
    } catch {
      toast.error("Error al guardar el gasto");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/30 ring-1 ring-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          {editingExpense ? "Editar gasto" : "Añadir nuevo gasto"}
        </h2>

        <label className="block mb-1 font-medium">Cantidad (€)</label>
        <input
          className="w-full mb-4 p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Introduce el importe"
        />

        <label className="block mb-1 font-medium">Categoría</label>
        <Listbox value={categoryId} onChange={setCategoryId}>
          <div className="relative mb-4">
            <Listbox.Button
              className="w-full p-2 rounded-lg text-left flex items-center justify-between"
              style={{
                backgroundColor:
                  categories.find((c) => c.id === categoryId)?.color ??
                  "#666666",
                color: "#fff",
              }}
            >
              <span className="flex items-center gap-2">
                {React.cloneElement(
                  getIconForCategory(
                    categories.find((c) => c.id === categoryId)?.icon ??
                      "default"
                  ),
                  { fontSize: "small" }
                )}
                {categories.find((c) => c.id === categoryId)?.name ??
                  "Selecciona categoría"}
              </span>
              <ChevronUpDownIcon className="w-5 h-5 text-white" />
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto [&>*:not(:last-child)]:mb-1">
              {categories.map((cat) => (
                <Listbox.Option
                  key={cat.id}
                  value={cat.id}
                  className="cursor-pointer px-4 py-2 flex items-center gap-2 rounded mx-1"
                  style={{
                    backgroundColor: cat.color,
                    color: "#fff",
                    border: `2px solid ${darkenColor(cat.color, 10)}`,
                  }}
                >
                  {React.cloneElement(getIconForCategory(cat.icon), {
                    style: { fontSize: 20, color: "#ffffffcc" },
                  })}
                  <span>{cat.name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <label className="block mb-1 font-medium">Fecha</label>
        <input
          className="w-full mb-4 p-2 rounded-lg bg-white/20 border border-white/30 text-white"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-1 font-medium">Descripción (opcional)</label>
        <textarea
          className="w-full mb-6 p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Añade una nota (opcional)"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white shadow cursor-pointer"
          >
            {editingExpense ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default AddExpenseModal;
