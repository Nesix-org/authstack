"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, Sparkles } from "lucide-react";
import { postAction } from "./postAction";
import SubmitButton from "./submitButton";
import { getInitials } from "@/lib/utils";
import { useSession } from "next-auth/react";

type CreatePostProps = {
  onPostSuccess?: () => Promise<void> | void;
};


export default function CreatePost({ onPostSuccess }: CreatePostProps ) {
  const [newPost, setNewPost] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const { data: session } = useSession();
  const user = session?.user || { name: null, username: null };

  const name = user.name || user.username || "User";
  const userInitials = getInitials(name);

  // const handlePost = async () => {
  //   if (!newPost.trim()) return;
  //   try {
  //       setIsPosting(true);

  //       const response = await fetch("/api/posts", {
  //           method: "POST",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ content: newPost }),
  //       });

  //       if (!response.ok) {
  //           throw new Error("Failed to create post");
  //       }
  //       const createdPost: FeedPost = await response.json();
  //       onPostCreated(createdPost);
  //       setNewPost("");

  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   } finally {
  //     setIsPosting(false);
  //   }
  // };

  return (
    <div className="border-b-2 border-border p-4 bg-stone-50">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 border-2 border-foreground">
          <AvatarFallback className="bg-primary text-primary-foreground font-heading font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        <form
          className="flex-1"
          action={async (formData) => {
            await postAction(formData);
            formRef.current?.reset();
            setNewPost("");
            await onPostSuccess?.();
          }}
          ref={formRef}
        >
          <Textarea
            name="content"
            placeholder="What's happening?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-15 resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
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

            <SubmitButton disabled={!newPost.trim()} />
          </div>
        </form>
      </div>
    </div>
  );
}
