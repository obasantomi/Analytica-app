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

type ScoreInput = {
  oldScore?: number;
  newScore?: number;
  alpha?: number; // optional, defaults to 0.3
};

export function calculateUpdatedScore({
  oldScore = 0,
  newScore = 0,
  alpha = 0.3,
}: ScoreInput): number {
  return alpha * newScore + (1 - alpha) * oldScore;
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

    const skillScores = reviewResult.categoryFeedback.map((feedback) => ({
      skill: feedback.area,
      score: feedback.score,
    }));

    const CurrentSkillScoresJson: Record<string, number> = Object.fromEntries(
      skillScores.map(({ skill, score }) => [skill, score]),
    );

    const userSkill = await prisma.userSkill.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        skill: true,
      },
    });

    const existingSkillScores = userSkill?.skill as Record<
      string,
      number
    > | null;

    if (existingSkillScores) {
      const updatedSkillScores = Object.entries(CurrentSkillScoresJson).map(
        ([skill, newScore]) => {
          const oldScore =
            existingSkillScores[skill as keyof typeof existingSkillScores] || 0;
          const updatedScore = calculateUpdatedScore({ oldScore, newScore });
          return {
            skill: skill,
            score: updatedScore,
          };
        },
      );

      await prisma.userSkill.update({
        where: {
          userId: user.id,
        },
        data: {
          skill: Object.fromEntries(
            updatedSkillScores.map(({ skill, score }) => [skill, score]),
          ),
        },
      });
    } else {
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skill: CurrentSkillScoresJson,
        },
      });
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
