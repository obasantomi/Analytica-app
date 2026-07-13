import { FormData } from "@/app/(dashboard)/project-lab/new/page";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getDatasetParams } from "./controllers/dataset.controller";
import { getServerSession } from "next-auth";
import { chatService } from "./[id]/chat/chat.service";

export async function POST(req: NextRequest) {
  const body: FormData = await req.json();
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const datasetParameters = await getDatasetParams();

  if (!datasetParameters) {
    return NextResponse.json(
      { error: "Something went wrong. Try again later" },
      { status: 404 },
    );
  }

  const { title, category, summary, datasetConfig } = datasetParameters;
  console.log(datasetParameters);

  // Find user by ID from the session
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const prompt = `Based on the following project summary, generate 3 insightful questions that an AI mentor could ask to better understand the user's project and provide relevant guidance. The questions should be open-ended and encourage the user to elaborate on their project details, goals, and challenges.

Project Summary: ${summary}

Please provide the questions in a JSON array format.`;

  try {
    const chatSummary = await chatService.summarizeDataset(summary);
    const chatQuestions = await chatService.generateQuestions(prompt);

    console.log(chatSummary);
    console.log(chatQuestions);

    if (!chatSummary || !chatQuestions) {
      return NextResponse.json(
        { error: "Failed to generate AI insights" },
        { status: 500 },
      );
    }
    // Create a new project in the database
    const project = await prisma.project.create({
      data: {
        title,
        description: chatSummary || summary,
        difficulty: body.difficulty!,
        category,
        domain: body.scenario!,
        dataset: {
          create: {
            name: title,
            description: chatSummary || summary,
            datasetConfig,
          },
        },
        userProjects: {
          create: {
            user: {
              connect: {
                id: user.id,
              },
            },
            aiQuestions: chatQuestions,
            status: "IN_PROGRESS",
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 },
      );
    }

    // Configure AI operations using datasetParameters and project details (if needed)
    return NextResponse.json({ projectId: project.id }, { status: 200 });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return NextResponse.json(
      { error: "An error occurred while generating AI insights" },
      { status: 500 },
    );
  }
}
