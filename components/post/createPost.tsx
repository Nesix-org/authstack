'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Sparkles } from 'lucide-react';

export type FeedPost = {
  id: string;
  author: { name: string; username: string; initials: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

type CreatePostProps = {
  onPostCreated: (post: FeedPost) => void;
};

export default function CreatePost() {
 const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const user = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: '',
    initials: 'JD',
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
        setIsPosting(true);

        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newPost }),
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        const createdPost: FeedPost = await response.json();

        setNewPost("");

    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

    return (
      <div className="border-b-2 border-border p-4 bg-stone-50">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 border-2 border-foreground">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground font-heading font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[60px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
            />

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>

              <Button
                size="sm"
                className="gap-2"
                disabled={!newPost.trim() || isPosting}
                onClick={handlePost}
              >
                {isPosting ? "POSTING..." : "POST"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
