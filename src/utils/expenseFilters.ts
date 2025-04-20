import { Expense } from "../models/Expense";

export type PeriodFilter = "day" | "week" | "month" | "year" | "custom";
export type SortOption = "date_asc" | "date_desc" | "price_asc" | "price_desc" | "category";

export function isTimestamp(obj: any): obj is { toDate: () => Date } {
  return obj && typeof obj.toDate === "function";
}

export function formatDate(date: any): string {
  const parsed = isTimestamp(date) ? date.toDate() : new Date(date);
  const formatted = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function filterByDate(
  expense: Expense,
  period: PeriodFilter,
  startDate?: string,
  endDate?: string
): boolean {
  const date = isTimestamp(expense.date) ? expense.date.toDate() : new Date(expense.date);
  const now = new Date();

  switch (period) {
    case "day":
      return date.toDateString() === now.toDateString();
    case "week": {
      const dayOfWeek = now.getDay();
      const diffToMonday = (dayOfWeek + 6) % 7;
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return date >= startOfWeek && date <= endOfWeek;
    }
    case "month":
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    case "year":
      return date.getFullYear() === now.getFullYear();
    case "custom":
      if (!startDate || !endDate) return true;
      const start = new Date(startDate);
      const end = new Date(endDate);
      return date >= start && date <= end;
    default:
      return true;
  }
}

export function filterExpensesByDate(
  expenses: Expense[],
  period: PeriodFilter,
  startDate?: string,
  endDate?: string
): Expense[] {
  return expenses.filter((expense) =>
    filterByDate(expense, period, startDate, endDate)
  );
}

export function sortExpenses(
  a: Expense,
  b: Expense,
  sortBy: SortOption,
  getCategoryName: (id: string) => string
): number {
  const getDate = (d: any): Date => (isTimestamp(d) ? d.toDate() : new Date(d));

  switch (sortBy) {
    case "date_asc":
      return getDate(a.date).getTime() - getDate(b.date).getTime();
    case "date_desc":
      return getDate(b.date).getTime() - getDate(a.date).getTime();
    case "price_asc":
      return a.amount - b.amount;
    case "price_desc":
      return b.amount - a.amount;
    case "category":
      const nameA = getCategoryName(a.categoryId).toLowerCase();
      const nameB = getCategoryName(b.categoryId).toLowerCase();
      return nameA.localeCompare(nameB);
    default:
      return 0;
  }
}

export function groupExpenses(
  expenses: Expense[],
  period: PeriodFilter
): Record<string, Expense[]> {
  const grouped: Record<string, Expense[]> = {};

  for (const expense of expenses) {
    const date = isTimestamp(expense.date)
      ? expense.date.toDate()
      : new Date(expense.date);

    let key = "";
    switch (period) {
      case "week":
        key = new Intl.DateTimeFormat("es-ES", {
          weekday: "long",
          day: "2-digit",
          month: "long",
        }).format(date);
        break;
      case "month":
        const monday = new Date(date);
        const diff = (monday.getDay() + 6) % 7;
        monday.setDate(date.getDate() - diff);
        key = `Semana del ${monday.toLocaleDateString("es-ES")}`;
        break;
      case "year":
        key = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(date);
        break;
      default:
        key = "";
    }

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(expense);
  }

  return grouped;
}