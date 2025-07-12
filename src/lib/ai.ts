import User from "@/models/user";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export async function getContext(resumeText: string): Promise<string> {
  if (!process.env.HF_TOKEN) {
    console.log("Token not found");
    return "Token not found";
  }

  const prompt = `Given the text below (e.g. a resume or document), extract a compact internal-use summary including:

1. Key technologies and programming languages used
2. Project names and brief technical purpose
3. Roles and achievements (optional, but only if relevant technically)

Output should be under 200 words and formatted as a single plain text string. Do not include any extra commentary or markdown. Do not explain the task or format.

Text:
"""
${resumeText}
"""
`;

  const chatCompletion = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 512,
  });

  const generatedText = chatCompletion.choices[0].message.content!;
  return generatedText;
}

export async function updateQuestionQueue(id: string) {
  const user: IUser | null = await User.findById(id);

  if (!user) throw new Error("User not found");

  const context = user.resumeContext;
  const title = user.job?.title || "Unknown";
  const level = user.job?.level || "Unknown";

  const prompt = `You are an expert interview coach.

Given the following user resume context:

Job Title: ${title}
Job Level: ${level} (junior, mid, senior)
Resume Context: ${context}

Your task:
Generate 30 diverse interview questions as a JSON array. Follow these rules:

- 10 Technical questions
- 10 Behavioral questions
- 10 Theoretical questions

- Questions 1–10: Easy
- Questions 11–20: Medium
- Questions 21–30: Hard

For each item, use this JSON format:
{
  "question": "string",
  "category": "technical | behavioral | theoretical"
}

Output only a JSON array. No commentary or formatting. Example:
[
  {
    "question": "What is a closure in JavaScript?",
    "category": "technical"
  },
  {
    "question": "Tell me about a time you had to resolve a conflict with a coworker.",
    "category": "behavioral"
  }
]
`;

  const chatCompletion = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 2048,
  });

  const generatedText = chatCompletion.choices[0].message.content;

  let parsedQuestions;
  try {
    parsedQuestions = JSON.parse(generatedText || "[]");
    if (!Array.isArray(parsedQuestions)) {
      throw new Error("Generated content is not a valid array");
    }
  } catch (err) {
    console.error("Failed to parse generated questions:", err);
    throw new Error("AI did not return valid JSON");
  }
  console.log(user.questionQueue, typeof user.questionQueue);

  // Update and save user
  await User.findByIdAndUpdate(id, {
    $push: {
      questionQueue: { $each: parsedQuestions },
    },
  });
  console.log(parsedQuestions);

  return parsedQuestions;
}
