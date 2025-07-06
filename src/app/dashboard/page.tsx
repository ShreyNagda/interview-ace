import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/db";
import UserGreeting from "@/components/UserGreeting";
import UserProfilePopover from "@/components/Buttons/UserProfilePopover";
// import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import DashboardCTA from "@/components/Dashboard/DashboardCTA";
import DashboardAlert from "@/components/Dashboard/DashboardAlert";
import DashboardHistory from "@/components/Dashboard/DashboardHistory";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user: IUser = await getUserById(session.user.id);
  if (!user) redirect("/login");

  // const today = new Date().toISOString().split("T")[0];
  const hasAnsweredToday = false;
  // const hasAnsweredToday = user.history[-1];

  const recentHistory = user.history;

  return (
    <div className="min-h-svh max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <UserGreeting name={user.name} />
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <ThemeToggle className="order-2 md:order-none" />
          <UserProfilePopover session={session} />
        </div>
      </div>
      {/* Alert for today's question */}
      <DashboardAlert
        hasAnsweredToday={hasAnsweredToday}
        onBoardingComplete={user.onboardingComplete}
      />
      {/* Dashboard Cards */}
      <DashboardCards
        streak={user.streak}
        answered={user.history.length}
        suggestions={user.suggestions}
      />
      {/* CTA for mock interviews */}
      <DashboardCTA onBoardingComplete={user.onboardingComplete} />

      {/* Recent History */}
      <DashboardHistory
        recentHistory={recentHistory}
        onBoardingComplete={user.onboardingComplete}
      />
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
    </div>
  );
}
