"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function LogoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Logout</AlertDialogTitle>
        <AlertDialogDescription>Are you sure to logout?</AlertDialogDescription>
        <div className="flex items-center justify-center  md:justify-end gap-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => await signOut()} asChild>
            <Button variant={"destructive"} className="text-white">
              Logout
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
