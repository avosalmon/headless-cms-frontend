import axios from "axios";

const USER_PATH = "users";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export async function createUser(): Promise<ApiUser | null> {
  try {
    const { data } = await axios.post(USER_PATH);
    return data.data;
  } catch (error) {
    console.log("Failed to create a user", error);
    return null;
  }
}

export async function findUser(id: string): Promise<ApiUser | null> {
  try {
    const { data } = await axios.get(`${USER_PATH}/${id}`);
    return data.data;
  } catch (error) {
    console.log(`Failed to find a user with id: ${id}`, error);
    return null;
  }
}
