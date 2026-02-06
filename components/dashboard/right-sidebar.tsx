import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const trendingTopics = [
  { category: "Technology", topic: "#NextJS15", posts: "12.4K" },
  { category: "Programming", topic: "TypeScript", posts: "8.2K" },
  { category: "Developer", topic: "#100DaysOfCode", posts: "45.1K" },
  { category: "Tech", topic: "Prisma ORM", posts: "3.8K" },
  { category: "Security", topic: "Auth.js v5", posts: "2.1K" },
];

const suggestedUsers = [
  { name: "React Dev", username: "@reactdev", initials: "RD" },
  { name: "TypeScript Pro", username: "@tspro", initials: "TP" },
  { name: "Full Stack", username: "@fullstack", initials: "FS" },
];

export function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto border-l-2 border-border bg-background p-4 lg:block xl:w-96">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="border-2 border-border bg-muted pl-10 focus:border-foreground"
        />
      </div>

      {/* Trending */}
      <div className="mb-6 border-2 border-border bg-background shadow-sharp">
        <div className="flex items-center gap-2 border-b-2 border-border p-4">
          <TrendingUp className="h-5 w-5" />
          <h2 className="font-heading text-xl font-bold">TRENDING</h2>
        </div>
        <div>
          {trendingTopics.map((trend, index) => (
            <button
              key={index}
              className="block w-full border-b-2 border-border p-4 text-left transition-colors last:border-b-0 hover:bg-muted"
            >
              <p className="text-xs text-muted-foreground">{trend.category}</p>
              <p className="font-heading font-bold">{trend.topic}</p>
              <p className="text-sm text-muted-foreground">{trend.posts} posts</p>
            </button>
          ))}
        </div>
        <button className="block w-full p-4 text-left font-heading text-sm font-medium hover:bg-muted">
          SHOW MORE
        </button>
      </div>

      {/* Who to Follow */}
      <div className="border-2 border-border bg-background shadow-sharp">
        <div className="border-b-2 border-border p-4">
          <h2 className="font-heading text-xl font-bold">WHO TO FOLLOW</h2>
        </div>
        <div>
          {suggestedUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b-2 border-border p-4 last:border-b-0"
            >
              <Avatar className="h-10 w-10 border-2 border-foreground">
                <AvatarFallback className="bg-muted font-heading font-bold text-sm">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-heading font-bold">{user.name}</p>
                <p className="truncate text-sm text-muted-foreground">{user.username}</p>
              </div>
              <Button size="sm" variant="outline">
                FOLLOW
              </Button>
            </div>
          ))}
        </div>
        <button className="block w-full p-4 text-left font-heading text-sm font-medium hover:bg-muted">
          SHOW MORE
        </button>
      </div>

      {/* Footer Links */}
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <span>© 2026</span>
      </div>
    </aside>
  );
}
