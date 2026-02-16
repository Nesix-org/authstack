'use client'

import { Home, Search, Bell, Mail, Bookmark, User, Settings, LogOut, PenSquare, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {Link} from "next-view-transitions";

const mainItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Explore", url: "/explore", icon: Search },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Messages", url: "/messages", icon: Mail },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Mock user
  const user = {
    name: "John Doe",
    username: "@johndoe",
    initials: "JD",
  };

  return (
    <Sidebar
      className="border-r-2 border-border bg-background fixed h-screen top-0 left-0 z-50 transition-transform lg:translate-x-0"
      collapsible="icon"
    >
      <SidebarContent className="px-3 py-4 relative overflow-hidden">
        {/* Logo */}
        <div className={`mb-6 flex flex-col md:flex-row items-center justify-between  ${collapsed ? "px-2" : "px-3"}`}>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-foreground">
            <span className="font-space text-xl font-bold text-background">A</span>
          </div>

          <SidebarTrigger className="absolute top-0 right-1 p-2 z-auto rounded-full bg-background border-2 border-border text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ">
            <Menu size={24} />
          </SidebarTrigger>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1 last:mb-0">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <Link
                      href={item.url}
                      className={`flex items-center gap-4 rounded-none px-3 py-3 transition-all hover:bg-muted ${
                        isActive(item.url) ? "border-2 border-foreground bg-muted font-bold" : ""
                      }`}
                      // activeClassName=""
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {!collapsed && (
                        <span className="font-space text-sm">{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Post Button */}
        <div className={`mt-4 ${collapsed ? "px-1" : "px-0"}`}>
          {collapsed ? (
            <Button size="icon" className="h-12 w-12">
              <PenSquare className="h-5 w-5" />
            </Button>
          ) : (
            <Button className="w-full gap-2 py-6 text-base">
              <PenSquare className="h-5 w-5" />
              POST
            </Button>
          )}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t-2 border-border p-3">
        <div
          className={`flex items-center gap-3 rounded-none p-2 transition-colors hover:bg-muted ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Avatar className="h-10 w-10 border-2 border-foreground">
            <AvatarFallback className="bg-primary text-primary-foreground font-heading font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-heading font-bold">{user.name}</p>
              <p className="truncate text-sm text-muted-foreground">{user.username}</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1 text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
