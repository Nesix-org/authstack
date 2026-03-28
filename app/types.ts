
// export type FormattedPost = {
//   id: string;
//   author: { name: string; username: string; initials: string };
//   content: string;
//   timestamp: string;
//   likes: number;
//   comments: number;
//   isLiked: boolean;
//   isBookmarked: boolean;
// };

export type PostProps = {
  posts: Post[]
};


type Author = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string | null;
  username: string | null;
  image: string | null;
  emailVerified: Date | null;
};

type PostCount = {
  bookmarks: number;
  comment: number;
  likes: number;
};

export type Post = {
  id: string;
  content: string;
  mediaUrl: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  _count: PostCount;
};
