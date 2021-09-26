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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

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

    let apiUser = await findUser(firebaseUser.uid);

    if (!apiUser) {
      apiUser = await createUser();
    }

    if (apiUser) {
      setUser({ ...apiUser });
    } else {
      setUser(null);
    }

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
    return (
      signInWithPopup(auth, provider)
        // .then((userCredential) => {})
        .catch((error) => {
          console.log("Failed to sign-in.", error.message);
        })
    );
  };

  const logOut = () => signOut(auth);

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
