import { collection, addDoc, updateDoc, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../firebase";

export const addCategory = async (category: any): Promise<string> => {
  const docRef = await addDoc(collection(firestore, "categories"), category);
  return docRef.id;
};

export const updateCategory = async (category: any): Promise<void> => {
  if (!category.id) throw new Error("La categoría debe tener un ID");
  const docRef = doc(firestore, "categories", category.id);
  await updateDoc(docRef, category);
};

export const deleteCategory = async (id: string): Promise<void> => {
  const docRef = doc(firestore, "categories", id);
  await deleteDoc(docRef);
};

export const deleteMultipleCategories = async (ids: string[]): Promise<void> => {
  const batch = writeBatch(firestore);
  ids.forEach((id) => {
    const docRef = doc(firestore, "categories", id);
    batch.delete(docRef);
  });
  await batch.commit();
};