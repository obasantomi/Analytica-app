import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { chatService } from "../chat/chat.service";
import { z } from "zod";
import { getServerSession } from "next-auth";

// Define schema for request body validation
const reviewDetailsSchema = z.array(
  z.object({
    questionId: z.string(),
    question: z.string(),
    answer: z.string(),
  }),
);

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: Props) {
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

  try {
    const { id: projectId } = await params;

    // Parse and validate request body
    const body = await request.json();

    const validationResult = reviewDetailsSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const responses = validationResult.data;

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { description: true, id: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Call service to review project responses
    const reviewResult = await chatService.reviewProjectResponses(
      project.description || "No description provided",
      responses,
    );

    if (!reviewResult) {
      return NextResponse.json(
        { error: "Failed to review project responses" },
        { status: 500 },
      );
    }

    const userProject = await prisma.userProject.update({
      where: {
        userId_projectId: {
          projectId,
          userId: user.id,
        },
      },
      data: {
        aiFeedback: reviewResult,
        status: "COMPLETED",
        grade: reviewResult.overallGrade || null,
      },
    });

    if (!userProject) {
      return NextResponse.json(
        { error: "Failed to update project review results" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        review: reviewResult,
        projectId: project.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Review details error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
