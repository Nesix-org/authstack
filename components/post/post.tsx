"use client";

import { PostCard } from "./post-card";

type FormattedPost = {
  id: string;
  author: { name: string; username: string; initials: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

type PostProps = {
  posts: FormattedPost[];
  loading?: boolean;
  error?: string | null;
};

export default function Post({ posts, loading, error }: PostProps) {
  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
