import axios from "axios";
import { PostCollection } from "../../types/post";

const POST_PATH = "posts";

type Sort = "published_at" | "updated_at";
type Direction = "asc" | "desc";
type Status = "published" | "draft";

export async function getPosts(
  sort: Sort = "published_at",
  direction: Direction = "desc",
  page = 1,
  status?: Status
): Promise<PostCollection | null> {
  try {
    const { data } = await axios.get<PostCollection>(POST_PATH, {
      params: {
        sort,
        direction,
        page,
        status,
      },
    });
    return data;
  } catch (error) {
    console.log("Failed to get posts", error);
    return null;
  }
}
