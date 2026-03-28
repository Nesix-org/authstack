export type FeedPost = {
  id: string;
  author: {
    name: string;
    username: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};
