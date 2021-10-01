import axios from "axios";
import { User } from "../../types/user";

const USER_PATH = "users";

export async function createUser(): Promise<User | null> {
  try {
    const { data } = await axios.post(USER_PATH);
    return data.data;
  } catch (error) {
    console.log("Failed to create a user", error);
    return null;
  }
}

export async function findUser(id: string): Promise<User | null> {
  try {
    const { data } = await axios.get(`${USER_PATH}/${id}`);
    return data.data;
  } catch (error) {
    console.log(`Failed to find a user with id: ${id}`, error);
    return null;
  }
}
