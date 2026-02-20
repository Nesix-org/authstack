import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Explore () {
  const session = await getServerSession(authOptions);

  console.log(session?.user)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <p>This is the explore page.</p>
    </div>
  )
}

export default Explore;