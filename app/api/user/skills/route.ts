import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userSkill = await prisma.userSkill.findUnique({
      where: { userId: user.id },
      select: { skill: true },
    });

    return NextResponse.json(
      { skill: userSkill?.skill ?? {} },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/user/skills error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
