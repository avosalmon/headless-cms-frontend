import axios from "axios";
import auth from "./firebaseAuth";

axios.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
    config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
