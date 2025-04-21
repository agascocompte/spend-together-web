import React from "react";
import { createPortal } from "react-dom";
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm text-white border border-white/30 ring-1 ring-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">¿Eliminar gasto?</h2>
        <p className="mb-6 text-sm text-white/80 text-center">
          Estás a punto de eliminar el gasto de{" "}
          <strong>{expense.amount.toFixed(2)}€</strong>. Esta acción no se puede
          deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white shadow cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default DeleteExpenseModal;
