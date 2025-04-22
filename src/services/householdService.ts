import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase";

export const createHousehold = async (userId: string): Promise<string> => {
  const docRef = await addDoc(collection(firestore, "households"), {
    members: [userId],
  });
  return docRef.id;
};

export const addMemberToHousehold = async (householdId: string, userId: string): Promise<void> => {
  const ref = doc(firestore, "households", householdId);
  await updateDoc(ref, {
    members: arrayUnion(userId),
  });
};