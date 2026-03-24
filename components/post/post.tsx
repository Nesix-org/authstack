"use client";

import type { FeedPost } from "./types";
import { PostCard } from "./post-card";

type PostProps = {
  posts: FeedPost[];
  loading?: boolean;
  error?: string | null;
};

export default function Post({ posts, loading, error }: PostProps) {
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
