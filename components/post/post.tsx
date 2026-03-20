"use client";

import { PostProps } from "@/app/types";
import { PostCard } from "./post-card";


export default function Post({posts}: PostProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
