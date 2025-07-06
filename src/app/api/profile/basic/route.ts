import { auth } from "@/lib/auth";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Id not found", status: 404 });
  const id = session.user.id;
  const body = await req.json();
  const { name, email, profileImage } = body;
  try {
    await User.findByIdAndUpdate(id, { name, email, image: profileImage });
    return NextResponse.json({
      message: "Profile updated successfully!",
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
}
