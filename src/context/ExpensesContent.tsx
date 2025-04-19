import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Expense } from "../models/Expense";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

interface ExpensesContextType {
  expenses: Expense[];
  error: Error | null;
}

const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  error: null,
});

export const ExpensesProvider = ({
  householdId,
  children,
}: {
  householdId: string;
  children: ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!householdId) return;

    const q = query(
      collection(firestore, "expenses"),
      where("householdId", "==", householdId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Expense[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpenses(data);
      },
      (err) => setError(err)
    );

    return () => unsubscribe();
  }, [householdId]);

  return (
    <ExpensesContext.Provider value={{ expenses, error }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => useContext(ExpensesContext);
