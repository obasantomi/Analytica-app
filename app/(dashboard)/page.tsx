import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";
import authOptions from "../api/auth/authOptions";
import DashboardView from "./components/DashboardView";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  if (!user || !user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div>
      <DashboardView />
    </div>
  );
};

export default Dashboard;
