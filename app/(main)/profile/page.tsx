import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfilePageClient from "@/components/profile/ProfilePageClient";

async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const profile = {
    email: session?.user?.email ?? "",
    name: session?.user?.name ?? "",
  };

  return <ProfilePageClient profileName={profile.name} profileEmail={profile.email} />;
}

export default ProfilePage;
