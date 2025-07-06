import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="h-svh p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">404 - Page not found!</h2>
      <p className="mb-4">{error?.message || ""}</p>
      <Button className="px-4 py-2 rounded" asChild>
        <Link href="/dashboard" replace>
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
