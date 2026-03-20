
export type FormattedPost = {
  id: string;
  author: { name: string; username: string; initials: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export type PostProps = {
  posts: FormattedPost[];
};
