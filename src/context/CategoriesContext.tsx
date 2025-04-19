import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Category } from "../models/Category";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

interface CategoriesContextType {
  categories: Category[];
  error: Error | null;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  error: null,
});

export const CategoriesProvider = ({
  householdId,
  children,
}: {
  householdId: string;
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!householdId) return;

    const q = query(
      collection(firestore, "categories"),
      where("householdId", "==", householdId)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cats: Category[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        cats.forEach((cat) => {
          if (cat.color.length == 8)
            cat.color = "#" + cat.color.slice(2, cat.color.length);
        });
        setCategories(cats);
      },
      (err) => setError(err)
    );

    return () => unsubscribe();
  }, [householdId]);

  return (
    <CategoriesContext.Provider value={{ categories, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
