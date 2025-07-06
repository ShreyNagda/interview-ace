// import { getContext } from "@/lib/ai";
import { getContext } from "@/lib/ai";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { extractTextFromPDF } from "@/lib/PdfParse";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const formData = await req.formData();

  const resumeFile = formData.get("resume");
  const jobTitle = formData.get("jobTitle") || "";
  const jobLevel = formData.get("jobLevel") || "";
  const id = session?.user?.id;
  if (!id) return NextResponse.json({ error: "Id not found", status: 501 });
  dbConnect();

  if (!resumeFile || !(resumeFile instanceof File)) {
    return NextResponse.json(
      { error: "Resume file missing or invalid" },
      { status: 400 }
    );
  }

  try {
    const extractedText = await extractTextFromPDF(resumeFile);
    const context = await getContext(extractedText);

    await User.findByIdAndUpdate(id, {
      resumeContext: context,
      job: { title: jobTitle, level: jobLevel },
      onboardingComplete: true,
    });
    return NextResponse.json({
      message: "Resume parsed successfully",
      jobTitle,
      jobLevel,
      context,
    });
  } catch (error) {
    console.error("Profile completion failed:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
