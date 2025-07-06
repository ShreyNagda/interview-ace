"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { redirect } from "next/navigation";

export default function DashboardCTA({
  onBoardingComplete,
}: {
  onBoardingComplete: boolean;
}) {
  const handleStartInterview = () => {
    if (!onBoardingComplete) {
      redirect("/onboarding?redirect=interview");
    }
    redirect("/interview/start");
    console.log("Start interview");
  };
  const handleViewPastSessions = () => {};
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Ready for your next interview?
              </h3>
              <p className="text-gray-600 max-w-md">
                Practice with our AI-powered mock interviews. Get personalized
                feedback and improve your confidence.
              </p>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
                <span>• 15-30 minute sessions</span>
                <span>• Instant feedback</span>
                <span>• Industry-specific questions</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button className="" onClick={handleStartInterview}>
              Start Mock Interview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className=""
              onClick={handleViewPastSessions}
            >
              View Past Sessions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
