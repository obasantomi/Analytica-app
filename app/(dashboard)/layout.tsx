import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import authOptions from "../api/auth/authOptions";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";
import DashboardShell from "./components/DashboardShell";

const RootLayout = async ({ children }: PropsWithChildren) => {
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

  const userImage = user.image;
  const userName = user.name || user.username || session?.user?.name || "User";

  return (
    <DashboardShell
      userName={userName}
      userImage={userImage}
      level={user.level}
      role={user.role || "student"}
    >
      {children}
    </DashboardShell>
  );
};

export default RootLayout;
