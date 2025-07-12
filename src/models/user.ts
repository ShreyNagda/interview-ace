import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";
declare global {
  export type IJobLevel = "entry" | "junior" | "associate" | "senior" | "lead";

  export type IUser = {
    id?: string;
    email: string;
    password?: string;
    name: string;
    image?: string;
    job?: {
      title: string;
      level: IJobLevel;
    };
    resumeUrl?: string;
    resumeContext?: string;
    suggestions: string[]; // AI suggestions (e.g., prep tips)
    streak: number;
    questionQueue: {
      question: string;
      category: string;
      difficulty?: string;
    }[];
    history: {
      id: string;
      question?: string;
      answer?: string;
      category?: string;
      date: Date;
    }[];
    onboardingComplete: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type IQuestion = {
    question: string;
    category: string;
    difficulty?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    job: {
      title: { type: String },
      level: {
        type: String,
        enum: ["entry", "junior", "associate", "senior", "lead"],
      },
    },
    resumeUrl: {
      type: String,
    },
    resumeContext: {
      type: String,
    },
    suggestions: {
      type: [String],
      default: [],
    },
    streak: {
      type: Number,
      default: 0,
    },
    questionQueue: {
      question: { type: String, required: true },
      category: { type: String, required: true },
      difficulty: { type: String },
    },
    history: [
      {
        date: {
          type: Date,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
        category: {
          type: String,
        },
      },
    ],
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (err) {
    next(new Error((err as Error).message));
  }
});

// Add virtual populate for answers
UserSchema.virtual("answers", {
  ref: "Answer",
  localField: "history",
  foreignField: "_id",
});

// Ensure virtuals are included in JSON output
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

const User = models.User || model<IUser>("User", UserSchema);
export default User;
