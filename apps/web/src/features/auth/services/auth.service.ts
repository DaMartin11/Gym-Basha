import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  type Unsubscribe,
  type User,
  type UserCredential,
} from "firebase/auth";
import { auth } from "../../../shared/lib/firebase";

export type RegisterWithEmailInput = {
  fullName: string;
  email: string;
  password: string;
};

export function subscribeToAuthState(
  callback: (user: User | null) => void,
): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

export async function registerWithEmail(
  input: RegisterWithEmailInput,
): Promise<UserCredential> {
  const { email, password, fullName } = input;
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const trimmedName = fullName.trim();

  if (trimmedName) {
    await updateProfile(credential.user, { displayName: trimmedName });
  }

  return credential;
}

export function loginWithEmail(
  email: string,
  password: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
 try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}

export function logoutUser(): Promise<void> {
  return signOut(auth);
}
