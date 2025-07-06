import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, FlameIcon, LightbulbIcon } from "lucide-react";

export default function DashboardCards({
  streak,
  answered,
  suggestions,
}: {
  streak: number;
  answered: number;
  suggestions: string[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between mb-0">
          <CardTitle className="text-sm font-medium text-foreground/60">
            Current Streak
          </CardTitle>
          <FlameIcon className="h-5 w-5 text-foreground/40" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{streak}</div>
          <p className="text-xs text-foreground/60">
            {streak === 0 ? "Start today!" : "Keep it up!"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-foreground/60">
            Questions Answered
          </CardTitle>
          <Calendar className="h-5 w-5 text-foreground/40" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{answered}</div>
          <p className="text-xs text-foreground/60">This month</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex justify-between items-center gap-2">
          <CardTitle>Suggestions</CardTitle>
          <LightbulbIcon className="h-6 w-6 text-gray-400" />
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {suggestions?.length ? (
            suggestions.map((s: string, i: number) => <p key={i}>{s}</p>)
          ) : (
            <p>No suggestions yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
