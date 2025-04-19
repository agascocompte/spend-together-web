import {collection, addDoc, updateDoc, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../firebase";
  
export const addExpense = async (expense: any): Promise<string> => {
const docRef = await addDoc(collection(firestore, "expenses"), expense);
return docRef.id;
};

export const updateExpense = async (expense: any): Promise<void> => {
const docRef = doc(firestore, "expenses", expense.id);
await updateDoc(docRef, expense);
};

export const deleteExpense = async (id: string): Promise<void> => {
const docRef = doc(firestore, "expenses", id);
await deleteDoc(docRef);
};

export const deleteMultipleExpenses = async (ids: string[]): Promise<void> => {
const batch = writeBatch(firestore);
ids.forEach((id) => {
    const docRef = doc(firestore, "expenses", id);
    batch.delete(docRef);
});
await batch.commit();
};
  