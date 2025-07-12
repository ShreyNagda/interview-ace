import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AnswerPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return (
    <div className="flex flex-col items-center w-full h-[calc(100svh_-_90px)] md:h-[calc(100svh_-_120px)]"></div>
  );
}
