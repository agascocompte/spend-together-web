import { createContext, useContext, useState, ReactNode } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

interface HouseholdContextType {
  householdId: string | null;
  fetchHousehold: (userId: string) => Promise<void>;
}

const HouseholdContext = createContext<HouseholdContextType>({
  householdId: null,
  fetchHousehold: async () => {},
});

export const HouseholdProvider = ({ children }: { children: ReactNode }) => {
  const [householdId, setHouseholdId] = useState<string | null>(null);

  const fetchHousehold = async (userId: string) => {
    try {
      const q = query(
        collection(firestore, "households"),
        where("members", "array-contains", userId)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setHouseholdId(null);
      } else {
        const doc = snapshot.docs[0];
        setHouseholdId(doc.id);
      }
    } catch (error) {
      console.error("Error al obtener el householdId:", error);
      setHouseholdId(null);
    }
  };

  return (
    <HouseholdContext.Provider value={{ householdId, fetchHousehold }}>
      {children}
    </HouseholdContext.Provider>
  );
};

export const useHousehold = () => useContext(HouseholdContext);
