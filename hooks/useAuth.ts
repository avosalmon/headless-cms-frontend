import { useEffect, useState } from "react";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  UserCredential as FirebaseUserCredential,
} from "firebase/auth";
import auth from "../libs/firebaseAuth";
import { createUser, findUser } from "../libs/api/user";
import { User } from "../types/user";

export interface Auth {
  user: User | null;
  loading: boolean;
  login: (providerName: string) => Promise<void | FirebaseUserCredential>;
  logOut: () => Promise<void>;
}

export default function useAuth(): Auth {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (firebaseUser: FirebaseUser | null) => {
    setLoading(true);

    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    let user = await findUser(firebaseUser.uid);

    if (!user) {
      user = await createUser();
    }

    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) =>
      authStateChanged(firebaseUser)
    );
    return () => unsubscribe();
  }, []);

  const login = (providerName: string) => {
    const provider = getProvider(providerName);
    return signInWithPopup(auth, provider).catch((error) => {
      console.log("Failed to sign-in.", error.message);
    });
  };

  const logOut = () => signOut(auth).then(() => setUser(null));

  const getProvider = (providerName: string) => {
    switch (providerName) {
      case "github":
        return new GithubAuthProvider();
      default:
        throw new Error(`Unsupported provider given: ${providerName}`);
    }
  };

  return {
    user,
    loading,
    login,
    logOut,
  };
}
