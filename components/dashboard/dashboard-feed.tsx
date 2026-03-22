import { Suspense } from "react";
import DashboardPage from "./dashboard-page";
import { getPosts } from "@/lib/service";
import { Post } from "@/app/types";

export async function DashboardFeed() {
    const posts:Post[] = await getPosts();
  
    if (!posts) {
      return <div>No Post yet</div>;
    }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardPage posts={posts} />
      </Suspense>
    </>
  );
}