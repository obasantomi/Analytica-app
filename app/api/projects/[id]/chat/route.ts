import { prisma } from "@/prisma/client";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { chatService } from "./chat.service";

interface Props {
  params: Promise<{ id: string }>;
}

const analyze_prompt = fs.readFileSync(
  path.join(process.cwd(), "app", "prompts", "analyze-instructions.txt"),
  "utf-8",
);

export async function POST(request: Request, { params }: Props) {
  const { id } = await params;
  const body = await request.json();

  const project = await prisma.project.findUnique({
    where: { id },
    select: {///
      description: true,
    },
  });

  const assistantInstructions = analyze_prompt.replace(
    "{{datasetSummary}}",
    project?.description || "No description provided",
  );

  const response = await chatService.analyze(
    assistantInstructions,
    body.messages,
  );
  console.log("AI Response:", response);

  if (!response) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      chatResponse: response,
    },
    { status: 200 },
  );
}
