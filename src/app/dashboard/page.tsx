import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/db";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import DashboardCTA from "@/components/Dashboard/DashboardCTA";
import DashboardAlert from "@/components/Dashboard/DashboardAlert";
import DashboardHistory from "@/components/Dashboard/DashboardHistory";
import DashboardQuizkActions from "@/components/Dashboard/DashboardQuizkActions";

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
      <DashboardQuizkActions />
    </div>
  );
}
