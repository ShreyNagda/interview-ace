"use client";
import React, { ReactNode } from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import UserProfilePopover from "./Buttons/UserProfilePopover";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "./Theme/ThemeToggle";

export default function Header({
  session,
  title,
}: {
  session?: Session | null;
  title?: ReactNode;
}) {
  return (
    <header className="max-w-[1000px] mx-auto p-4 md:p-8 flex items-center justify-between">
      <div className="text-2xl md:text-3xl font-bold">
        {title || "InterviewAce"}
      </div>
      <nav className="flex gap-4 items-center">
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
                <ArrowRight />
              </Link>
            </Button>
          </>
        )}

        {session && (
          <>
            <ThemeToggle />
            <UserProfilePopover session={session} />
          </>
        )}
      </nav>
    </header>
  );
}
