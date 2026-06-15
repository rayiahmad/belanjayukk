import z from "zod";

export type signUpFormType = z.infer<typeof signUpFormSchema>;

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    email: z
      .string()
      .email("Email tidak valid")
      .min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  })

export const createUserSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
