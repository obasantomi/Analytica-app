import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";
import { FiUser } from "react-icons/fi";
import authOptions from "./api/auth/authOptions";

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

  const userImage = session.user.image || user.image;

  return (
    <div className="p-5">
      <div className="text-black">
        <b className="block">
          {session?.user?.username || session?.user?.name}
          {userImage ? (
            <img
              src={userImage}
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </b>{" "}
        Welcome to the dashboard!
      </div>
    </div>
  );
};

export default Dashboard;
