import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import UserGreeting from "@/components/dashboard/UserGreeting";
// import Heatmap from "@/components/dashboard/Heatmap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FlameIcon,
  LightbulbIcon,
  Info,
  Calendar,
  TrendingUp,
  User,
  ArrowRight,
  Briefcase,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user: IUser = await getUserById(session.user.id);
  if (!user) redirect("/login");

  // const today = new Date().toISOString().split("T")[0];
  const hasAnsweredToday = false;
  // const hasAnsweredToday = user.history[-1];
  const totalAnswered = user?.history?.length || 0;
  const streak = user?.streak || 0;

  const recentHistory = user.history;

  return (
    <div className="min-h-svh max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <UserGreeting name={user.name} />
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <ThemeToggle className="order-2 md:order-none" />
          <UserProfilePopover session={session} />
        </div>
      </div>
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
          <Button>Answer Now</Button>
        </Alert>
      )}
      {/* Dashboard header */}
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
            <div className="text-3xl font-bold">{totalAnswered}</div>
            <p className="text-xs text-foreground/60">This month</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex justify-between items-center gap-2">
            <CardTitle>Suggestions</CardTitle>
            <LightbulbIcon className="h-6 w-6 text-gray-400" />
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            {user.suggestions?.length ? (
              user.suggestions.map((s: string, i: number) => <p key={i}>{s}</p>)
            ) : (
              <p>No suggestions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* CTA for mock interviews */}
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
              <Button className="">
                Start Mock Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="">
                View Past Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <Calendar className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No history yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start answering daily questions to see your history here.
              </p>
              <Button>Answer Your First Question</Button>
            </div>
          )}
        </CardContent>
      </Card>

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
