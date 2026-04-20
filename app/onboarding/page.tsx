import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";
import OnboardingClient from "./OnboardingClient";

const Onboarding = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email || undefined },
  });

  if (user?.onboardingCompleted) {
    redirect("/dashboard");
  }
  return (
    <OnboardingClient
      userEmail={session.user.email!}
      userName={session.user.name!}
    />
  );
};

export default Onboarding;
