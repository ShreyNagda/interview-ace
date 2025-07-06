"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function DashboardAlert({
  hasAnsweredToday,
  onBoardingComplete,
}: {
  hasAnsweredToday: boolean;
  onBoardingComplete: boolean;
}) {
  const handleAnswerClick = () => {
    if (!onBoardingComplete) {
      redirect("/onboarding?redirect=answer");
    }
    redirect("/answer");
  };
  return (
    <>
      {!hasAnsweredToday && (
        <Alert
          variant="destructive"
          className="bg-red-300/20 border-red-500 border flex flex-col md:flex-row md:justify-between"
        >
          <div className=" flex items-center gap-2">
            <Info className="hidden md:block" />

            <div>
              <AlertTitle>Daily Practice Missing</AlertTitle>
              <AlertDescription>
                You haven&apos;t answered today&apos;s question. Answer now to
                maintain your streak!
              </AlertDescription>
            </div>
          </div>
          <Button onClick={handleAnswerClick}>Answer Now</Button>
        </Alert>
      )}
    </>
  );
}
