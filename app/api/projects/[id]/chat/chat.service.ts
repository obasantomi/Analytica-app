import { MentorChatMessage } from "@/app/(dashboard)/project-lab/components/AIMentorPanel";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const GEMINI_MODEL = "gemini-flash-latest";

const questionSchema = z.array(
  z.object({
    hypothesis: z.string(),

    questions: z.array(
      z.object({
        id: z.string(),
        question: z.string(),

        type: z.enum([
          "data visualization",
          "insight generation",
          "storytelling",
          "bias & statistical awareness",
          "cleaning",
        ]),

        hint: z.string(),
      }),
    ),
  }),
);

const aiReviewSchema = z.object({
  overallGrade: z.string().regex(/^\d{1,3}%$/),

  overallSummary: z.string(),

  categoryFeedback: z.array(
    z.object({
      area: z.enum([
        "cleaning",
        "data visualization",
        "storytelling",
        "bias & statistical awareness",
        "insight generation",
      ]),

      score: z.number().int().min(0).max(100),

      feedback: z.string(),
    }),
  ),

  questionReviews: z.array(
    z.object({
      questionId: z.string(),
      question: z.string(),
      aiIdealAnswer: z.string(),
      feedback: z.string(),
    }),
  ),
});
const aiReviewJsonSchema = z.toJSONSchema(aiReviewSchema);
const questionJsonSchema = z.toJSONSchema(questionSchema);

export type QuestionInterface = z.infer<typeof questionSchema>;
export type AIReviewInterface = z.infer<typeof aiReviewSchema>;
const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_GENAI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey });

export const chatService = {
  async analyze(assistantInstructions: string, content: MentorChatMessage[]) {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: content.map((content) => ({
        role: content.role === "assistant" ? "model" : "user",
        parts: [{ text: content.text }],
      })),
      config: {
        systemInstruction: assistantInstructions,
        temperature: 0.2,
        maxOutputTokens: 600,
      },
    });

    console.log(response.text);
    return response.text;
  },

  async summarizeDataset(summary: string) {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: summary,
      config: {
        systemInstruction:
          "You are a helpful data analyst. convert the dataset details into a concise summary straight up without starting with here is a summarry of.... just give me the summary",
        temperature: 0.2,
        maxOutputTokens: 1000,
      },
    });
    console.log(response.text);
    return response.text || null;
  },

  async generateQuestions(prompt: string) {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: `
You are an experienced data science mentor.

Based on the dataset:

- Generate ONE falsifiable hypothesis.
- Generate FIVE to SEVEN analytical questions.
- Each question should contain:
  - id
  - question
  - type
  - hint

You must return ONLY valid JSON matching this schema:
${JSON.stringify(questionJsonSchema)}

No markdown, no explanation.
`,
        responseMimeType: "application/json",
        responseSchema: questionJsonSchema,
        temperature: 0.2,
        maxOutputTokens: 5000,
      },
    });

    if (!response.text) {
      return null;
    }

    try {
      const parsed = JSON.parse(response.text);

      const result = questionSchema.safeParse(parsed);

      if (!result.success) {
        console.error(result.error.issues);
        return null;
      }

      return result.data;
    } catch (err) {
      console.error("Gemini returned invalid JSON");
      console.error(response.text);
      return null;
    }
  },

  async reviewProjectResponses(
    description: string,
    responses: Array<{
      questionId: string;
      question: string;
      answer: string;
    }>,
  ) {
    const prompt = `
You are an expert data analyst and project reviewer.

Review the following responses to data analysis questions.

Dataset Summary: ${description}

Responses to review:
${JSON.stringify(responses)}

Provide detailed, actionable feedback for each response in a structured format.
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: `You must return ONLY valid JSON matching this schema: 
        ${JSON.stringify(aiReviewJsonSchema)} 
        
        No markdown, no explanation.       
        `,
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: aiReviewJsonSchema,
        maxOutputTokens: 5000,
      },
    });

    if (!response.text) {
      return null;
    }

    const result = aiReviewSchema.safeParse(JSON.parse(response.text));

    if (!result.success) {
      return null;
    }

    return result.data;
  },
};
