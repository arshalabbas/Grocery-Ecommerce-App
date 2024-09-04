import z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name cannot exceed 20 characters."),
  phone: z.string().length(10, "Phone must be at least 10 characters."),
  altPhone: z
    .string()
    .optional()
    .or(z.string().length(10, "Phone must be at lease 10 characters.")),
  landmark: z
    .string()
    .min(3, "Landmark must be at least 3 characters.")
    .max(40, "Landmark cannot exceed 40 characters."),
  pincode: z.string().length(6, "Pincode must be at least 6 characters."),
  city: z
    .string()
    .min(3, "Landmark must be at least 3 characters.")
    .max(20, "Landmark cannot exceed 20 characters."),
  district: z
    .string()
    .min(3, "District must be at least 3 characters.")
    .max(20, "District cannot exceed 20 characters."),
});

export type AddressSchema = z.infer<typeof addressSchema>;
