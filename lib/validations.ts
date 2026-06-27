import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const componentSchema = z.object({
  title: z.string().trim().min(2).max(100),
  manufacturer: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(10000),
  type: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  availableCopies: z.coerce.number().int().positive().lte(10000),
  cover: z.string().nonempty(),
  summary: z.string().trim().min(10),
});