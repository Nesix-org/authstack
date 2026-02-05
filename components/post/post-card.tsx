'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,  } from "lucide-react";
import { useState } from "react";



interface Post {
  id: number;
  author: { name: string; username: string; initials: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export const PostCard = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <article className="border-b-2 border-border bg-background transition-colors hover:bg-muted/30">
      {/* Post Header */}
      <div className="flex items-start gap-3 p-4 pb-0">
        <Avatar className="h-10 w-10 border-2 border-foreground">
          <AvatarFallback className="bg-muted text-foreground font-heading font-bold text-sm">
            {post.author.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-heading font-bold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.author.username}</p>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
          </div>
        </div>
        <button className="p-1 text-muted-foreground transition-colors hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2 pl-[68px]">
        <p className="text-foreground leading-relaxed">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 py-2 pl-[68px]">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? "text-destructive" : "text-muted-foreground hover:text-destructive"
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`transition-colors ${
            isBookmarked ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>
    </article>
  );
};
