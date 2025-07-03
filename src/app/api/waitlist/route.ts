// /src/app/api/waitlist/route.ts

import Waitlist from "@/models/waitlist";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { transporter } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  try {
    await dbConnect();
    await Waitlist.create({ email });
  } catch (err) {
    return NextResponse.json(
      { error: "Already on the waitlist", err },
      { status: 400 }
    );
  }

  try {
    const html = `
  <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: auto; color: #111;">
    <h1 style="font-size: 20px; margin-bottom: 10px;">Welcome, ${email}!</h1>
    <h2 style="font-size: 18px; margin-bottom: 8px;">🎉 You’re on the waitlist!</h2>
    <p style="margin-bottom: 10px; line-height: 1.5;">
      Thanks for signing up! You're one step closer to unlocking your interview prep superpower.
      Our AI-driven daily questions, scoring system, and mock interviews are almost ready for launch.
    </p>
    <p style="line-height: 1.5;">
      You'll be the first to know when we're live — and you'll get early access perks.
      Stay tuned 🚀
    </p>
  </div>
`;
    await transporter.sendMail({
      from: `InterviewAce <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Successfully joined the waitlist!",
      html: html,
    });

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error:", err, typeof err);

    return NextResponse.json(
      { error: err || "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(req.)
