'use client'

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ImageIcon, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";



  // Mock posts data
  const posts = [
    {
      id: 1,
      author: { name: "Jane Smith", username: "@janesmith", initials: "JS" },
      content: "Just finished building my first full-stack app with Next.js and Prisma. The developer experience is incredible! 🚀",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      author: { name: "Alex Chen", username: "@alexchen", initials: "AC" },
      content: "Hot take: TypeScript is not optional anymore. It's a must-have for any serious project. Type safety saves hours of debugging.",
      timestamp: "4 hours ago",
      likes: 156,
      comments: 42,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: 3,
      author: { name: "Sarah Wilson", username: "@sarahw", initials: "SW" },
      content: "Working on authentication with Auth.js. The new v5 is so much cleaner. Anyone else migrating from NextAuth v4?",
      timestamp: "6 hours ago",
      likes: 89,
      comments: 23,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 4,
      author: { name: "Mike Johnson", username: "@mikej", initials: "MJ" },
      content: "Database design tip: Always think about your queries before designing your schema. Learned this the hard way with Neon + Prisma.",
      timestamp: "8 hours ago",
      likes: 234,
      comments: 67,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: 5,
      author: { name: "Emily Davis", username: "@emilyd", initials: "ED" },
      content: "Finally understood bcrypt and password hashing. Security is no joke. Never store plain text passwords! 🔐",
      timestamp: "1 day ago",
      likes: 312,
      comments: 45,
      isLiked: false,
      isBookmarked: true,
    },
  ];




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

const PostCard = ({ post }: { post: Post }) => {
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

export default Dashboard;
