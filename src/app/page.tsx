import Header from "@/components/Header";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Header session={session} />
    </>
  );
}
