import z from "zod";

const onBoadingSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name cannot exceed 20 characters."),
  email: z.string().optional().or(z.string().email("Invalid email address.")),
});

export default onBoadingSchema;

export type OnboardingSchema = z.infer<typeof onBoadingSchema>;
