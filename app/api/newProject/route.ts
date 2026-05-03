import { FormData } from "@/app/(dashboard)/project-lab/new/page";
import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: FormData = await req.json();
}

export async function GET(req: NextRequest) {}
