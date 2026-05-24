import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { buildUrl } from "../../services/buildWorldBankUrl";
import { Parser } from "json2csv";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
import { z } from "zod";
import axios from "axios";
import { datasetService } from "../../services/datasetService";

export const datasetConfigSchema = z.object({
  country: z.string(),
  indicator: z.string(),
  startYear: z.number(),
  endYear: z.number(),
  page: z.number(),
  perPage: z.number(),
});

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;

  console.log(id);

  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      title: true,
      dataset: {
        select: {
          datasetConfig: true,
        },
      },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const datasetConfig = datasetConfigSchema.safeParse(
    project.dataset?.datasetConfig,
  );

  if (!datasetConfig.success) {
    return NextResponse.json(
      { error: "Invalid dataset configuration" },
      { status: 400 },
    );
  }

  if (!datasetConfig.data) {
    return NextResponse.json(
      { error: "Dataset configuration not found" },
      { status: 404 },
    );
  }

  const { url } = buildUrl(datasetConfig.data);

  try {
    const response = await axios.get(url);
    // const normilizedData = datasetService.normalizeData(response.data[1]);
    const parser = new Parser();
    const csv = parser.parse(response.data[1]);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${project.title}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dataset" },
      { status: 500 },
    );
  }
}
