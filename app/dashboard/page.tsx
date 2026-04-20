import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || undefined },
  });
  if (!session) {
    redirect("/sign-in");
  }
  if (!user || !user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="p-5">
      <div className="text-black">
        <b className="block">{session?.user?.name}</b> Welcome to the dashboard!
      </div>
    </div>
  );
};

export default Dashboard;
