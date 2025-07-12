"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, UserCircle2 } from "lucide-react";
import LogoutButton from "@/components/Buttons/LogoutButton";
import { Session } from "next-auth";
import { useState } from "react";

type UserPopoverProps = {
  session?: Session | null;
  user?: IUser;
  image?: string;
};

export default function UserProfilePopover({
  session,
  user,
  image,
}: UserPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = user || session?.user;
  const fallbackInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "US";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={image ?? undefined}
            alt={currentUser?.name ?? "User"}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {fallbackInitials}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col gap-2">
        <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
          <Link
            href="/profile"
            className="flex items-center justify-start gap-2"
          >
            <UserCircle2 size={18} />
            <span>Profile</span>
          </Link>
        </Button>
        <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
          <Link
            href="/dashboard"
            className="flex items-center justify-start gap-2"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
