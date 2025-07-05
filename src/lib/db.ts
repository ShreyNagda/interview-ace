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
  const user: IUser = await User.findById(id).populate({
    path: "history",
    model: "Answer",
    populate: {
      path: "question",
      model: "Question",
    },
  });
  return JSON.parse(JSON.stringify(user));
}
