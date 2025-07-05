"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import LogoutButton from "@/components/Buttons/LogoutButton";
import { Session } from "next-auth";

type UserPopoverProps = {
  session: Session;
};

export default function UserProfilePopover({ session }: UserPopoverProps) {
  const user = session.user;

  const fallbackInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "US";

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image ?? undefined}
            alt={user?.name ?? "User"}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {fallbackInitials}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col gap-2 w-40">
        <Button variant="outline" asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <UserCircle2 size={18} />
            <span>Profile</span>
          </Link>
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
