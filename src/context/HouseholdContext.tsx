import { collection, query, where, getDocs } from "firebase/firestore";
import { createContext, useContext, useState, ReactNode } from "react";
import { firestore } from "../firebase";
import {
  createHousehold,
  addMemberToHousehold,
} from "../services/householdService";

interface HouseholdContextType {
  householdId: string | null;
  fetchHousehold: (userId: string) => Promise<string | null>; // <- aquí
  createNewHousehold: (userId: string) => Promise<void>;
  joinHousehold: (userId: string, householdId: string) => Promise<void>;
}

const HouseholdContext = createContext<HouseholdContextType>({
  householdId: null,
  fetchHousehold: async () => null, // <- devuelve null explícitamente
  createNewHousehold: async () => {},
  joinHousehold: async () => {},
});

export const HouseholdProvider = ({ children }: { children: ReactNode }) => {
  const [householdId, setHouseholdId] = useState<string | null>(null);

  const fetchHousehold = async (userId: string): Promise<string | null> => {
    const q = query(
      collection(firestore, "households"),
      where("members", "array-contains", userId)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setHouseholdId(null);
      return null;
    } else {
      const id = snapshot.docs[0].id;
      setHouseholdId(id);
      return id;
    }
  };

  const createNewHousehold = async (userId: string) => {
    const newId = await createHousehold(userId);
    setHouseholdId(newId);
  };

  const joinHousehold = async (userId: string, householdId: string) => {
    await addMemberToHousehold(householdId, userId);
    setHouseholdId(householdId);
  };

  return (
    <HouseholdContext.Provider
      value={{ householdId, fetchHousehold, createNewHousehold, joinHousehold }}
    >
      {children}
    </HouseholdContext.Provider>
  );
};

export const useHousehold = () => useContext(HouseholdContext);
