"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RightSidebar } from "@/components/dashboard/right-sidebar";
import { ScrollBar } from "@/components/dashboard/scroll-bar";
import Post from "@/components/post/post";
import CreatePost, { FeedPost } from "@/components/post/createPost";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleNewPost = (newPost: FeedPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <section className="flex min-h-screen w-full relative max-w-full overflow-x-hidden">
      <ScrollBar />
      <div className="border-b-2 border-border bg-red-300 flex-1">
        {/* Feed Tabs */}
        <div className="sticky top-0 z-40 hidden border-b-2 border-border bg-stone-100 backdrop-blur-sm lg:block">
          <div className="flex">
            <button
              onClick={() => setActiveTab("forYou")}
              className={`flex-1 px-4 py-4 font-heading font-bold transition-colors hover:bg-muted ${
                activeTab === "forYou"
                  ? "border-b-4 border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              FOR YOU
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 px-4 py-4 font-heading font-bold transition-colors hover:bg-muted ${
                activeTab === "following"
                  ? "border-b-4 border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              FOLLOWING
            </button>
          </div>
        </div>

        {/* Create Post Section */}
        <CreatePost onPostCreated={handleNewPost} />

        {/* Posts Feed */}
        <Post posts={posts} loading={loading} error={error} />

        {/* Load More */}
        <div className="border-t-2 border-border p-4 text-center">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            SHOW MORE
          </Button>
        </div>
      </div>
      <div className="sticky w-90 h-screen right-0 top-0 hidden border-l-2 border-border bg-background lg:block">
        <RightSidebar />
      </div>
    </section>
  );
};

export default Dashboard;
