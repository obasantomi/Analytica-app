import { MentorChatMessage } from "@/app/(dashboard)/project-lab/components/AIMentorPanel";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const GEMINI_MODEL = "gemini-3.5-flash";

const questionJsonSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      hypothesis: {
        type: "string",
        description: "A falsifiable claim based on the dataset",
      },

      questions: {
        type: "array",

        items: {
          type: "object",

          properties: {
            id: {
              type: "string",
            },

            question: {
              type: "string",
            },

            type: {
              type: "string",

              enum: [
                "data visualization",
                "insight generation",
                "storytelling",
                "bias & statistical awareness",
                "cleaning",
              ],
            },

            hint: {
              type: "string",
            },
          },

          required: ["id", "question", "type", "hint"],
          additionalProperties: false,
        },
      },
    },

    required: ["hypothesis", "questions"],
    additionalProperties: false,
  },
};

const aiReviewJsonSchema = {
  type: "object",
  properties: {
    overallGrade: {
      type: "string",
      description: "Overall performance grade as a percentage string",
      pattern: "^\\d{1,3}%$",
      examples: ["82%"],
    },

    overallSummary: {
      type: "string",
      description:
        "Overall feedback summary describing the user's strengths, weaknesses, and recommendations",
    },

    categoryFeedback: {
      type: "array",
      description: "Feedback grouped by major data analysis areas",
      items: {
        type: "object",
        properties: {
          area: {
            type: "string",
            enum: [
              "data visualization",
              "insight generation",
              "storytelling",
              "bias & statistical awareness",
              "cleaning",
            ],
          },

          score: {
            type: "integer",
            minimum: 0,
            maximum: 100,
            description: "Score for this area",
          },

          feedback: {
            type: "string",
            description: "Detailed feedback for this area",
          },
        },

        required: ["area", "score", "feedback"],
        additionalProperties: false,
      },
    },

    questionReviews: {
      type: "array",
      description: "AI evaluation and ideal answers for each question",
      items: {
        type: "object",
        properties: {
          questionId: {
            type: "string",
            description: "Unique identifier for the question",
          },

          question: {
            type: "string",
            description: "The original question",
          },

          aiIdealAnswer: {
            type: "string",
            description:
              "The AI-generated ideal answer based on the dataset summary",
          },

          feedback: {
            type: "string",
            description:
              "Feedback explaining how the user's answer compares to the ideal answer",
          },
        },

        required: ["questionId", "question", "aiIdealAnswer", "feedback"],

        additionalProperties: false,
      },
    },
  },

  required: [
    "overallGrade",
    "overallSummary",
    "categoryFeedback",
    "questionReviews",
  ],

  additionalProperties: false,
};

const questionSchema = z.array(
  z.object({
    hypothesis: z.string().describe("A falsifiable claim based on the dataset"),

    questions: z.array(
      z.object({
        id: z.string(),

        question: z.string(),

        type: z.enum([
          "descriptive",
          "analytical",
          "hypothesis_testing",
          "prediction",
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

export type QuestionInterface = z.infer<typeof questionSchema>;
export type AIReviewInterface = z.infer<typeof aiReviewSchema>;
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY || "",
});

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

    return response.text || null;
  },

  async generateQuestions(prompt: string) {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: `
You must return ONLY valid JSON matching this schema:
${JSON.stringify(questionJsonSchema)}

No markdown, no explanation.
      `,
        temperature: 0.2,
      },
    });

    if (!response.text) {
      return null;
    }

    const result = questionSchema.safeParse(JSON.parse(response.text));
    return result.success ? result.data : null;
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
