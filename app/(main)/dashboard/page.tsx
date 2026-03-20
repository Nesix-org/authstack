import { FormattedPost } from "@/app/types";
import DashboardPage from "@/components/dashboard/dashboard-page";
import { getPosts } from "@/lib/service";

export default async function Dashboard() {
  const posts: FormattedPost[] = await getPosts()

  if(!posts) {

  }

  return (
    <>
      <DashboardPage posts={posts} />
    </>
  );
}
