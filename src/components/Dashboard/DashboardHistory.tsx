"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, Table } from "lucide-react";
import { Button } from "../ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { redirect } from "next/navigation";

type History = {
  id: string;
  question?: string;
  answer?: string;
  category?: string;
  date: Date;
};

export default function DashboardHistory({
  onBoardingComplete,
  recentHistory,
}: {
  onBoardingComplete: boolean;
  recentHistory: History[];
}) {
  const handleAnswerClick = () => {
    if (!onBoardingComplete) {
      redirect("/onboarding?redirect=answer");
    }
    redirect("/answer");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent History
        </CardTitle>
        <CardDescription>
          Your recent question responses and reflections
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="overflow-x-auto">
          {recentHistory.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentHistory.map((entry) => (
                  <TableRow key={entry.id} className="h-12">
                    <TableCell className="font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={entry.question}>
                        {entry.question}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {recentHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-foreground/70 mb-4" />
            <h3 className="text-lg font-medium text-foreground/70 mb-2">
              No history yet
            </h3>
            <p className="text-foreground/40 mb-4">
              Start answering daily questions to see your history here.
            </p>
            <Button onClick={handleAnswerClick}>
              Answer Your First Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
