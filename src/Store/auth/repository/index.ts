import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "lib/firebase";

export const signUpWithEmailPasswordFirebase = async (
  email: string,
  password: string
) => {
  // const navigate = useNavigate();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user: any) => user)
    .catch((error: any) => error);
};

export const signOutFirebase = () => {
  signOut(auth);
};

export const signInWithEmailPasswordFirebase = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user: { user: any }) => user.user)
    .catch((err: string | undefined) => {
      throw new Error(err);
    });
};

export const passwordResetFirebase = async (email: string) => {
  return sendPasswordResetEmail(auth, email)
    .then((user: any) => user)
    .catch((err: string | undefined) => {
      throw new Error(err);
    });
};
