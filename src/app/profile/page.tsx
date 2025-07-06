// components/UserFetcher.tsx
import ProfilePageComponent from "@/components/ProfilePageComponent";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const user = await User.findById(session.user.id).lean();
  if (!user) redirect("/login");

  return <ProfilePageComponent user={JSON.parse(JSON.stringify(user))} />;
}
