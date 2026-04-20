import { z } from "zod";

export const onboardUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  expertise: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
      message: "Please select an expertise level",
    })
    .optional(),
  email: z.email(),
  analyticsExperience: z
    .enum(["STUDENT", "ANALYST", "MANAGER"], {
      message: "Please select your analytics experience",
    })
    .optional(),
  domains: z
    .array(z.string())
    .min(1, "Please select at least one domain of interest"),
});

export type OnboardUserData = z.infer<typeof onboardUserSchema>;
