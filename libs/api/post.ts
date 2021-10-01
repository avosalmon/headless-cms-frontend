import axios from "axios";
import { PostCollection } from "../../types/post";

const POST_PATH = "posts";

type Sort = "published_at" | "updated_at";
type Direction = "asc" | "desc";
type Status = "published" | "draft";

export async function getAllPosts(
  sort: Sort = "published_at",
  direction: Direction = "desc",
  status?: Status
): Promise<PostCollection | null> {
  try {
    const { data } = await axios.get<PostCollection>(POST_PATH, {
      params: {
        sort,
        direction,
        status,
      },
    });
    return data;
  } catch (error) {
    console.log("Failed to get posts", error);
    return null;
  }
}
