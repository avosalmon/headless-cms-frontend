export interface Post {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  featured_image: Image | null;
  tags: Tag[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface PostCollection {
  data: Partial<Post>[];
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
    links: {
      active: boolean;
      label: string;
      url: string | null;
    }[];
  };
}

export interface PostResponse {
  data: Post;
}
