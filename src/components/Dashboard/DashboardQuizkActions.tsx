import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, TrendingUp, User } from "lucide-react";

export default function DashboardQuizkActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View All Questions
          </Button>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Profile Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
