import ProfilePageClient from "@/components/profile/ProfilePageClient";
import { Session } from "@/lib/session";

async function ProfilePage() {
  const session = await Session()

  const profile = {
    email: session?.user?.email ?? "",
    name: session?.user?.name ?? "",
  };

  return <ProfilePageClient profileName={profile.name} profileEmail={profile.email} />;
}

export default ProfilePage;
