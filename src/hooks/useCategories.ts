import { useEffect, useState } from "react";
import { Category } from "../models/Category";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";


const useCategories = (householdId: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
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
          setCategories(cats);
        },
        (err) => {
          setError(err);
        }
      );
  
      return () => unsubscribe();
    }, [householdId]);
  
    return { categories, error };
  };
  
  export default useCategories;