import { onboardUserSchema } from "@/app/onboarding/onboardUserSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = onboardUserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  }
  const { analyticsExperience, domains, expertise, username, email } =
    validation.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      onboardingCompleted: true,
      role: analyticsExperience,
      domain: domains,
      level: expertise,
      username,
    },
  });

  if (!updatedUser) {
    return NextResponse.json(
      { message: "Failed to update user onboarding information" },
      { status: 500 },
    );
  }

  if (updatedUser) {
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  }
}
