import { FormattedPost } from "@/app/types";

export function formatPost(post) {
  return {
    id: post.id,
    author: {
      name: post.author.name,
      username: post.author.username ? `@${post.author.username}` : "@unknown",
      initials: post.author.name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    },
    content: post.content,
    timestamp: post.createdAt,
    likes: post._count?.likes ?? 0,
    comments: post._count?.comment ?? 0,
    isLiked: false,
    isBookmarked: false,
  };
}

export function createInitial(name: string) {
  return name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
