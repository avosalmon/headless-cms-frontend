import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
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

  return {
    user,
    loading,
  };
}
