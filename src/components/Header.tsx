"use client";
import React from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import UserProfilePopover from "./Buttons/UserProfilePopover";
import { ArrowRight, LogIn } from "lucide-react";
import ThemeToggle from "./Theme/ThemeToggle";
import { usePathname } from "next/navigation";
import UserGreeting from "./UserGreeting";

export default function Header({
  session,
  image,
}: {
  session?: Session | null;
  image?: string;
}) {
  const pathname = usePathname();

  if (
    // pathname.endsWith("/dashboard") ||
    pathname.includes("login") ||
    pathname.includes("signup") ||
    pathname.includes("error")
  ) {
    return <></>;
  }
  return (
    <header className="w-full max-w-[1000px] mx-auto p-4 md:p-8 flex items-center justify-between">
      <div className="text-2xl md:text-3xl font-bold">
        {pathname.endsWith("/dashboard") ? (
          <UserGreeting name={session?.user?.name || ""} />
        ) : (
          "InterviewAce"
        )}
      </div>
      <nav className="flex gap-1 md:gap-4 items-center">
        <ThemeToggle />

        {!session && (
          <>
            <Button
              className="hover:scale-105 border hidden md:flex"
              variant={"secondary"}
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button className="hover:scale-105" asChild>
              <Link href={"/login"}>
                <span className="hidden md:flex">Login</span>
                <ArrowRight className="hidden md:flex" />
                <LogIn className="md:hidden" />
              </Link>
            </Button>
          </>
        )}

        {session && (
          <>
            <UserProfilePopover session={session} image={image} />
          </>
        )}
      </nav>
    </header>
  );
}
