import { getUserImageById } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id } = body;

  const image = await getUserImageById(id);
  return NextResponse.json({ image });
}
