import React from "react";
import { Expense } from "../models/Expense";
import { deleteExpense } from "../services/expenseService";
import toast from "react-hot-toast";

interface Props {
  expense: Expense;
  onClose: () => void;
}

const DeleteExpenseModal: React.FC<Props> = ({ expense, onClose }) => {
  const handleDelete = async () => {
    try {
      await deleteExpense(expense.id);
      toast.success("Gasto eliminado");
    } catch {
      toast.error("Error al eliminar el gasto");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          ¿Eliminar gasto?
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Estás a punto de eliminar el gasto de{" "}
          <strong>€{expense.amount.toFixed(2)}</strong>. Esta acción no se puede
          deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;
