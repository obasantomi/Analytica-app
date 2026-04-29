import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import authOptions from "../api/auth/authOptions";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";
import DashboardNav from "./components/DashboardNav";
import DashboardSidebar from "./components/DashboardSidebar";

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
    <div className="h-screen">
      <header className="bg-[#F2F4F6] z-20 fixed top-0 right-0 left-0 flex">
        <div className="mx-auto w-full flex max-w-432.5 items-center justify-between px-8 py-2">
          <div className="text-[#002B5B] text-[24px] font-bold">Analytica</div>
          <DashboardNav name={userName} image={userImage} />
        </div>
      </header>

      <aside className="fixed z-20 left-0 w-64 top-16 bottom-0 overflow-y-scroll bg-[#F2F4F6]">
        <DashboardSidebar level={user.level} role={user.role || "student"} />
      </aside>

      <main className="ml-64 mt-14.5 bg-[#eeeff1] h-full">
        <div className="h-full overflow-y-scroll">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
