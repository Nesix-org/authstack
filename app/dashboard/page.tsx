'use client'

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { posts } from "@/lib/data";
import { PostCard } from "@/components/layout/post-card";


const Dashboard = () => {
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  // Mock user data
  const user = {
    name: "John Doe",
    username: "@johndoe",
    avatar: "",
    initials: "JD",
  };

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="border-b-2 border-border">
          {/* Feed Tabs */}
          <div className="sticky top-0 z-40 hidden border-b-2 border-border bg-background/80 backdrop-blur-sm lg:block">
            <div className="flex">
              <button
                onClick={() => setActiveTab("forYou")}
                className={`flex-1 px-4 py-4 font-heading font-bold transition-colors hover:bg-muted ${
                  activeTab === "forYou" ? "border-b-4 border-foreground" : "text-muted-foreground"
                }`}
              >
                FOR YOU
              </button>
              <button
                onClick={() => setActiveTab("following")}   
                className={`flex-1 px-4 py-4 font-heading font-bold transition-colors hover:bg-muted ${
                  activeTab === "following" ? "border-b-4 border-foreground" : "text-muted-foreground"
                }`}
              >
                FOLLOWING
              </button>
            </div>      
          </div>

          {/* Create Post Section */}
          <div className="border-b-2 border-border p-4">
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
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                      <Sparkles className="h-5 w-5" />
                    </button>
                  </div>
                  <Button size="sm" className="gap-2" disabled={!newPost.trim()}>
                    POST
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More */}
          <div className="border-t-2 border-border p-4 text-center">
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
              SHOW MORE
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};


export default Dashboard;