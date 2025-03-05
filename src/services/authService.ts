import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebaseApp from "../firebase"; 

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log(result.user);
  return result.user;
};

export const signOutUser = async () => {
  return signOut(auth);
};