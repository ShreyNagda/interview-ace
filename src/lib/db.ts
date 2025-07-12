import User from "@/models/user";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "RealtimeQuizPlatform",
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Connection error " + error);
  }
}

export async function getUserById(id: string) {
  await dbConnect();
  const user: IUser | null = await User.findById(id);
  return JSON.parse(JSON.stringify(user));
}

export async function updateUserById(
  id: string,
  data: { jobTitle: string[]; jobLevel: string; resumeContext: string }
) {
  console.log(id, data);
}

export async function getUserImageById(id: string | undefined) {
  if (!id) return null;
  const user = await User.findById(id);
  return user.image;
}
