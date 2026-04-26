import { SignUpSchema } from "@/app/(auth)/(authSchema)/authSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = SignUpSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  }
  const { email, password } = validation.data;
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUserByEmail) {
    return NextResponse.json(
      { user: null, error: "User with this email already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: validation.data.fullName,
      email: validation.data.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ user: newUser }, { status: 201 });
}
