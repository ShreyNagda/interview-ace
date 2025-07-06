import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

declare global {
  type GeneratedData = {
    context?: string;
    questionsQueue?: { text: string; category: string }[];
    error?: string;
  };
}

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
